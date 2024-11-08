import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Item, Todo} from '../models';
import {ItemRepository, TodoRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class TodoManagementService {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
    @repository(ItemRepository)
    public itemRepository: ItemRepository,
  ) {}

  async createTodoWithItems(todoData: Todo, itemsData: Item[]): Promise<Todo> {
    const todo = await this.todoRepository.create(todoData);

    const items = itemsData.map(itemData => ({
      ...itemData,
      todoId: todo.id,
    }));

    await this.itemRepository.createAll(items);

    const resData = await this.todoRepository.findById(todo.id, {
      include: ['items'],
    });

    return resData;
  }
}
