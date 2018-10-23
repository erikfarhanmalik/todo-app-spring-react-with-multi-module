import {SET_TODO_ACTION_TYPE, ADD_TODO_ACTION_TYPE, DELETE_TODO_ACTION_TYPE, CHANGE_TODO_STATUS_ACTION_TYPE, TOGGLE_HIDE_DONE_TODO_ACTION_TYPE} from '../action/TodoActions';

// use combine reducer if you have a lot of reducers groups
export function reducers(state = {}, action) {

  console.log(action);
  switch (action.type) {
    case SET_TODO_ACTION_TYPE:
      {
        return {
          ...state,
          todos: action.payload
        }
      }

    case ADD_TODO_ACTION_TYPE:
      {
        var todos = [...state.todos];
        todos.push(action.payload);
        return {
          ...state,
          todos: todos
        }
      }

    case DELETE_TODO_ACTION_TYPE:
      {
        var todos = [...state.todos].filter((item, index) => item.id !== action.payload.id);
        return {
          ...state,
          todos: todos
        }
      }

    case CHANGE_TODO_STATUS_ACTION_TYPE:
      {
        var todos = [...state.todos].map((item, index) => {
          if (item.id !== action.payload.id) {
            return item;
          }
          return {
            ...item,
            ...action.payload
          };
        });

        return {
          ...state,
          todos: todos
        }
      }

    case TOGGLE_HIDE_DONE_TODO_ACTION_TYPE:
      {
        return {
          ...state,
          ...state.todos,
          hideDoneTodo: !state.hideDoneTodo
        }
      }

    default:
      return {todos: [], hideDoneTodo: true};
  }
}
