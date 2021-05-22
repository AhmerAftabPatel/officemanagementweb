import React from "react";

class AttendanceShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.attendance._id,
      name: this.props.attendance.name,
      outTime: this.props.attendance.outTime,
      date: this.props.attendance.date,
      inTime: this.props.attendance.inTime,
      userId: this.props.attendance.userId
    };
    this.handleMark = this.handleMark.bind(this);
  }

  handleMark(e) {
    e.preventDefault();
    //If already marked as completed, make it incomplete:

    const task = {
      _id: this.state._id,
      name: this.state.name,
      description: this.state.description,
      estTime: this.state.estTime,
      deadline: this.state.deadline,
      userId: this.state.userId
    };

    if (this.state.completed === true) {
      task.completed = false;
      this.setState({ completed: false });
    } else {
      task.completed = true;
      this.setState({ completed: true });
    }
    const token = localStorage.getItem("jwtToken");

    this.props.updateTask(task, token);
  }

  render() {
    const { attendance } = this.props;
    if (!attendance) return null;
    return (
      <>
        <div className="attendance-modal">
          <p>Name {attendance.name}</p>
        </div>
      </>
    );
  }
}

export default AttendanceShow;
