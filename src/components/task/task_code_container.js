import { connect } from "react-redux";
import { createTask } from "../../actions/task_actions";
import { fetchAllUsers } from "../../actions/user_actions";
import TaskCreateCode from "./task_code";
import {  fetchTasks } from "../../actions/task_actions";
const mapStateToProps = state => ({
  users: Object.values(state.entities.users)
    .filter(user => user.username)
    .sort((a, b) => {
      if (a.username < b.username) return -1;
      else return 1;
    })
});

const mapDispatchToProps = dispatch => ({
  createTask: (task) => dispatch(createTask(task)),
  fetchUsers: () => dispatch(fetchAllUsers()),
  fetchTasks: () => dispatch(fetchTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreateCode);
