import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class CommentBox extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TextField
        hintText='Comment this task ...'
        />
        <FlatButton label="Comment" primary={true}/>
      </div>
    )
  }
}
