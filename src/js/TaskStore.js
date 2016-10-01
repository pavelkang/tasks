import { EventEmitter } from "events";
import dispatcher from "./Dispatcher.js";

var obj2list = function(o) {
  if (!o) {
    return [];
  }
  return Object.keys(o).map(function (key) {return o[key]});
}

var findInList = function(currentTask, newTaskList) {
  for (var i = 0; i < newTaskList.length; i++) {
    var newTask = newTaskList[i];
    if (currentTask.id === newTask.id) {
      return newTask;
    }
  }
  return newTaskList[0];
}

var populateTask = function(key, name) {
  return {
    id: key,
    name: name,
    tags: ['tags', 'not', 'implemented'],
    assignee: 'Kai Kang',
    desc: 'Describe your task...',
    priority: 1,
    comments: [],
  }
}

class TaskStore extends EventEmitter {
  constructor() {
    super();
    this.taskRef = firebase.database().ref('/tasks/');
    this.tasks = [];
    this.currentTask = null;
    // initialize this.tasks
    this.taskRef.once('value').then(function(snapshot) {
      this.tasks = obj2list(snapshot.val());
      this.emit("change");
    }.bind(this));
    // add listeners
    // if anything changes, reload the entire task list
    this.taskRef.on('value', function(snapshot) {
        this.tasks = obj2list(snapshot.val());
    }.bind(this))
  }
  /*
   * This part is for communication with components
   */
  getAll() {
    return this.tasks;
  }
  getCurrentTask() {
    return this.currentTask;
  }
  setTask(task) {
    this.currentTask = task;
    this.emit("change");
  }
  /*
   * This part is for communication with firebase
   */
  _createTask(_name) {
    var newTaskKey = this.taskRef.push().key;
    var task = populateTask(newTaskKey, _name);
    var updates = {};
    updates['/tasks/' + newTaskKey] = task;
    var p = firebase.database().ref().update(updates);
    p.then(function() {
      this.taskRef.once('value', function(snapshot) {
        this.tasks = obj2list(snapshot.val());
        this.emit("change");
      }.bind(this));
    }.bind(this));
  }
  _modifyTask(id, modify) {
    var p = firebase.database().ref('tasks/' + id).update({
      desc: modify.desc,
      date: modify.date,
      content: modify.content,
    });
    p.then(function() {
      this.taskRef.once('value', function(snapshot) {
        this.tasks = obj2list(snapshot.val());
        this.currentTask = findInList(this.currentTask, this.tasks);
        this.emit("change");
      }.bind(this));
    }.bind(this))
  }
  _deleteTask(id) {
    var p = firebase.database().ref('tasks/' + id).remove();
    p.then(function() {
      this.taskRef.once('value', function(snapshot) {
        this.tasks = obj2list(snapshot.val());
        this.currentTask = findInList(this.currentTask, this.tasks);
        this.emit("change");
      }.bind(this));
    }.bind(this));
  }
  handleActions(action) {
    switch(action.type) {
      case "CREATE_TASK":
        this._createTask(action.name);
        break;
      case "SET_TASK":
        this.setTask(action.task);
        break;
      case "MODIFY_TASK":
        this._modifyTask(action.id, action.modify);
        break;
      case "DELETE_TASK":
        this._deleteTask(action.id);
        break;
    }
  }
}

const taskStore = new TaskStore;
dispatcher.register(taskStore.handleActions.bind(taskStore));
export default taskStore;
