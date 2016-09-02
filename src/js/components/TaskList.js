import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

export default class TaskList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var createItem = function(item) {
      return <ListItem
      key={item.id}
      primaryText={item.name}
      secondaryText='placeholder'
      leftCheckbox={<Checkbox />}></ListItem>
    };

    return (
      <List>
        <Subheader>Your tasks</Subheader>
        {this.props.items.map(createItem)}
      </List>
    )
  }
}
