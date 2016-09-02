import React from "react";

export default class TimeBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovered : false,
    };
  }

  handleMouseEnter () {
    this.setState(
      {isHovered : !this.state.isHovered}
    )
  }

  handleMouseLeave () {
    this.setState(
      {isHovered : !this.state.isHovered}
    )
  }

  render() {

    var basestyle = {
      backgroundColor: '#ddd',
      height : 50,
      width : 200,
      listStyleType: 'none',
    };

    if (this.props.isSelected) {
      basestyle['backgroundColor'] = '#98fb98';
    }


        if (this.state.isHovered) {
          basestyle['backgroundColor'] = '#f5fffa';
        }    

    return (
      <li style={basestyle}
      onMouseEnter={this.handleMouseEnter.bind(this)}
      onMouseLeave={this.handleMouseLeave.bind(this)}
      onMouseDown={this.props.onMouseDown}
      onMouseUp={this.props.onMouseUp}
      >
      {this.props.name}
      </li>
    )
  };
}
