import { EventEmitter } from "events";
import dispatcher from "./Dispatcher.js";

class TaskStore extends EventEmitter {
  constructor() {
    super();
    this.tasks = [
    ]
    this.currentTask = null;
  }
  getAll() {
    return this.tasks;
  }
  _createTask(_name) {
    const _id = Date.now();
    this.tasks.push({
      id: _id,
      name: _name,
      tags: ['tag', 'not', 'implemented'],
      assignee: 'Kai Kang',
      desc: 'Dummy description',
      priority: 1,
      comments: [],
    });
    this.emit("change");
  }
  handleActions(action) {
    switch(action.type) {
      case "CREATE_TASK":
        this._createTask(action.name);
        break;
      case "SET_TASK":
        this._selectTask(action.task);
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
