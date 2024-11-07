import {model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

@model()
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
    jsonSchema: {
      enum: Object.values(Status),
    },
  })
  status: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(Priority),
    },
    default: Priority.MEDIUM,
  })
  priority?: string;

  @property({
    type: 'date',
    mysql: {
      columnType: 'TIMESTAMP',
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
      columnType: 'TIMESTAMP',
    },
  })
  deletedAt?: Date;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
