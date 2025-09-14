import env from '#start/env'
import { Emitter } from '@adonisjs/core/events'
import { AppFactory } from '@adonisjs/core/factories/app'
import { LoggerFactory } from '@adonisjs/core/factories/logger'
import { Database } from '@adonisjs/lucid/database'
import { BaseModel } from '@adonisjs/lucid/orm'
import { getActiveTestOrFail } from '@japa/runner'
import { mkdir, rm } from 'node:fs/promises'

export async function createDatabase() {
  const test = getActiveTestOrFail()

  const basePath = test.context.fs.basePath
  await mkdir(basePath)

  const app = new AppFactory().create(test.context.fs.baseUrl, () => {})
  const logger = new LoggerFactory().create()
  const emitter = new Emitter(app)
  const db = new Database(
    {
      connection: 'pg',
      connections: {
        pg: {
          client: 'pg',
          connection: {
            host: env.get('DB_TEST_HOST'),
            port: env.get('DB_TEST_PORT'),
            user: env.get('DB_TEST_USER'),
            password: env.get('DB_TEST_PASSWORD'),
            database: env.get('DB_TEST_DATABASE'),
          },
        },
      },
    },
    logger,
    emitter
  )

  test.cleanup(async () => {
    db.manager.closeAll()
    await rm(basePath, { force: true, recursive: true, maxRetries: 3 })
  })
  BaseModel.useAdapter(db.modelAdapter())

  return db
}

export async function createDbTokensTable(
  db: Database,
  options?: {
    tableName?: string
    references?: string
  }
) {
  const test = getActiveTestOrFail()
  const tableName = options?.tableName || 'tokens'
  const references = options?.references || 'users.id'

  test.cleanup(async () => {
    await db.connection().schema.dropTableIfExists(tableName)
  })

  await db.connection().schema.createTableIfNotExists(tableName, (table) => {
    table.increments('id')
    table
      .integer('tokenable_id')
      .notNullable()
      .unsigned()
      .references(references)
      .onDelete('CASCADE')
    table.string('type').notNullable()
    table.string('token').notNullable()
    table.index(['type', 'token'])
    table.timestamp('expires_at').notNullable()
    table.timestamps(true)
  })
}
export async function createUsersTable(
  db: Database,
  options?: {
    tableName?: string
  }
) {
  const test = getActiveTestOrFail()
  const tableName = options?.tableName || 'users'

  test.cleanup(async () => {
    await db.connection().schema.dropTableIfExists(tableName)
  })

  await db.connection().schema.createTableIfNotExists(tableName, (table) => {
    table.increments('id')
    table.string('username').notNullable().unique()
    table.string('email').notNullable().unique()
    table.text('password').notNullable()
    table.timestamp('email_verified_at').nullable()
    table.timestamp('password_last_changed_at').nullable()
    table.timestamps(true)
  })
}
