import {Entity, model, property} from '@loopback/repository';

@model()
export class BaseModel extends Entity {
  @property({
    type: 'date',
    mysql: {
      // columnName: 'created_at',
      dataType: 'TIMESTAMP',
      default: 'CURRENT_TIMESTAMP',
    },
  })
  createdAt?: Date;

  @property({
    mysql: {
      dataType: 'TIMESTAMP',
      default: 'CURRENT_TIMESTAMP',
      update: 'CURRENT_TIMESTAMP',
    },
  })
  updatedAt?: Date;

  constructor(data?: Partial<BaseModel>) {
    super(data);
  }
}
