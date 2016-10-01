import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TaskList from './TaskList.js';
import TaskStore from '../TaskStore.js';
import * as TaskAction from "../actions/TaskAction.js";
import Card from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import TaskViewer from './TaskViewer';
import Snackbar from 'material-ui/Snackbar';

const DEFAULT_CARD_WIDTH = 300;

const paperstyle = {
  height: '100vh',
  float: 'right',
  width: DEFAULT_CARD_WIDTH,
  overflowY: 'auto',
  margin: 0,
  padding: 0,
  display: 'inline-block',
  overflowX: 'auto',
}

const containerstyle = {
  height: '92vh',
}

const barstyle = {
  height: '8vh',
}

const inputstyle = {
  marginLeft: 20,
  marginTop: 20,
  marginRight: 5,
  minWidth: 80,
  maxWidth: 150,
}

const viewerstyle = {
  paddingLeft: DEFAULT_CARD_WIDTH,
  float: 'right',
  /*
  marginLeft: 50,
  height: '100vh',
  float: 'right',*/
  display: 'block',
  }

const createbuttonstyle = {
  marginLeft: 5,
  marginRight: 5,
}

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: TaskStore.getAll(),
      text: '',
      openAddTask: false,
    };
  }

  handleAddTaskDelete() {
    this.setState({
      openAddTask: false,
    })
  }

  componentWillMount() {
    TaskStore.on("change", () => {
      this.setState({
        tasks: TaskStore.getAll(),
        errorText: '',
      });
  })
}

  onChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text === '') {
      this.setState({
        errorText: 'Task name required!',
      });
      return ;
    }
    TaskAction.createTask(this.state.text);
    this.state.errorText = '';
    this.setState({
      items: TaskStore.getAll(),
      text: '',
      openAddTask: true,
    })
  }

  getIcon() {
    var avatarstyle = {
      marginTop: 4,
      marginBottom: 4,
    }
    return <Avatar src="jack.png" style={avatarstyle}/>
  }

  render() {

    var x = (
      <div>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TextField onChange={this.onChange.bind(this)}
          hintText="Your tasks here..."
          value={this.state.text}
          errorText={this.state.errorText}
          style={inputstyle}
          />
        <RaisedButton
          label="Create"
          primary={true}
          onClick={this.handleSubmit.bind(this)}
          type="submit"
          style={createbuttonstyle}
          ></RaisedButton>
        </form>
      <br/>
      <TaskList items={TaskStore.getAll()}/>
      </div>
    )

    return (
      <div style={containerstyle}>
        <AppBar title="Tasks" zDepth={0}
          iconElementRight={this.getIcon()}
          style={barstyle}
          />

          <Paper children={x} style={paperstyle}/>
          <TaskViewer task={TaskStore.getCurrentTask()} style={viewerstyle}/>
            <Snackbar
                      open={this.state.openAddTask}
                      message="Created new task"
                      autoHideDuration={4000}
                      onRequestClose={this.handleAddTaskDelete}
                    />
      </div>
  );
  }
}
