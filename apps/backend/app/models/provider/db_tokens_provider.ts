import { RuntimeException } from '@adonisjs/core/exceptions'
import string from '@adonisjs/core/helpers/string'
import { LucidModel } from '@adonisjs/lucid/types/model'
import { DateTime } from 'luxon'
import { inspect } from 'node:util'

type Identifier = string | number | BigInt

type DbTokensProviderOptions = {
  table?: string
  expiresIn?: DateTime
}

type DbTokensColumn<Type> = {
  id: Identifier
  type: Type
  tokenable_id: Identifier
  token: string
  expires_at: DateTime
  created_at: DateTime
  updated_at: DateTime
}

export type NormalizeDbTokensColumn<Type> = {
  id: Identifier
  tokenableId: Identifier
  type: Type
  token: string
  expiresAt: DateTime
  updatedAt: DateTime
  createdAt: DateTime
}

export default class DbTokensProvider<Model extends LucidModel, Type> {
  protected table: string
  constructor(
    protected model: Model,
    protected options: DbTokensProviderOptions
  ) {
    this.table = options.table || 'tokens'
  }

  static forModel<Type, Model extends LucidModel = LucidModel>(
    model: Model,
    options?: DbTokensProviderOptions
  ) {
    return new DbTokensProvider<Model, Type>(model, options || {})
  }

  protected db() {
    return this.model.query(this.model).client
  }

  protected toJSON(dbRow: DbTokensColumn<Type>): NormalizeDbTokensColumn<Type> {
    return {
      id: dbRow.id,
      tokenableId: dbRow.tokenable_id,
      type: dbRow.type,
      token: dbRow.token,
      expiresAt: dbRow.expires_at,
      createdAt: dbRow.created_at,
      updatedAt: dbRow.updated_at,
    }
  }

  #isObject(value: unknown) {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
  }

  #ensureUserIsPersisted(user: InstanceType<Model>) {
    const model = this.model
    if (user instanceof model === false) {
      throw new RuntimeException(
        `Invalid user object. It must be an instance of "${model.name}" model`
      )
    }

    if (!user.$primaryKeyValue) {
      throw new RuntimeException(
        `Cannot user "${model.name}" model for managing ${this.table}. The value of column "${model.primaryKey}" is undefined or null`
      )
    }
  }

  async create(user: InstanceType<Model>, type: Type) {
    this.#ensureUserIsPersisted(user)
    const client = this.db()

    const dbRow: Omit<DbTokensColumn<Type>, 'id'> = {
      tokenable_id: user.$primaryKeyValue!,
      type: type,
      token: string.random(32),
      created_at: DateTime.now(),
      updated_at: DateTime.now(),
      expires_at: this.options.expiresIn || DateTime.now().plus({ hour: 1 }),
    }

    const result = await client.table(this.table).insert(dbRow).returning('id')
    const id = this.#isObject(result[0]) ? result[0].id : result[0]

    if (!id) {
      throw new RuntimeException(
        `Cannot save token. The result "${inspect(result)}" of insert query is unexpected`
      )
    }

    return this.toJSON({ id, ...dbRow })
  }

  async find(user: InstanceType<Model>, identifier: Identifier, type?: Type) {
    this.#ensureUserIsPersisted(user)
    const client = this.db()

    const query = client
      .query<DbTokensColumn<Type>>()
      .from(this.table)
      .where({ id: identifier, tokenable_id: user.$primaryKeyValue! })

    if (type) {
      query.andWhere({ type: type })
    }
    const dbRow = await query.limit(1).first()

    if (!dbRow) return null

    return this.toJSON(dbRow)
  }

  async delete(user: InstanceType<Model>, identifier: Identifier, type?: Type) {
    this.#ensureUserIsPersisted(user)
    const client = this.db()

    const query = client
      .query<number>()
      .from(this.table)
      .where({ id: identifier, tokenable_id: user.$primaryKeyValue! })

    if (type) {
      query.andWhere({ type: type })
    }

    const affectedRows = await query.del().exec()

    return affectedRows as unknown as number
  }

  async all(user: InstanceType<Model>, type?: Type) {
    this.#ensureUserIsPersisted(user)
    const client = this.db()

    const query = client
      .query<DbTokensColumn<Type>>()
      .from(this.table)
      .where({ tokenable_id: user.$primaryKeyValue! })

    if (type) {
      query.andWhere({ type: type })
    }

    const dbRows = await query.orderBy('id', 'desc').exec()

    return dbRows.map((dbRow) => this.toJSON(dbRow))
  }

  async clear(user: InstanceType<Model>, type?: Type) {
    this.#ensureUserIsPersisted(user)
    const client = this.db()

    const query = client
      .query<number>()
      .from(this.table)
      .where({ tokenable_id: user.$primaryKeyValue! })

    if (type) {
      query.andWhere({ type: type })
    }
    const affectedRows = await query.del().exec()

    return affectedRows as unknown as number
  }

  async invalidated(token: string, type?: Type) {
    const client = this.db()

    const query = client.query<number>().from(this.table).where({ token: token, type: type })

    if (type) {
      query.andWhere({ type: type })
    }

    const count = await query.del().exec()

    return Boolean(count)
  }

  async verify(token: string, type: Type) {
    const db = this.db()

    const dbRow = await db
      .query<DbTokensColumn<Type>>()
      .from(this.table)
      .where({ token: token, type: type })
      .limit(1)
      .first()

    if (!dbRow) return null

    return {
      isExpires: dbRow.expires_at <= DateTime.now(),
      dbRow: this.toJSON(dbRow),
    }
  }
}
