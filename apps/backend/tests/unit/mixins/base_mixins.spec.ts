import { IdentifierContract, WithIdentifier, WithTimestamps } from '#models/mixins/base'
import { createDatabase, createUsersTable } from '#tests/helpers'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

class User extends compose(BaseModel, WithIdentifier, WithTimestamps) {
  @column()
  declare username: string

  @column()
  declare email: string

  @column()
  declare password: string
}

const defaultUser = {
  username: 'test',
  email: 'test@test.com',
  password: 'secret',
}

test.group('Base Mixins', () => {
  test('should add both identifier and and timestamps properties to the model', async ({
    assert,
  }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    const user = await User.create(defaultUser)

    assert.properties(user.toJSON(), ['id', 'createdAt', 'updatedAt'])
  })

  test('should set correct data types for id and timestamps', async ({ expectTypeOf }) => {
    const db = await createDatabase()
    await createUsersTable(db)

    const user = await User.create(defaultUser)

    expectTypeOf(user.id).toEqualTypeOf<IdentifierContract>()
    expectTypeOf(user.createdAt).toEqualTypeOf<DateTime>()
    expectTypeOf(user.updatedAt).toEqualTypeOf<DateTime>()
  })
})
