import React from 'react';

const MARGIN_TOP = 10;
const MARGIN_LEFT= 10;

const style = {
  resize: 'none',
  width: '40vw',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  marginTop: MARGIN_TOP,
  marginLeft: MARGIN_LEFT,
  minHeight: 100,
}

const divStyle = {
  marginTop: MARGIN_TOP,
  marginLeft: MARGIN_LEFT,
}

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
        style={style}
        autoFocus
        />)
    } else {
      return (
        <div
        onClick={this.props.onClick}
        style={divStyle}
        >
          {this.props.data}

        </div>
    )
    }
  }
}
