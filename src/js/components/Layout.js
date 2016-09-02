import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TaskList from './TaskList.js';
import TaskStore from '../TaskStore.js';
import * as TaskAction from "../actions/TaskAction.js";

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
        tasks: TaskStore.getAll()
      })
    })
  }

  onChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    TaskAction.createTask(this.state.text);    
    this.setState({
      items: TaskStore.getAll(),
      text: '',
    })
  }

  render() {
    return (
      <div>
        <AppBar title="Tasks"/>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <TextField onChange={this.onChange.bind(this)}
            hintText="Your tasks here..."
            value={this.state.text}/>
          <RaisedButton
            label="Create"
            primary={true}
            onClick={this.handleSubmit.bind(this)}
            type="submit"></RaisedButton>
          </form>
        <br/>
        <TaskList items={this.state.items}/>
      </div>
  );
  }
}
