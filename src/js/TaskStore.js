import { EventEmitter } from "events";
import dispatcher from "./Dispatcher.js";

class TaskStore extends EventEmitter {
  constructor() {
    super();
    this.tasks = [
      {
        id: 1,
        name: "Work on this app",
        complete: false
      }
    ]
  }
  getAll() {
    return this.tasks;
  }
  createTask(_name) {
    const _id = Date.now();
    this.tasks.push({
      id: _id,
      name: _name,
      complete: false,
    });
    this.emit("change");
  }
  handleActions(action) {
    switch(action.type) {
      case "CREATE_TASK": {
        this.createTask(action.name);
      }
    }
  }
}

const taskStore = new TaskStore;
dispatcher.register(taskStore.handleActions.bind(taskStore));
window.dispatcher = dispatcher;
export default taskStore;
