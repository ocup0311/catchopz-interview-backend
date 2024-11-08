import {getModelSchemaRef, SchemaObject} from '@loopback/rest';
import {Item, Todo} from '../../models';

export const TodoSchemaWithItems = {
  type: 'object',
  properties: {
    ...getModelSchemaRef(Todo).definitions.Todo.properties,
    items: {
      type: 'array',
      items: getModelSchemaRef(Item).definitions.Item,
    },
  },
};

const TodoItemsSchema: SchemaObject = {
  type: 'object',
  required: ['todo', 'items'],
  properties: {
    todo: getModelSchemaRef(Todo, {
      title: 'NewTodo',
      exclude: ['id'],
    }),
    items: {
      type: 'array',
      title: 'NewItems in NewTodo',
      items: getModelSchemaRef(Item, {
        title: 'NewItem',
        exclude: ['id', 'todoId'],
      }),
    },
  },
};

export const TodoItemsReqBody = {
  description: 'The input of a todo set with multiple items',
  required: true,
  content: {
    'application/json': {schema: TodoItemsSchema},
  },
};
