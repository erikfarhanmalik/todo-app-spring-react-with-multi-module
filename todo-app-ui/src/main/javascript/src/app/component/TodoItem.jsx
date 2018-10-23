import React from 'react';
import ReactTooltip from 'react-tooltip'
import axios from 'axios';
import {connect} from 'react-redux';
import {FaTimesCircle, FaCheckCircle, FaUndo} from 'react-icons/fa';

import {deleteTodo} from '../action/TodoActions';
import {changeTodoStatus} from '../action/TodoActions';

import '../css/todo-item.css';

class TodoItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
  }

  handleDelete(event) {
    this.props.handleDelete(this.props.item);
  }

  handleUpdateStatus(event) {
    this.props.item.status = this.props.item.status === 'DONE'
      ? 'OPEN'
      : 'DONE';
    this.props.handleUpdateStatus(this.props.item);
  }

  render() {
    return (<li>
      <div className="todo-item">
        <span className={'item-name ' + (
            this.props.item.status === 'DONE'
            ? 'done'
            : 'open')}>{this.props.item.content}</span>
        <span className="item-remove">
          <span onClick={this.handleUpdateStatus} data-tip={this.props.item.status === 'DONE'
              ? 'Reopen'
              : 'Set to done'}>
            {
              this.props.item.status === 'DONE'
                ? <FaUndo/>
                : <FaCheckCircle/>
            }
          </span>
        </span>
        <span className="item-remove">
          <span onClick={this.handleDelete} data-tip="Delete todo">
            <FaTimesCircle/>
          </span>
        </span>
        <ReactTooltip place="left" effect="solid"/>
      </div>
    </li>);
  }

}

const bindActionToPeroperty = (dispatch) => ({
  handleDelete: (item) => dispatch(deleteTodo(item)),
  handleUpdateStatus: (item) => dispatch(changeTodoStatus(item))
});

export default connect((state) => ({}), bindActionToPeroperty)(TodoItem);
