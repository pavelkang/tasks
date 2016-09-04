import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  getStuff() {
    return (
      <Checkbox
  checkedIcon={<ActionFavorite />}
  uncheckedIcon={<ActionFavoriteBorder />}
  label="Custom icon"
/>
    )
  }

  render() {
    var comments = [];
    if (this.props.task) {
      comments = this.props.task.comments.map(function(comment, idx) {
          return <ListItem
          key={idx}
          primaryText={comment.author}
          secondaryText={comment.content}
          children={this.getStuff()}></ListItem>
      }.bind(this))
    }


    return (
      <List>
        {comments}
      </List>
    )
  }
}
