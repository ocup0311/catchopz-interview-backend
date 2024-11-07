import {belongsTo, model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {Todo, TodoWithRelations} from './todo.model';

@model({
  settings: {
    foreignKeys: {
      fkItemTodoId: {
        name: 'fk_item_todoId',
        entity: 'Todo',
        entityKey: 'id',
        foreignKey: 'todoId',
      },
    },
    indexes: {
      ['idx_tid_due']: {
        keys: {
          todoId: 1,
          dueDate: 1,
        },
      },
    },
  },
})
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
      dataType: 'TIMESTAMP',
    },
  })
  completedAt?: Date;

  @property({
    type: 'date',
    mysql: {
      dataType: 'TIMESTAMP',
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
      dataType: 'TEXT',
    },
  })
  notes?: string;

  @belongsTo(() => Todo)
  todoId: number;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
  Todo?: TodoWithRelations;
}

export type ItemWithRelations = Item & ItemRelations;
