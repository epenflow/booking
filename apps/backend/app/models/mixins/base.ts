import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export type IdentifierContract = string | number | BigInt

type WithIdentifierClass<
  Model extends NormalizeConstructor<typeof BaseModel> = NormalizeConstructor<typeof BaseModel>,
> = Model & {
  new (...args: any[]): {
    id: IdentifierContract
  }
}
export function WithIdentifier<Model extends NormalizeConstructor<typeof BaseModel>>(
  superclass: Model
): WithIdentifierClass {
  class BaseClass extends superclass {
    @column({ isPrimary: true })
    declare id: IdentifierContract
  }

  return BaseClass
}

type WithTimestampsClass<
  Model extends NormalizeConstructor<typeof BaseModel> = NormalizeConstructor<typeof BaseModel>,
> = Model & {
  new (...args: any[]): {
    createdAt: DateTime
    updatedAt: DateTime
  }
}

export function WithTimestamps<Model extends NormalizeConstructor<typeof BaseModel>>(
  superclass: Model
): WithTimestampsClass<Model> {
  class BaseClass extends superclass {
    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
  }

  return BaseClass
}
