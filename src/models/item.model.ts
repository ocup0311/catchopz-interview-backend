import {model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';

@model()
export class Item extends BaseModel {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isCompleted: boolean;

  @property({
    type: 'date',
    mysql: {
      columnType: 'TIMESTAMP',
    },
  })
  completedAt?: Date;

  @property({
    type: 'date',
    mysql: {
      columnType: 'TIMESTAMP',
    },
  })
  dueDate?: Date;

  @property({
    type: 'array',
    itemType: 'string',
  })
  tags?: string[];

  @property({
    type: 'string',
    mysql: {
      columnType: 'TEXT',
    },
  })
  notes?: string;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
