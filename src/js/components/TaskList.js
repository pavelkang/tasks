import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import * as TaskAction from '../actions/TaskAction';

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
    var tasks = this.props.items.map(function(item, i) {
      return <ListItem
      key={item.id}
      primaryText={item.name}
      secondaryText={item.desc}
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
