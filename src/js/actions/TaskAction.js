import dispatcher from "../Dispatcher.js";

export function createTask(name) {
  dispatcher.dispatch({
    type: "CREATE_TASK",
    name
  })
}
