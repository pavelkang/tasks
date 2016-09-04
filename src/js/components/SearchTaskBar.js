import React from 'react';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';

const style = {
  position: 'absolute',
  bottom: 2,
  width: 'inherit',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
}

export default class SearchTaskBar extends React.Component {
  render() {
    return (
    <Card style={style}>
      <TextField hintText="Search for ..."/>
    </Card>
    )
  }
}
