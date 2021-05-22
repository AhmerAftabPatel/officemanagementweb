import { combineReducers } from "redux";
import tasks from "./task_reducer";
import users from "./users_reducer";
import attendance from "./attendance_reducer";
import leaves from "./leaves_reducer";

export default combineReducers({
  users,
  tasks,
  attendance,
  leaves,
});
