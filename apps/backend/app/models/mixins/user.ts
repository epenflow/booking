import DbTokensProvider, { NormalizeDbTokensColumn } from '#models/provider/db_tokens_provider'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { BaseModel, beforeUpdate, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

type TokenTypeContract = 'email_verification' | 'reset_password'
type WithUserCredentialsClass<
  Model extends NormalizeConstructor<typeof BaseModel> = NormalizeConstructor<typeof BaseModel>,
> = Model & {
  new (...args: any[]): {
    username: string
    email: string
    password: string
    emailVerifiedAt: DateTime | null
    passwordLastChangedAt: DateTime | null
  }
  tokens: DbTokensProvider<Model, TokenTypeContract>
  accessTokens: DbAccessTokensProvider<Model>
  currentAccessTokens?: AccessToken
  createResetPasswordToken<T extends WithUserCredentialsClass>(
    this: T,
    user: InstanceType<T>
  ): Promise<NormalizeDbTokensColumn<TokenTypeContract>>
  createEmailVerificationToken<T extends WithUserCredentialsClass>(
    this: T,
    user: InstanceType<T>
  ): Promise<NormalizeDbTokensColumn<TokenTypeContract>>
  verifyToken<T extends WithUserCredentialsClass>(
    this: T,
    token: string,
    type: TokenTypeContract
  ): Promise<InstanceType<T>>
  resetPassword<T extends WithUserCredentialsClass>(
    this: T,
    token: string,
    password: string
  ): Promise<InstanceType<T>>
  updatePasswordTimestamp<T extends WithUserCredentialsClass>(this: InstanceType<T>): void
  verifyEmail<T extends WithUserCredentialsClass>(this: T, token: string): Promise<InstanceType<T>>
  updateEmailTimestamp<T extends WithUserCredentialsClass>(this: InstanceType<T>): void
}
export function WithUserCredentials<Model extends NormalizeConstructor<typeof BaseModel>>(
  superclass: Model
): WithUserCredentialsClass<Model> {
  class BaseClass extends superclass {
    @column()
    declare username: string

    @column()
    declare email: string

    @column()
    declare password: string

    @column.dateTime()
    declare emailVerifiedAt: DateTime | null

    @column.dateTime()
    declare passwordLastChangedAt: DateTime | null

    @beforeUpdate()
    static updatePasswordTimestamp<T extends WithUserCredentialsClass>(
      this: InstanceType<T>
    ): void {
      if (this.$dirty.password) {
        this.passwordLastChangedAt = DateTime.now()
      }
      /**
       * Todo - Event password has changed
       */
    }

    @beforeUpdate()
    static updateEmailTimestamp<T extends WithUserCredentialsClass>(this: InstanceType<T>): void {
      if (this.$dirty.email) {
        this.emailVerifiedAt = null
      }
      /**
       * Todo - Event email has changed
       */
    }

    static tokens = DbTokensProvider.forModel<TokenTypeContract, typeof BaseClass>(BaseClass)
    static accessTokens = DbAccessTokensProvider.forModel<typeof BaseClass>(BaseClass)
    static currentAccessTokens?: AccessToken

    static async createResetPasswordToken<T extends WithUserCredentialsClass>(
      this: T,
      user: InstanceType<T>
    ): Promise<NormalizeDbTokensColumn<TokenTypeContract>> {
      await this.tokens.clear(user, 'reset_password')
      return this.tokens.create(user, 'reset_password')
    }

    static async createEmailVerificationToken<T extends WithUserCredentialsClass>(
      this: T,
      user: InstanceType<T>
    ): Promise<NormalizeDbTokensColumn<TokenTypeContract>> {
      await this.tokens.clear(user, 'email_verification')
      return this.tokens.create(user, 'email_verification')
    }

    static async verifyToken<T extends WithUserCredentialsClass>(
      this: T,
      token: string,
      type: TokenTypeContract
    ): Promise<InstanceType<T>> {
      const data = await this.tokens.verify(token, type)

      if (!data || data.isExpires) {
        throw new Error('Invalid token provided or expired')
      }

      return this.query().where({ id: data.dbRow.tokenableId }).limit(1).firstOrFail()
    }

    static async resetPassword<T extends WithUserCredentialsClass>(
      this: T,
      token: string,
      password: string
    ): Promise<InstanceType<T>> {
      const user = await this.verifyToken(token, 'reset_password')

      user.password = password
      user.save()

      return user
    }

    static async verifyEmail<T extends WithUserCredentialsClass>(
      this: T,
      token: string
    ): Promise<InstanceType<T>> {
      const user = await this.verifyToken(token, 'email_verification')

      user.emailVerifiedAt = DateTime.now()
      user.save()

      return user
    }
  }

  return BaseClass
}
