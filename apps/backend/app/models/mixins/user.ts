import DbTokensProvider, { NormalizeDbTokensColumn } from '#models/provider/db_tokens_provider'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import emitter from '@adonisjs/core/services/emitter'
import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { BaseModel, beforeUpdate, column, computed } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export type DbTokenTypeContract = 'email_verification' | 'reset_password'
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
  tokens: DbTokensProvider<Model, DbTokenTypeContract>
  accessTokens: DbAccessTokensProvider<Model>
  currentAccessTokens?: AccessToken
  createResetPasswordToken<T extends WithUserCredentialsClass>(
    this: T,
    user: InstanceType<T>
  ): Promise<NormalizeDbTokensColumn<DbTokenTypeContract>>
  createEmailVerificationToken<T extends WithUserCredentialsClass>(
    this: T,
    user: InstanceType<T>
  ): Promise<NormalizeDbTokensColumn<DbTokenTypeContract>>
  verifyToken<T extends WithUserCredentialsClass>(
    this: T,
    token: string,
    type: DbTokenTypeContract
  ): Promise<InstanceType<T>>
  resetPassword<T extends WithUserCredentialsClass>(
    this: T,
    token: string,
    password: string
  ): Promise<InstanceType<T>>
  verifyEmail<T extends WithUserCredentialsClass>(this: T, token: string): Promise<InstanceType<T>>
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
    static async updatePasswordTimestamp(user: BaseClass): Promise<void> {
      if (user.$dirty.password) {
        user.passwordLastChangedAt = DateTime.now()
        emitter.emit('user:credentials:password:change', user)
      }
    }

    @beforeUpdate()
    static async updateEmailTimestamp(user: BaseClass): Promise<void> {
      if (user.$dirty.email) {
        user.emailVerifiedAt = null
        emitter.emit('user:credentials:email:change', user)
      }
    }

    static tokens = DbTokensProvider.forModel<DbTokenTypeContract, typeof BaseClass>(BaseClass, {
      table: 'user_db_tokens_provider',
    })
    static accessTokens = DbAccessTokensProvider.forModel<typeof BaseClass>(BaseClass)
    static currentAccessTokens?: AccessToken

    static async createResetPasswordToken<T extends WithUserCredentialsClass>(
      this: T,
      user: InstanceType<T>
    ): Promise<NormalizeDbTokensColumn<DbTokenTypeContract>> {
      await this.tokens.clear(user, 'reset_password')
      return this.tokens.create(user, 'reset_password')
    }

    static async createEmailVerificationToken<T extends WithUserCredentialsClass>(
      this: T,
      user: InstanceType<T>
    ): Promise<NormalizeDbTokensColumn<DbTokenTypeContract>> {
      await this.tokens.clear(user, 'email_verification')
      return this.tokens.create(user, 'email_verification')
    }

    static async verifyToken<T extends WithUserCredentialsClass>(
      this: T,
      token: string,
      type: DbTokenTypeContract
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
      await user.save()

      return user
    }

    static async verifyEmail<T extends WithUserCredentialsClass>(
      this: T,
      token: string
    ): Promise<InstanceType<T>> {
      const user = await this.verifyToken(token, 'email_verification')

      user.emailVerifiedAt = DateTime.now()
      await user.save()

      return user
    }
  }

  return BaseClass
}

declare module '@adonisjs/core/types' {
  interface EventsList {
    'user:credentials:email:change': InstanceType<WithUserCredentialsClass>
    'user:credentials:password:change': InstanceType<WithUserCredentialsClass>
  }
}

type WithUserComputedPropertiesClass<
  Model extends NormalizeConstructor<typeof BaseModel> = NormalizeConstructor<typeof BaseModel>,
> = Model & {
  new (...args: any[]): {
    fullName: string | null
    initialName: string
    age: number | null
  }
}
export function WithUserComputedProperties<Model extends NormalizeConstructor<typeof BaseModel>>(
  superclass: Model
): WithUserComputedPropertiesClass<Model> {
  class BaseClass extends superclass {
    @computed()
    get fullName(): string | null {
      const firstName: string | null = (this as any)['firstName']
      const lastName: string | null = (this as any)['lastName']

      if (!firstName && !lastName) return null

      const fullName = `${firstName || ''} ${lastName || ''}`.trim()

      return fullName.length > 0 ? fullName : null
    }

    @computed()
    get initialName(): string {
      const defaultInitialName = ((this as any)['username'] as string).charAt(0).toUpperCase()

      if (!this.fullName) return defaultInitialName

      const names = this.fullName.split(' ').filter(Boolean)

      if (names.length === 0) return defaultInitialName
      if (names.length === 1) return names[0].charAt(0).toUpperCase()

      const firstInitialName = names[0].charAt(0).toUpperCase()
      const lastInitialName = names[names.length - 1].charAt(0).toUpperCase()

      return firstInitialName + lastInitialName
    }

    @computed()
    get age(): number | null {
      const dob: DateTime | null = (this as any)['dob']

      if (!dob) return null

      const age = DateTime.now().diff(dob, ['years', 'months', 'days']).toObject()

      return age.years || null
    }
  }
  return BaseClass
}
