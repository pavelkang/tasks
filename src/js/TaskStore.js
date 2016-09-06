import { EventEmitter } from "events";
import dispatcher from "./Dispatcher.js";

class TaskStore extends EventEmitter {
  constructor() {
    super();
    this.tasks = [];
    firebase.database().ref('/tasks/').once('value').then(function(snapshot) {
      if (!snapshot.val()) {
        return ;
      }
      this.tasks = Object.keys(snapshot.val()).map(function (key) {return snapshot.val()[key]});
      this.emit("change");
    }.bind(this));
    this.currentTask = null;
    this.taskRef = firebase.database().ref('/tasks/');
    this.taskRef.on('value', function(snapshot) {
        this.tasks = Object.keys(snapshot.val()).map(function (key) {return snapshot.val()[key]});
    }.bind(this))
  }
  _addTask(task) {
    this.tasks.push(task);
  }
  getAll() {
    return this.tasks;
  }
  _createTask(_name) {
    var newTaskKey = firebase.database().ref().child('tasks').push().key;
    var task = {
      id: newTaskKey,
      name: _name,
      tags: ['tag', 'not', 'implemented'],
      assignee: 'Kai Kang',
      desc: 'Dummy description',
      priority: 1,
      comments: ['fake comments'],
    }
    var updates = {};
    updates['/tasks/' + newTaskKey] = task;
    var p = firebase.database().ref().update(updates);
    p.then(function() {
      this.emit("change");
    }.bind(this));
  }
  _modifyTask(id, modify) {
    var p = firebase.database().ref('tasks/' + id).update({
      desc: modify.desc,
    });
    p.then(function() {
      this.emit("change");
    }.bind(this))
  }
  _deleteTask(id) {
    var p = firebase.database().ref('tasks/' + id).remove();
    p.then(function() {
      this.emit("change");
    }.bind(this));
  }
  handleActions(action) {
    switch(action.type) {
      case "CREATE_TASK":
        this._createTask(action.name);
        break;
      case "SET_TASK":
        this._selectTask(action.task);
        break;
      case "MODIFY_TASK":
        this._modifyTask(action.id, action.modify);
        break;
      case "DELETE_TASK":
        this._deleteTask(action.id);
        break;
    }
  }
  _selectTask(task) {
    this.currentTask = task;
    this.emit("change");
  }
  getCurrentTask() {
    return this.currentTask;
  }
}

const taskStore = new TaskStore;
dispatcher.register(taskStore.handleActions.bind(taskStore));
window.dispatcher = dispatcher;
export default taskStore;
