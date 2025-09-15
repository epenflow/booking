import { UserFactory } from '#database/factories/user_factory'
import { DbTokenTypeContract } from '#models/mixins/user'
import { NormalizeDbTokensColumn } from '#models/provider/db_tokens_provider'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

test.group('User computed props mixins', (group) => {
  group.setup(() => testUtils.db('test').migrate())
  group.each.setup(() => testUtils.db('test').truncate())

  test('should compute full name correctly', async ({ assert }) => {
    const user = await UserFactory.merge({
      firstName: 'John',
      lastName: 'Doe',
    }).create()

    assert.equal(user.fullName, 'John Doe')
  })

  test('should compute initial name and return fallback name if the fullname is not available', async ({
    assert,
  }) => {
    const firstUser = await UserFactory.merge({
      firstName: 'Jane',
      lastName: 'Smith',
    }).create()
    const secondUser = await UserFactory.merge({
      firstName: null,
      lastName: null,
      username: 'jane',
    }).create()

    assert.equal(firstUser.initialName, 'JS')
    assert.equal(secondUser.initialName, 'J')
  })

  test('should compute age correctly from dob', async ({ assert }) => {
    const dob = DateTime.now().minus({ years: 25, months: 3, days: 10 })
    const user = await UserFactory.merge({ dob }).create()

    assert.equal(user.age, 25)
  })
})

test.group('User credentials mixins', (group) => {
  group.setup(() => testUtils.db('test').migrate())
  group.each.setup(() => testUtils.db('test').truncate())

  test('should create and verify email verification token', async ({ assert, expectTypeOf }) => {
    const user = await UserFactory.merge({ emailVerifiedAt: null }).create()
    const createdToken = await User.createEmailVerificationToken(user)

    assert.isNull(user.emailVerifiedAt)
    assert.exists(createdToken)
    expectTypeOf(createdToken).toEqualTypeOf<NormalizeDbTokensColumn<DbTokenTypeContract>>()

    const verifiedUser = await User.verifyEmail(createdToken.token)
    assert.isNotNull(verifiedUser.emailVerifiedAt)
  })

  test('should create and verify reset password token', async ({ assert, expectTypeOf }) => {
    const user = await UserFactory.merge({ passwordLastChangedAt: null }).create()
    const createdToken = await User.createResetPasswordToken(user)

    assert.isNull(user.passwordLastChangedAt)
    assert.exists(createdToken)
    expectTypeOf(createdToken).toEqualTypeOf<NormalizeDbTokensColumn<DbTokenTypeContract>>()

    const password = 'new'
    const updateUser = await User.resetPassword(createdToken.token, password)

    assert.isTrue(await updateUser.verifyPassword(password))
    assert.isNotNull(updateUser.passwordLastChangedAt)
  })

  test('should throw an error for an invalid token', async ({ assert }) => {
    const user = await UserFactory.create()
    await User.createEmailVerificationToken(user)

    await assert.rejects(
      () => User.verifyEmail('invalid-token'),
      'Invalid token provided or expired'
    )
  })
})
