import { actionTypes as t } from './constants';
import { actionTypes as at } from './sagas';
import { OrderedMap } from 'immutable';

const uuid = () => Math.floor(Math.random() * 100000);

const todoMap = new OrderedMap();

// FIXME - get from sagas
// Please consider carefully, is it necessary to have the whole
// state object in immutable collection, especially if you will
// use reselect in the future.
const initialState = todoMap;

export default function todos(state = initialState, action) {
  switch (action.type) {
    case t.ADD: {
      return state.set(uuid(), {
        text: action.text,
        completed: false,
      });
    }
    case t.DELETE: {
      return state.delete(action.id);
    }
    case t.EDIT: {
      const todoToEdit = state.get(action.id);
      return state.set(action.id, { ...todoToEdit, text: action.text });
    }
    case t.COMPLETE: {
      const todoToComplete = state.get(action.id);
      return state.set(action.id, { ...todoToComplete, completed: !todoToComplete.completed });
    }
    case t.TOGGLE_ALL: {
      return state.map(r => ({ ...r, completed: !r.completed }));
    }
    case t.CLEAR_COMPLETED: {
      return state.filter(r => r.completed === false);
    }
    case at.getTodosActionTypes.ok: {
      return action.todos.reduce(
        (newState, next) => newState.set(uuid(), next),
        initialState
      );
    }
    case at.getTodosActionTypes.error: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
