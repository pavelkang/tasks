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
import TaskViewer from './TaskViewer';

const paperstyle = {
  height: '100vh',
  float: 'left',
  overflowY: 'scroll',
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
  height: '100vh',
  float: 'right',
  width: '100%',
  overflowX: 'hidden',
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
    };
  }

  componentWillMount() {
    TaskStore.on("change", () => {
      this.setState({
        tasks: TaskStore.getAll(),
        errorText: '',
      })
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
    return (
      <div style={containerstyle}>
        <AppBar title="Tasks" zDepth={0}
          iconElementRight={this.getIcon()}
          style={barstyle}
          />
        <Card style={paperstyle}>
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
        </Card>
        <TaskViewer task={TaskStore.getCurrentTask()} style={viewerstyle}/>
      </div>
  );
  }
}
