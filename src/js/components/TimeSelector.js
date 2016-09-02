import React from "react";
import TimeBlock from "./TimeBlock";

const ulstyle = {

}

export default class TimeSelector extends React.Component {

  constructor(props) {
    super(props);
    var length = this.props.data.length;
    var selected = [];
    for (var i = 0; i < length; i++) {
      selected.push(false);
    }

    this.state = {
      selected : selected,
      isMouseDown : false,
      start : -1,
    }
  }

  handleMouseDown (i) {
    this.setState(
      {
        isMouseDown : true,
        start : i,
      }
    );
  }

  handleMouseUp (i) {
    // set start->i true
    var start = this.state.start
    if (start != -1) {
      var newSelected = this.state.selected.map(function(val, ind){
        if (start <= ind && ind <= i) {
          return !val;
        } else {
          return val;
        }
      });
      this.setState({selected: newSelected});
    }
    this.setState({isMouseDown : false});
  }

  render() {

    var blocks = this.props.data.map(function (item, idx) {
            return <TimeBlock
              name={item.name}
              key={idx}
              isSelected={this.state.selected[idx]}
              onMouseDown={this.handleMouseDown.bind(this, idx)}
              onMouseUp={this.handleMouseUp.bind(this, idx)}
              />;
        }.bind(this));

    return (
      <ul>
        {blocks}
      </ul>
    )
  };
}
