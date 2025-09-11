import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

type WithTimestampsClass<
  Model extends NormalizeConstructor<typeof BaseModel> = NormalizeConstructor<typeof BaseModel>,
> = Model & {
  new (...args: any[]): {
    createdAt: DateTime
    updatedAt: DateTime
  }
}

export default function WithTimestamps<Model extends NormalizeConstructor<typeof BaseModel>>(
  superclass: Model
): WithTimestampsClass<Model> {
  class WithTimestampsClass extends superclass {
    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
  }

  return WithTimestampsClass
}
