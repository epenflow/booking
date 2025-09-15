import User from '#models/user'
import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dob: DateTime.fromJSDate(faker.date.birthdate()),
      username: faker.internet.username().toLowerCase().trim(),
      email: faker.internet.email(),
      password: '1',
      emailVerifiedAt: DateTime.now(),
    }
  })
  .build()
