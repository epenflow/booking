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

export async function createTable(db: Database) {
  const test = getActiveTestOrFail()

  const tableNames = {
    user: 'users',
  } as const

  test.cleanup(async () => {
    await db.connection().schema.dropTableIfExists(tableNames.user)
  })

  await db.connection().schema.createTableIfNotExists(tableNames.user, (table) => {
    table.increments('id')
    table.string('username').notNullable().unique()
    table.string('email').notNullable().unique()
    table.text('password').notNullable()
    table.timestamp('email_verified_at').nullable()
    table.timestamp('password_last_changed_at').nullable()
    table.timestamp('created_at')
    table.timestamp('updated_at')
  })
}
