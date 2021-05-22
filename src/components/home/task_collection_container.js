import { connect } from "react-redux";

import { fetchTasks, deleteTask, updateTask } from "../../actions/task_actions";
import { fetchAllUsers } from "../../actions/user_actions";
import TaskIndex from "./task_index";

const mapStateToProps = state => {
  let tasks = Object.values(state.entities.tasks).filter(
    task => task.userId === state.session.id
  );
  if (state.ui.groupModal) {
    tasks = tasks.filter(task => task.groupId === state.ui.groupModal);
  }
  //Sort the tasks by the deadline. Oldest ones first
  tasks.sort((a, b) => {
    if (a.deadline <= b.deadline) return -1;
    else return 1;
  });

  return {
    tasks: tasks,
    users: Object.values(state.entities.users)
      .filter(user => user.username)
      .sort((a, b) => {
        if (a.username < b.username) return -1;
        else return 1;
      })
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchAllUsers()),
  fetchTasks: token => dispatch(fetchTasks(token)),
  deleteTask: (id,token) => dispatch(deleteTask(id,token)),
  updateTask: (task,token) => dispatch(updateTask(task,token))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex);
