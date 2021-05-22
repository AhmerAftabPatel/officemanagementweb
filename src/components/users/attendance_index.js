import React from "react";
import { Modal } from "react-materialize";
import Moment from "moment";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import AttendanceShow from "./attendance_show";

class AttendanceIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snackOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    this.props.fetchAttendance(token);
    this.props.fetchUsers();
    // this.props.read();
  }

  handleClick() {
    this.setState({ snackOpen: true });
  }

  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackOpen: false });
  }

  renderComplete(isPresent) {
    if (isPresent) {
      return "present";
    } else {
      return "absent";
    }
  }

  render() {
    if (!this.props.attendances) return null;
    const map = {};
    const newArray = [];
    console.log(newArray)
    let { attendances } = this.props;
    attendances.forEach(attend => {
      if (!map[JSON.stringify(attend.userId)]) {
        map[JSON.stringify(attend.userId)] = true;
        newArray.push(attend);
      }
    });
    return (
      <div className="task-parent-3">
        <List
          id="task-index-list"
          className="task-index-container collection with-header"
        >
          <ListItem id="task-header">
            <div style={{ marginLeft: "0px" }}>
              <h5>User attendance</h5>{" "}
            </div>

            {/* <Modal id="create-task-modal" trigger={createTaskButton}>
              <div className="modal-content"><TaskCreateContainer snack={this.handleClick} />
              </div>
            </Modal> */}
          </ListItem>
          {newArray.map(attendance => (
            <Modal
              style={{ width: "50%" }}
              key={attendance._id}
              trigger={
                <ListItem
                  className={`collection-item hvr-fade`}
                  key={attendance._id}
                >
                  <>
                    <ListItemAvatar className="attendance-title">
                      {" "}
                      {attendance.isPresent ? (
                        <i class="child icon"></i>
                      ) : (
                        <i class="bed icon"></i>
                      )}
                    </ListItemAvatar>
                  </>

                  <ListItemText
                    secondary={`On: ${Moment(attendance.inTime).format(
                      "MMMM Do YYYY"
                    )}`}
                    primary={`In time : ${Moment(attendance.inTime).format(
                      "h:mm a"
                    )} - Out time : ${
                      attendance.outTime !== "not logged"
                        ? Moment(attendance.outTime).format("h:mm a")
                        : "not logged"
                    }`}
                  />
                  {/* <ListItemSecondaryAction> */}
                  {/* <div className="secondary-action-container">
                      <TaskEdit
                        snack={this.handleClick}
                        updateTask={this.props.updateTask}
                        users={this.props.users}
                        task={task}
                      />
                      <IconButton
                        aria-label="Delete"
                        onClick={() => this.props.deleteTask(task._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </IconButton>
                    </div>
                  </ListItemSecondaryAction> */}
                </ListItem>
              }
            >
              <AttendanceShow attendance={attendance} />
            </Modal>
          ))}
        </List>

        {/* <Snack open={this.state.snackOpen} onClose={this.handleClose} /> */}
      </div>
    );
  }
}

export default AttendanceIndex;
