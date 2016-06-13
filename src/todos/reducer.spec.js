import { expect } from 'chai';
import { stub, test } from 'sinon';
import { OrderedMap } from 'immutable';
import { reducers } from './reducer';
import { actionTypes as t } from './constants';
import { actionTypes } from '../generated/todo/';

describe('Test todo reducer', () => {
  let todos;
  let randomStub;
  let floorStub;
  beforeEach(() => {
    todos = reducers.todos;
    randomStub = stub(Math, 'random', () => 0.5);
    floorStub = stub(Math, 'floor', () => 1);
  });
  afterEach(() => {
    randomStub.restore();
    floorStub.restore();
  });

  describe('ActionType: add', () => {
    // these are lets as they get reassigned after every test
    let action;
    let initState;
    beforeEach(() => {
      action = {
        text: 'some text',
        type: t.add,
      };
      initState = new OrderedMap();
    });

    it('should add an item to the map', test(() => {
      expect(todos(initState, action).size).to.equal(initState.size + 1);
    }));
    it('should have a uuid associated with it', test(() => {
      expect(todos(initState, action)).to.not.be.undefined;
    }));
    it('should add a todo with the correct text', () => {
      expect(todos(initState, action).get(1).text).to.equal('some text');
    });
    it('should add a todo with the completed property set to false', () => {
      expect(todos(initState, action).get(1).completed).to.equal(false);
    });
  });
  describe('ActionType: delete', () => {
    it('should remove the todo from the list of todos', () => {
      const action = {
        type: t.delete,
        id: 1,
      };
      const state = new OrderedMap().set(1, {
        text: 'Delete Me',
        completed: false,
      });
      expect(todos(state, action).get(1)).to.be.undefined;
    });
  });
  describe('ActionType: complete', () => {
    it('should toggle the completed property of the todo', () => {
      const action = {
        type: t.complete,
        id: 1,
      };
      const state = new OrderedMap().set(1, {
        text: 'Complete Me',
        completed: false,
      });
      expect(todos(state, action).get(1).completed).to.equal(true);
    });
  });
  describe('ActionType: toggleall', () => {
    it('should toggle the completed variable for all todos', () => {
      const todoOne = {
        text: 'Complete Me',
        completed: false,
      };
      const todoTwo = {
        text: 'Uncomplete Me',
        completed: true,
      };
      const action = {
        type: t.toggleAll,
      };
      const state = new OrderedMap().set(1, todoOne).set(2, todoTwo);
      const newState = todos(state, action);
      expect(newState.get(1).completed).to.equal(true);
      expect(newState.get(2).completed).to.equal(false);
    });
  });
  describe('ActionType: clearCompleted', () => {
    it('should remove all the completed items from the state', () => {
      const todoOne = {
        text: 'Still Todo',
        completed: false,
      };
      const todoTwo = {
        text: 'Completed',
        completed: true,
      };
      const action = {
        type: t.clearCompleted,
      };
      const state = new OrderedMap().set(1, todoOne).set(2, todoTwo);
      const newState = todos(state, action);
      expect(newState.get(1)).to.equal(todoOne);
      expect(newState.get(2)).to.be.undefined;
    });
  });
  describe('ActionType: getTodos_success', () => {
    let action;
    beforeEach(() => {
      action = {
        type: actionTypes.getTodos_success,
        payload: {
          todos: [{
            text: 'Some Todo',
            completed: false,
          }],
        },
      };
    });
    it('should add all the todos to the state with a uuid', () => {
      const initState = new OrderedMap();
      expect(todos(initState, action).get(1)).to.equal(action.payload.todos[0]);
    });
    it('should override the todo in the existing state if the uuids override', () => {
      const initState = new OrderedMap().set(1, {
        text: 'Old todo',
        completed: true,
      });
      expect(todos(initState, action).get(1)).to.equal(action.payload.todos[0]);
    });
  });
  describe('ActionType: getTodos_failure', () => {
    it('should return the initial state', () => {
      const action = {
        type: actionTypes.getTodos_failure,
      };
      const initState = new OrderedMap().set({
        text: 'Some Todo',
        completed: false,
      });
      expect(todos(initState, action)).to.deep.equal(initState);
    });
  });
  describe('ActionType: rubbish', () => {
    let action;
    beforeEach(() => {
      action = {
        type: 'rubbish',
      };
    });
    it('should return the state when a rubbish action is passed', () => {
      const initState = new OrderedMap();
      expect(todos(initState, action)).to.equal(initState);
    });
    it('should provide an empty OrderedMap when no initial state is provided', () => {
      expect(todos(undefined, action)).to.equal(new OrderedMap());
    });
  });
});
