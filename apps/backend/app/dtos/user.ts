import { IdentifierContract } from '#models/mixins/base'
import User from '#models/user'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class UserDto extends BaseModelDto {
  declare id: IdentifierContract
  declare firstName: string | null
  declare lastName: string | null
  declare avatar: string | null
  declare dob: string | null
  // Credentials properties
  declare username: string
  declare email: string
  // declare password: string
  declare emailVerifiedAt: string | null
  declare passwordLastChangedAt: string | null
  // Computed properties
  declare fullName: string | null
  declare initialName: string
  declare age: number | null
  // Timestamps properties
  declare createdAt: string
  declare updatedAt: string

  constructor(user?: User) {
    super()

    if (!user) return

    this.id = user.id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.avatar = user.avatar
    this.dob = user.dob?.toISOTime() || null
    // Credentials properties
    this.username = user.username
    this.email = user.email
    // this.password = user.password
    this.emailVerifiedAt = user.emailVerifiedAt?.toISOTime() || null
    this.passwordLastChangedAt = user.passwordLastChangedAt?.toISOTime() || null
    // Computed properties
    this.fullName = user.fullName
    this.initialName = user.initialName
    this.age = user.age
    // Timestamps properties
    this.createdAt = user.createdAt.toISOTime()!
    this.updatedAt = user.updatedAt.toISOTime()!
  }

  static create(user?: User) {
    return new UserDto(user)
  }
}
