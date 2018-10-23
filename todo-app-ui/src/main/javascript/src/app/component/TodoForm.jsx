import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {addTodo} from '../action/TodoActions';

import '../css/todo-form.css';

var api = axios.create({baseURL: 'http://localhost:8000/todo', timeout: 1000});
class TodoForm extends React.Component {

  constructor(props) {
    super(props);
    this.newItemInputText = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.newItemInputText.current.value);
    this.newItemInputText.current.value = '';
  }

  render() {
    return (<form id="add-todo" onSubmit={this.handleSubmit}>
      <input type="text" required="required" ref={this.newItemInputText}/>
      <input type="submit" value="Add Todo"/>
    </form>);
  }

};

const bindActionToPeroperty = (dispatch) => ({
  handleSubmit: (content) => dispatch(addTodo(content))
  // {
  //   api.post("/", {content: content}).then(function(response) {
  //     dispatch(addTodo(response.data))
  //   }.bind(this)).catch(function(error) {
  //     console.log(error);
  //   });
  // }
});

export default connect((state) => ({}), bindActionToPeroperty)(TodoForm);
