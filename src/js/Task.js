export default class Task {

  constructor(name, id, desc, priority, tags, assignee) {
    super();
    this._name = name;
    this._id = id;
    this._desc = desc;
    this._priority = priority;
    this._tags = tags;
    this._assignee = assignee;
  }
}
