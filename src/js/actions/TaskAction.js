import dispatcher from "../Dispatcher.js";

export function createTask(name) {
  dispatcher.dispatch({
    type: "CREATE_TASK",
    name: name,
  })
}

export function setTask(task) {
  dispatcher.dispatch({
    type: "SET_TASK",
    task: task,
  })
}
