import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {FaToggleOn, FaToggleOff} from 'react-icons/fa';

import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import {fetchTodo, toogleHideDoneTodo} from '../action/TodoActions';

import '../css/todo-component.css';

var api = axios.create({baseURL: 'http://localhost:8000/todo', timeout: 1000});
class TodoComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  //sample of lifecycle functions
  componentWillMount() {
    // console.log('component will mount');
  }

  componentDidMount() {
    // good place to do some ajax request
    this.props.fetchTodo();
  }

  componentWillUpdate() {
    // console.log('component will update');
  }
  //end sample of lifecycle functions

  render() {

    var hideDoneTodo = this.props.hideDoneTodo;
    var todos = this.props.todos.filter((item, index) => !hideDoneTodo || item.status !== 'DONE').map(function(item, index) {
      return <TodoItem item={item} key={index}/>
    }.bind(this));

    return (<div id="todo-list">
      <p>{this.props.label}</p>
      <br/>
      <span className='toggle-hide-done-button' onClick={this.props.toogleHideDoneTodo}>{
          this.props.hideDoneTodo
            ? <FaToggleOn/>
            : <FaToggleOff/>
        }</span>
        <span className='toggle-info'>{ this.props.hideDoneTodo ? 'Done is hidden' : 'Done is shown'}</span>
      <ul>{todos}</ul>
      <TodoForm onAdd={this.onAdd}/>
    </div>)
  }

};

const bindStateToProperty = (state) => ({todos: state.todos, hideDoneTodo: state.hideDoneTodo});
const bindActionToPeroperty = (dispatch) => ({
  fetchTodo: () => dispatch(fetchTodo()),
  toogleHideDoneTodo: () => dispatch(toogleHideDoneTodo())
});

export default connect(bindStateToProperty, bindActionToPeroperty)(TodoComponent);
