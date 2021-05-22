import { connect } from "react-redux";
// import StateManager from "react-select";
// import { fetchAttendance } from "../../actions/attend_actions";
import { fetchTasks } from "../../../actions/task_actions";
import { fetchSingleUser } from "../../../actions/user_actions";
import profile from "./profile";

const mapStateToProps = state => {
  let user = Object.values(state.entities.users).filter(
    user => user.id === state.session.id
  );
  return {
    userId: state.session.id,
    user: user,
    // users : Object.values(state.entities.users),
    tasks: Object.values(state.entities.tasks)
    // attendances : Object.values(state.entities.attendance)
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSingleUser: id => dispatch(fetchSingleUser(id)),
  fetchTasks: token => dispatch(fetchTasks(token))
  // fetchAttendance: token => dispatch(fetchAttendance(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(profile);
