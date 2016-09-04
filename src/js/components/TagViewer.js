import React from 'react';
import Chip from 'material-ui/Chip';

const chipstyle = {
  display: 'inline-block',
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
      <div>
      {tags}
      </div>
    )
  }
}
