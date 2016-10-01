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
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import {Editor, EditorState, ContentState, convertToRaw, convertFromRaw, createWithContent} from 'draft-js';
import ContentSort from 'material-ui/svg-icons/content/sort';

const _leftpad = 15;

const style = {
  paddingTop: 10,
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
  float: 'right',
  marginTop: 3,
  marginRight: 10,
}

const finishbuttonstyle = {
  backgroundColor: 'red',
}

const taskheaderstyle = {
  display: 'inline',
  paddingLeft: '15px',
  paddingTop: '120px',
  marginTop: '120px',
}

const dividerstyle = {
  marginTop: 0,
  marginBottom: 10,
}

const tagviewerstyle = {
  paddingLeft: _leftpad,
  marginTop: 10,
  paddingTop: 10,
}

const commentboxstyle = {
  paddingLeft: _leftpad,
  marginTop: 10,
  paddingTop: 10,
}

const datepickerstyle = {
  color: '#3b5998',
  paddingLeft: 20,
  display: 'inline-block',
}

const primary = {
  color: '#3b5998',
}

const editorstyle = {
  border: '1px solid #ccc',
  cursor: 'text',
  minHeight: 180,
  padding: 10,
  backgroundColor: '#fff',
  marginTop: 10,
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
      this.state = {editorState: EditorState.createEmpty()};
      return ;
    }
    if (task.date) {
      var date = new Date(task.date);
    } else {
      var date = null;
    }
    if (task.content) {
      var es = EditorState.createWithContent(convertFromRaw(JSON.parse(task.content)));
    } else {
      var es = EditorState.createEmpty();
    }
    this.state = {
      changeNotSaved : false,
      dateValue: date,
      editorState: es,
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

  onEditorChange(newState) {
    this.setState({editorState: newState});
    var contentState = newState.getCurrentContent();
    if (contentState !== this.state.editorState.getCurrentContent()) {
      this.setState({
        changeNotSaved: true,
      })
    };
  }

  handleDateOnChange(event, date) {
    this.setState({
  dateValue: date,
  changeNotSaved: true,
});
  }

  handleDelete() {
    TaskAction.deleteTask(this.props.task.id);
  }

  componentWillMount() {
    if (!this.props.task) {
      return;
    }
    this.setState({
      descValue: this.props.task.desc,
      date: this.props.task.date
    });
  }

  componentWillReceiveProps(nextProps) {
    this._initState(nextProps.task);
  }

  handleSaveClicked() {
    TaskAction.modifyTask(
      this.props.task.id, {
        'desc' : 'nop',
        'date' : this.state.dateValue,
        'content': JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
      });
  }

  onEditorFocus() {
    this.refs.editor.focus();
  }

  render() {
    if (!this.props.task) {
      return (<div>Create a new task on the left!</div>)
    }
    return (
      <div style={style}>
        <div style={taskheaderstyle}>

          <h1 style={tasknamestyle}>{this.getPropertyIfNotNull('name')}</h1>
            <DatePicker
          hintText="Due date"
          container="inline"
          autoOk={true}
          style={datepickerstyle}
          value={this.state.dateValue}
          onChange={this.handleDateOnChange.bind(this)}
        />
        <RaisedButton
          label="Save"
          secondary={true}
          disabled={!this.state.changeNotSaved}
          onClick={this.handleSaveClicked.bind(this)}
          style={savebuttonstyle}/>
        </div>

        <div style={editorstyle} onClick={this.onEditorFocus.bind(this)}>
            <ContentSort style={primary}/> <span style={primary}>Description</span>
            <Editor editorState={this.state.editorState} onChange={this.onEditorChange.bind(this)} ref='editor'/>
        </div>

      <br/>
      <center>
        <FloatingActionButton style={finishbuttonstyle}
          onClick={this.handleDelete.bind(this)}>
        <ActionDone />
      </FloatingActionButton>
</center>
          </div>
    )
  }
}
