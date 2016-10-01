import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import * as TaskAction from '../actions/TaskAction';
import FlatButton from 'material-ui/FlatButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

const style = {
  textAlign: 'none',
}

export default class TaskList extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick(i, props) {
    TaskAction.setTask(props.items[i]);
  }

  render() {
    var sortedItems = this.props.items;
    sortedItems.sort(function(taskA, taskB) {
      if (!taskB.date) {
        return -1;
      } else {
        if (taskA.date) {
          var a = new Date(taskA.date);
          var b = new Date(taskB.date);
          return a - b;
        } else {
          return 1;
        }
      }
    })
    var tasks = sortedItems.map(function(item, i) {
      return <ListItem
      key={item.id}
      primaryText={item.name}
      secondaryText={item.date ? item.date.slice(5,10) : "--"}
      onClick={this.handleClick.bind(this, i, this.props)}
      ></ListItem>
    }.bind(this));

    return (
      <List style={style}>
        <Subheader>Your tasks</Subheader>
        {tasks}
      </List>
    )
  }
}
