import { ReactElement } from 'react'

const error = console.error

export class TodoItem {
  constructor(
    readonly id: number,
    readonly text: string,
    readonly completed: boolean = false
  ) { }

  static create(text: string) {
    return new TodoItem(0, text, false)
  }

  setCompleted(completed: boolean) {
    return this.copy(this.text, completed)
  }

  setText(newText: string) {
    if (this.completed) {
      error(`Unexpected [edit] action for [${this}]: item is completed.`)
    }
    return this.copy(newText, this.completed)
  }

  private copy(text: string, completed: boolean) {
    return new TodoItem(this.id, text, completed)
  }
}
