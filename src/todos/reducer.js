import { OrderedMap } from 'immutable';

import { actionTypes as t } from './constants';
import getTodosSaga from './getTodosSaga';

const uuid = () => Math.floor(Math.random() * 100000);

const todoMap = new OrderedMap();

// FIXME - get from sagas
// Please consider carefully, is it necessary to have the whole
// state object in immutable collection, especially if you will
// use reselect in the future.
const initialState = todoMap;

export default function todos(state = initialState, action) {
  switch (action.type) {
    case t.add: {
      return state.set(uuid(), {
        text: action.text,
        completed: false,
      });
    }
    case t.delete: {
      return state.delete(action.id);
    }
    case t.edit: {
      const todoToEdit = state.get(action.id);
      return state.set(action.id, { ...todoToEdit, text: action.text });
    }
    case t.complete: {
      const todoToComplete = state.get(action.id);
      return state.set(action.id, { ...todoToComplete, completed: !todoToComplete.completed });
    }
    case t.toggleAll: {
      return state.map(r => ({ ...r, completed: !r.completed }));
    }
    case t.clearCompeted: {
      return state.filter(r => r.completed === false);
    }
    case getTodosSaga.actionTypes.success: {
      return action.todos.reduce(
        (newState, next) => newState.set(uuid(), next),
        initialState
      );
    }
    // fixme
    case getTodosSaga.actionTypes.failure: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
