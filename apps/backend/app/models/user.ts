import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { WithIdentifier, WithTimestamps } from './mixins/base.js'
import { WithUserComputedProperties, WithUserCredentials } from './mixins/user.js'

const WithAuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(
  BaseModel,
  WithIdentifier,
  WithTimestamps,
  WithUserCredentials,
  WithUserComputedProperties,
  WithAuthFinder
) {
  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare avatar: string | null

  @column.dateTime()
  declare dob: DateTime | null
}
