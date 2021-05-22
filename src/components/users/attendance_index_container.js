import { connect } from "react-redux";

import { fetchAttendance } from "../../actions/attend_actions";
import { fetchAllUsers } from "../../actions/user_actions";
import AttendanceIndex from "./attendance_index";
const mapStateToProps = state => {
  let userId = localStorage.getItem("userIDforUse");
  let attendances = Object.values(state.entities.attendance).filter(
    attendance => attendance.userId === userId
  );

  return {
    attendances: attendances,
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
  fetchAttendance: (token) => dispatch(fetchAttendance(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceIndex);
