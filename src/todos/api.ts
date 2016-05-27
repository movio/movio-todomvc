/**
 * Please note that the content of this file is mainly demostration purpose,
 * in the real application, we should not need to manually mantain those
 * functions, or you don't need them at all, such as the fake data source.
 */

import { OrderedMap, List } from 'immutable'
import { Maybe, Either, Right, Left } from 'tsfp'
import { TodoItem } from './models'

// ============================================================================
//  Fake data source, ignore the details.
// ============================================================================

class FakeDb {

  private itemsMap = OrderedMap<string, TodoItem>({
    '1': new TodoItem(1, 'Foo', false),
    '2': new TodoItem(2, 'Bar', false)
  })

  findAll(): Either<Error, List<TodoItem>> {
    return Right<Error, List<TodoItem>>(this.itemsMap.valueSeq().toList())
  }

  findById(id: number): Either<Error, TodoItem> {
    return Maybe.of(this.itemsMap.get(`${id}`)).toRight(
      new Error(`No todo item found with id [${id}].`)
    )
  }

  // delete an existed todo item
  remove(itemIds: List<number>): Either<Error, number> {
    const toDelete = itemIds
      .map(s => this.findById(s))
      .filter(s => s.isRight)
      .map(s => s.right.get.id)
    this.itemsMap = this.itemsMap.filter(s => !toDelete.contains(s.id)).toOrderedMap()
    return Right<Error, number>(toDelete.size)
  }

  merge(items: List<TodoItem>): Either<Error, List<TodoItem>> {
    const failure = items
      .filter(s => s.id > 0)
      .map(s => this.findById(s.id))
      .find(s => s.isLeft)

    if (failure !== undefined) {
      return Left<Error, List<TodoItem>>(failure.left.get)
    }

    items.forEach(s => s.id > 0 ? this.update(s) : this.add(s))

    return Right<Error, List<TodoItem>>(this.itemsMap.valueSeq().toList())
  }

  private add(newItem: TodoItem) {
    const itemId = Maybe.of(this.itemsMap.last()).map(s => s.id).getOrElse(1) + 1
    const item = new TodoItem(itemId, newItem.text, false)
    this.itemsMap = this.itemsMap.set(`${itemId}`, item)
  }

  private update(updated: TodoItem) {
    this.itemsMap = this.itemsMap.set(`${updated.id}`, updated)
  }

}

// ============================================================================

const db = new FakeDb()

export const getTodoItems = () => new Promise<{ response: List<TodoItem> }>(
  (resolve, reject) => db.findAll().fold(
    error => reject(error),
    response => resolve({ response })
  )
)

export const putTodoItem = (items: List<TodoItem>) => new Promise<{ response: List<TodoItem> }>(
  (resolve, reject) => db.merge(items).fold(
    error => reject(error),
    response => resolve({ response })
  )
)

export const deleteTodoItems = (itemIds: List<number>) => new Promise<{ response: number }>(
  (resolve, reject) => db.remove(itemIds).fold(
    error => reject(error),
    response => resolve({ response })
  )
)
