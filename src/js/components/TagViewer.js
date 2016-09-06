import React from 'react';
import Chip from 'material-ui/Chip';

const chipstyle = {
  display: 'inline-block',
  marginLeft: 10,
  marginTop: 10,
}

const style = {
  display: 'block',
}

export default class TaskViewer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var tags = this.props.tags.map(function(tag, idx) {
      return <Chip key={idx} style={chipstyle}>{tag}</Chip>
    });
    return(
      <div style={style}>
      {tags}
      </div>
    )
  }
}
