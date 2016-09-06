import React from 'react';
import Card from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import CommentBox from './CommentBox';
import CommentList from './CommentList';
import TagViewer from './TagViewer';
import EditableDiv from './EditableDiv';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TaskStore from '../TaskStore';
import * as TaskAction from "../actions/TaskAction.js";

const _leftpad = 15;

const style = {
}

const assignstyle = {
  color : 'orange',
  display : 'inline',
  paddingLeft: 10,
}

const tasknamestyle = {
  color: '#3b5998',
  display: 'inline',
}

const savebuttonstyle = {
  position: 'absolute',
  right: '20px',
}

const taskheaderstyle = {
  display: 'inline',
  paddingLeft: '15px',
  paddingTop: '120px',
  marginTop: '120px',
}

const dividerstyle = {
  marginTop: 5,
}

const tagviewerstyle = {
  paddingLeft: _leftpad,
  marginTop: 10,
  paddingTop: 10,
}

const descstyle = {
  paddingLeft: _leftpad,
  marginTop: 10,
  paddingTop: 10,
}

const commentboxstyle = {
  paddingLeft: _leftpad,
  marginTop: 10,
  paddingTop: 10,
}

export default class TaskViewer extends React.Component {

  constructor(props) {
    super(props);
    // true for div, false for textarea
    // should use an AJAX call in getInitialState
    var task = TaskStore.getCurrentTask();
    this._initState(task);
  }

  _initState(task) {
    if (!task) {
      return ;
    }
    this.state = {
      descState : true,
      descValue : task.desc,
      changeNotSaved : false,
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

  handleDelete() {
    TaskAction.deleteTask(this.props.task.id);
  }

  componentWillMount() {
    TaskStore.on("change", () => {
      this.setState({
        descValue: this.props.task.desc,
      })
    });
    if (!this.props.task) {
      return;
    }
    this.setState({
      descValue: this.props.task.desc,
    });
  }

  handleDescOnHover(e) {
    // TODO
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this._initState(nextProps.task);
  }

  handleSaveClicked() {
    TaskAction.modifyTask(
      this.props.task.id, {
        'desc' : this.state.descValue,
      });
  }

  render() {
    if (!this.props.task) {
      return (<div>Create a new task on the left!</div>)
    }
    return (
      <div style={style}>
        <div style={taskheaderstyle}>

          <h1 style={tasknamestyle}>{this.getPropertyIfNotNull('name')}</h1>
          <p style={assignstyle}>{this.getPropertyIfNotNull('assignee')}</p>
          <FlatButton
          label="Save"
          secondary={true}
          disabled={!this.state.changeNotSaved}
          onClick={this.handleSaveClicked.bind(this)}
          style={savebuttonstyle}/>
        </div>
          <Divider style={dividerstyle}/>
          <TagViewer
          tags={this.getPropertyIfNotNull('tags')}
          style={tagviewerstyle}/>
          <EditableDiv
          id='desc'
          data={this.state.descValue}
          phase={this.state.descState}
          onClick={this.handleDescOnClick.bind(this)}
          onBlur={this.handleDescOnBlur.bind(this)}
          onChange={this.handleDescOnChange.bind(this)}
          onHover={this.handleDescOnHover.bind(this)}
          style={descstyle}
          />
          <br/>
          <RaisedButton label="Delete"
          secondary={true}
          onClick={this.handleDelete.bind(this)}/>
          </div>
    )
  }
}
