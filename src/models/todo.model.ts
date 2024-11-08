import {hasMany, model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {Item, ItemWithRelations} from './item.model';

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum Priority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

@model({
  settings: {
    scope: {
      where: {
        isDeleted: false,
      },
    },
    indexes: {
      ['idx_status']: {
        keys: {
          status: 1,
        },
      },
      ['idx_priority']: {
        keys: {
          priority: -1,
        },
      },
      ['idx_due_pri']: {
        keys: {
          dueDate: 1,
          priority: -1,
        },
      },
    },
  },
})
export class Todo extends BaseModel {
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
  title: string;

  @property({
    type: 'string',
  })
  subtitle?: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: "ENUM('active', 'inactive')",
    },
    jsonSchema: {
      enum: Object.values(Status),
    },
  })
  status: Status;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    mysql: {
      dataType: 'TINYINT',
    },
    jsonSchema: {
      enum: Object.values(Priority),
    },
    default: Priority.MEDIUM,
  })
  priority?: Priority;

  @property({
    type: 'date',
    mysql: {
      dataType: 'TIMESTAMP',
    },
  })
  dueDate?: Date;

  @property({
    type: 'boolean',
    default: false,
  })
  isCompleted?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  isDeleted?: boolean;

  @property({
    type: 'date',
    mysql: {
      dataType: 'TIMESTAMP',
    },
  })
  deletedAt?: Date;

  @hasMany(() => Item)
  items: Item[];

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
  items?: ItemWithRelations[];
}

export type TodoWithRelations = Todo & TodoRelations;
