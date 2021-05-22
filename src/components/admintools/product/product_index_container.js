import { connect } from "react-redux";

import { fetchTasks, deleteTask, updateTask } from "../../../actions/task_actions";
import { fetchAllUsers } from "../../../actions/user_actions";
import ViewProduct from "./product_index";
// import { useParams } from "react-router-dom";
// export const GetcateiD = () => {
//   const { categoryId } = useParams();
//   if (categoryId) {
//     return categoryId;
//   }
// };
const mapStateToProps = (state,props) => {
  let tasks = Object.values(state.entities.tasks).filter(
    task => task.cateId === props.match.params.categoryId
  );
  // if (state.ui.groupModal) {
  //   tasks = tasks.filter(task => task.groupId === state.ui.groupModal);
  // }
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
  fetchTasks: (token) => dispatch(fetchTasks(token)),
  deleteTask: (id,token) => dispatch(deleteTask(id,token)),
  updateTask: (task,token) => dispatch(updateTask(task,token))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
