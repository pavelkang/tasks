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

export function modifyTask(id, modify) {
  dispatcher.dispatch({
    type: "MODIFY_TASK",
    modify: modify,
    id: id,
  })
}

export function deleteTask(id) {
  dispatcher.dispatch({
    type: "DELETE_TASK",
    id: id,
  })
}
