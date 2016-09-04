import React from 'react';

export default class EditableDiv extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      state : true, // false for div, true for textarea
    }
  }

  componentDidMount() {
    this.setState({
      content: this.props.data,
    });
  }

  render() {
    if (!this.props.phase) {
      return (
        <textarea
        value={this.props.data}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        autoFocus
        />)
    } else {
      return (
        <div
        onClick={this.props.onClick}>
          {this.props.data}
        </div>
    )
    }
  }
}
