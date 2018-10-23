import axios from 'axios';
var api = axios.create({baseURL: 'http://localhost:8080/todo', timeout: 1000});

export const SET_TODO_ACTION_TYPE = 'SET_TODO';
export const ADD_TODO_ACTION_TYPE = 'ADD_TODO';
export const DELETE_TODO_ACTION_TYPE = 'DELETE_TODO';
export const CHANGE_TODO_STATUS_ACTION_TYPE = 'CHANGE_TODO_STATUS';
export const TOGGLE_HIDE_DONE_TODO_ACTION_TYPE = 'TOGGLE_HIDE_DONE_TODO';


export function fetchTodo(todos) {
  return(dispatch) => {
    api.get().then(function(response) {
      dispatch(createTodoAction(SET_TODO_ACTION_TYPE, response.data))
    }.bind(this)).catch(function(error) {
      console.log(error);
    });
  }
}

export function addTodo(content) {
  return(dispatch) => {
    api.post("/", {content: content}).then(function(response) {
      dispatch(createTodoAction(ADD_TODO_ACTION_TYPE, response.data))
    }.bind(this)).catch(function(error) {
      console.log(error);
    });
  }
}

export function deleteTodo(item) {
  return(dispatch) => {
    api.delete(item.id).then(function(response) {
      dispatch(createTodoAction(DELETE_TODO_ACTION_TYPE, item));
    }.bind(this)).catch(function(error) {
      console.log(error);
    });
  }
}

export function changeTodoStatus(item) {
  return(dispatch) => {
    api.put(item.id, item).then(function(response) {
      dispatch(createTodoAction(CHANGE_TODO_STATUS_ACTION_TYPE, item));
    }.bind(this)).catch(function(error) {
      console.log(error);
    });
  }
}

export function toggleHideDone(item) {
  return createTodoAction(CHANGE_TODO_STATUS_ACTION_TYPE, item);
}

export function toogleHideDoneTodo() {
  return createTodoAction(TOGGLE_HIDE_DONE_TODO_ACTION_TYPE);
}

function createTodoAction(type, payload) {
  return {type: type, payload: payload}
}
