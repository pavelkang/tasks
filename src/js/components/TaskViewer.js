import React from 'react';
import Card from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import CommentBox from './CommentBox';
import CommentList from './CommentList';
import TagViewer from './TagViewer';
import EditableDiv from './EditableDiv';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

export default class TaskViewer extends React.Component {

  constructor(props) {
    super(props);
    // true for div, false for textarea
    // should use an AJAX call in getInitialState
    this.state = {
      descState : true,
      descValue : "dfg",
      changeNotSaved: false,
    }
  }

  handleRequestDelete() {

  }

  getPropertyIfNotNull(p) {
    if (!this.props.task) {
      if (p === 'tags') {
        return []; // hacky
      }
      return '';
    }
    if (!this.props.task[p]) {
      return '';
    } else {
      return this.props.task[p];
    }
  }

  handleDescOnClick(e) {
    if (this.state.descState) { // if it is a div, change to textarea
      this.setState({
        descState: false,
      });
    }
  }

  handleDescOnChange(e) {
    this.setState({
      descValue: e.target.value,
      changeNotSaved: true,
    });
  }

  handleDescOnBlur() {
    if (!this.state.descState) {
      this.setState({
        descState: true,
      });
    }
  }

  componentWillMount() {
    if (!this.props.task) {
      return;
    }
    this.setState({
      descValue: this.props.task.desc,
    });
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    if (!this.props.task) {
      return (<div>Empty</div>)
    }
    return (
      <div>
          <h1>{this.getPropertyIfNotNull('name')}</h1>
          <FlatButton label="Save" secondary={true} disabled={!this.state.changeNotSaved}/>
          <TagViewer tags={this.getPropertyIfNotNull('tags')} />
          <EditableDiv
          id='desc'
          data={this.state.descValue}
          phase={this.state.descState}
          onClick={this.handleDescOnClick.bind(this)}
          onBlur={this.handleDescOnBlur.bind(this)}
          onChange={this.handleDescOnChange.bind(this)}
          />
          <h2>{'Assigned to: ' + this.getPropertyIfNotNull('assignee')}</h2>
          <CommentBox/>
          <CommentList task={this.props.task}/>
          </div>
    )
  }
}
