import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected cascade = 'CASCADE'
  protected tableNames = {
    user: 'users',
    authAccessToken: 'auth_access_tokens',
  }

  async up() {
    // create user table
    this.schema.createTable(this.tableNames.user, (table) => {
      table.increments('id').notNullable()
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
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
    })

    // Create Timestamps column
    Object.entries(this.tableNames).forEach(([, tableName]) => {
      this.schema.alterTable(tableName, (table) => {
        table.timestamp('created_at')
        table.timestamp('updated_at')
      })
    })
  }

  async down() {
    // Drop Timestamps column
    Object.entries(this.tableNames).forEach(([, tableName]) => {
      this.schema.alterTable(tableName, (table) => {
        table.dropColumn('created_at')
        table.dropColumn('updated_at')
      })
    })

    // Drop tables
    Object.entries(this.tableNames)
      .reverse()
      .forEach(([, tableName]) => {
        this.schema.dropTable(tableName)
      })
  }
}
