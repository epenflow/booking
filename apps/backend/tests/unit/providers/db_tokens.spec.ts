import { type IdentifierContract, WithIdentifier, WithTimestamps } from '#models/mixins/base'
import DbTokensProvider, { NormalizeDbTokensColumn } from '#models/provider/db_tokens_provider'
import { createDatabase, createDbTokensTable, createUsersTable } from '#tests/helpers'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

type DbTokenTypeContract = 'reset_password' | 'email_verification'
class User extends compose(BaseModel, WithIdentifier, WithTimestamps) {
  @column({ isPrimary: true })
  declare id: IdentifierContract

  @column()
  declare username: string

  @column()
  declare email: string

  @column()
  declare password: string

  static tokens = DbTokensProvider.forModel<DbTokenTypeContract, typeof User>(User, {
    table: 'tokens',
  })
}

const defaultUser = {
  username: 'test',
  email: 'test@test.com',
  password: 'secret',
}

test.group('Db Tokens Provider', () => {
  test('create token for user', async ({ assert, expectTypeOf }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const user = await User.create(defaultUser)

    const data = await User.tokens.create(user, 'reset_password')

    assert.exists(data.id)
    assert.exists(data.tokenableId)
    expectTypeOf(data.type).toEqualTypeOf<DbTokenTypeContract>()
    expectTypeOf(data).toEqualTypeOf<NormalizeDbTokensColumn<DbTokenTypeContract>>()
  })

  test('create token with a specific expiresIn', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const expiresIn = DateTime.now().plus({ hours: 2 })
    const user = await User.create(defaultUser)
    const provider = DbTokensProvider.forModel<DbTokenTypeContract, typeof User>(User, {
      table: 'tokens',
      expiresIn: expiresIn,
    })
    const token = await provider.create(user, 'reset_password')
    assert.deepEqual(token.expiresAt, expiresIn)
  })

  test('throw exception when creating token for un-persisted user', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const user = new User()
    user.username = 'newuser'

    await assert.rejects(async () => {
      await User.tokens.create(user, 'reset_password')
    }, `Cannot use "User" model for managing tokens. The value of column "id" is undefined or null`)
  })

  test('throw exception when creating token for invalid user object', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    await assert.rejects(async () => {
      await User.tokens.create({} as User, 'reset_password')
    }, `Invalid user object. It must be an instance of "User" model`)
  })

  test('verify token successfully', async ({ assert, expectTypeOf, expect }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const user = await User.create(defaultUser)

    const createdToken = await User.tokens.create(user, 'reset_password')

    const data = await User.tokens.verify(createdToken.token, createdToken.type)

    assert.exists(data)
    expectTypeOf(data!.dbRow).toEqualTypeOf<NormalizeDbTokensColumn<DbTokenTypeContract>>()
    expect(data!.dbRow.type).toBe('reset_password')
    assert.isFalse(data!.isExpires)
  })

  test('verify return null for non-existent token', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const data = await User.tokens.verify('non_existent_token', 'email_verification')
    assert.isNull(data)
  })

  test('verify identifies an expired token', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const provider = DbTokensProvider.forModel<DbTokenTypeContract, typeof User>(User, {
      table: 'tokens',
      expiresIn: DateTime.now().minus({ minute: 5 }),
    })
    const user = await User.create(defaultUser)
    const createdToken = await provider.create(user, 'email_verification')

    const data = await provider.verify(createdToken.token, createdToken.type)
    assert.isTrue(data!.isExpires)
  })

  test('find token by identifier and type', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const user = await User.create(defaultUser)
    const createdToken = await User.tokens.create(user, 'email_verification')

    const foundToken = await User.tokens.find(user, createdToken.id, 'email_verification')

    assert.exists(foundToken)
    assert.deepEqual(foundToken!.id, createdToken.id)
    assert.deepEqual(foundToken!.token, createdToken.token)
    assert.deepEqual(foundToken!.type, 'email_verification')
  })

  test('find token without type constraint', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const user = await User.create(defaultUser)
    const createdToken = await User.tokens.create(user, 'email_verification')

    const foundToken = await User.tokens.find(user, createdToken.id)

    assert.exists(foundToken)
    assert.deepEqual(foundToken!.id, createdToken.id)
  })

  test('find returns null for non-existent token', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const user = await User.create(defaultUser)
    const foundToken = await User.tokens.find(user, 9999) // non-existent id

    assert.isNull(foundToken)
  })

  test('delete token by identifier', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const user = await User.create(defaultUser)
    const createdToken = await User.tokens.create(user, 'reset_password')

    const affectedRows = await User.tokens.delete(user, createdToken.id)
    assert.equal(affectedRows, 1)

    const foundToken = await User.tokens.find(user, createdToken.id)
    assert.isNull(foundToken)
  })

  test('all returns tokens of a specific type', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const user = await User.create(defaultUser)
    await User.tokens.create(user, 'reset_password')
    await User.tokens.create(user, 'email_verification')
    await User.tokens.create(user, 'reset_password')

    const resetTokens = await User.tokens.all(user, 'reset_password')
    assert.equal(resetTokens.length, 2)
  })

  test('clear all tokens for a user', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const user = await User.create(defaultUser)
    await User.tokens.create(user, 'reset_password')
    await User.tokens.create(user, 'email_verification')

    const affectedRows = await User.tokens.clear(user)
    assert.equal(affectedRows, 2)

    const allTokens = await User.tokens.all(user)
    assert.equal(allTokens.length, 0)
  })

  test('clear tokens of a specific type for a user', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const user = await User.create(defaultUser)
    await User.tokens.create(user, 'reset_password')
    await User.tokens.create(user, 'email_verification')
    await User.tokens.create(user, 'reset_password')

    const affectedRows = await User.tokens.clear(user, 'reset_password')
    assert.equal(affectedRows, 2)

    const remainingTokens = await User.tokens.all(user)
    assert.equal(remainingTokens.length, 1)
    assert.equal(remainingTokens[0].type, 'email_verification')
  })

  test('invalidate token successfully', async ({ assert }) => {
    const db = await createDatabase()
    await createUsersTable(db)
    await createDbTokensTable(db)

    const user = await User.create(defaultUser)
    const createdToken = await User.tokens.create(user, 'reset_password')

    const isInvalidated = await User.tokens.invalidated(createdToken.token, createdToken.type)
    assert.isTrue(isInvalidated)

    const foundToken = await User.tokens.find(user, createdToken.id)
    assert.isNull(foundToken)
  })
})
