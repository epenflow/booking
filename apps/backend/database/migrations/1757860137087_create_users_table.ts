import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected cascade = 'CASCADE'
  protected tableNames = {
    user: 'users',
    authAccessToken: 'auth_access_tokens',
    dbTokensProvider: 'user_db_tokens_provider',
  }

  async up() {
    // create user table
    this.schema.createTable(this.tableNames.user, (table) => {
      table.increments('id').notNullable()
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.json('avatar').nullable()
      table.string('username').notNullable().unique()
      table.string('email').notNullable().unique()
      table.text('password').notNullable()
      table.timestamp('dob').nullable()
      table.timestamp('email_verified_at').nullable().defaultTo(null)
      table.timestamp('password_last_changed_at').nullable().defaultTo(null)
      table.timestamps(true)
    })

    // create auth access token table
    this.schema.createTable(this.tableNames.authAccessToken, (table) => {
      table.increments('id')
      table
        .integer('tokenable_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable(this.tableNames.user)
        .onDelete(this.cascade)

      table.string('type').notNullable()
      table.string('name').nullable()
      table.string('hash').notNullable()
      table.text('abilities').notNullable()
      table.timestamp('last_used_at').nullable()
      table.timestamp('expires_at').nullable()
      table.timestamps(true)
    })

    this.schema.createTable(this.tableNames.dbTokensProvider, (table) => {
      table.increments('id')
      table
        .integer('tokenable_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable(this.tableNames.user)
        .onDelete(this.cascade)
      table.string('type').notNullable()
      table.string('token').notNullable()
      table.timestamp('expires_at').notNullable()
      table.timestamps(true)
      table.index(['type', 'token'])
    })
  }

  async down() {
    // Drop tables
    Object.entries(this.tableNames)
      .reverse()
      .forEach(([, tableName]) => {
        this.schema.dropTable(tableName)
      })
  }
}
