import {Entity, model, property} from '@loopback/repository';

@model()
export class BaseModel extends Entity {
  @property({
    type: 'date',
    mysql: {
      columnType: 'TIMESTAMP',
      default: 'CURRENT_TIMESTAMP',
    },
  })
  createdAt?: Date;

  @property({
    type: 'date',
    mysql: {
      columnType: 'TIMESTAMP',
      default: 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    },
  })
  updatedAt?: Date;

  constructor(data?: Partial<BaseModel>) {
    super(data);
  }
}

export interface BaseModelRelations {
  // describe navigational properties here
}

export type BaseModelWithRelations = BaseModel & BaseModelRelations;
