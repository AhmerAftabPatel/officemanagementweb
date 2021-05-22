import { connect } from "react-redux";
// import StateManager from "react-select";
// import { fetchAttendance } from "../../actions/attend_actions";
import { fetchTasks } from "../../../actions/task_actions";
import ManageTasks from "./manage_tasks";

const mapStateToProps = state => ({
  // userId: state.session.id,
  // users : Object.values(state.entities.users),
  tasks: Object.values(state.entities.tasks)
  // attendances : Object.values(state.entities.attendance)
});

const mapDispatchToProps = dispatch => ({
  // fetchSingleUser: id => dispatch(fetchSingleUser(id)),
  fetchTasks: token => dispatch(fetchTasks(token))
  // fetchAttendance: token => dispatch(fetchAttendance(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTasks);
