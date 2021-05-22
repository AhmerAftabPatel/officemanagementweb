import React from "react";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import { Header } from "semantic-ui-react";
// import { constants } from "../../constants";

class TaskCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      estTime: "",
      error: "",
      deadline: "",
      userId: null,
      cateId: null,
      validCategories: [],
      validUsers: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const token = localStorage.getItem("jwtToken");
      const task = {
        name: this.state.name,
        description: this.state.description,
        estTime: this.state.estTime,
        deadline: this.state.deadline,
        userId: this.state.userId.value,
        cateId: this.state.cateId.value
      };

      this.props.createTask(task, token);
      this.props.fetchTasks(token);
      this.clearInput();
      this.props.snack();
    }
  }

  clearInput() {
    this.setState({
      name: "",
      description: "",
      estTime: "",
      deadline: "",
      userId: null,
      cateId: null,
      validcategories: [],
      validUsers: []
    });
  }
  isValid = () => {
    const { description, deadline, userId, cateId } = this.state;
    if (!description.length > 0) {
      this.setState({
        error: "description should not be empty"
      });
      return false;
    } else if (deadline === "" || userId === null || cateId === null) {
      this.setState({
        error: "all fields are required"
      });
      return false;
    }
    return true;
  };

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleUserChange = user => {
    this.setState({ userId: user });
  };

  handlecateChange = cate => {
    this.setState({ cateId: cate });
  };

  updateDeadline(deadline) {
    return e =>
      this.setState({
        deadline: e.currentTarget.value
      });
  }

  componentDidMount() {}

  render() {
    if (!this.props.users) return null;
    let { users } = this.props;
    const categories = this.props.validCategories;

    const arr = Object.values(categories);
    let userOptions = [];
    users.forEach(user => {
      userOptions.push({
        label: user.username,
        value: user.id
      });
    });

    let cateOptions = [];
    arr.forEach(cate => {
      cateOptions.push({
        label: cate.name,
        value: cate._id
      });
    });

    return (
      <div className="task-modal-container">
        <div className="label">
          <p>
            <span style={{ color: "red" }}>{this.state.error}</span>
          </p>
          <h1>
            <Header textAlign="center" style={{ color: "black" }}>
              Create New Task
            </Header>
          </h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <i className="fas fa-tasks prefix"></i>
              <input
                autoComplete="off"
                value={this.state.name}
                id="name"
                type="text"
                className="validate"
                placeholder="Task title"
                onChange={this.update("name")}
              />
              <label htmlFor="name">Name of Task</label>
            </div>
          </div>

          <div>
            <div className="input-field col s6">
              <i className="fas fa-comment prefix"></i>
              <input
                autoComplete="off"
                value={this.state.description}
                id="description"
                type="text"
                className="validate"
                // maxLength="35"
                placeholder="Task description"
                onChange={this.update("description")}
              />
              <label htmlFor="description">Additional Info</label>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <i className="far fa-clock prefix"></i>
                <input
                  autoComplete="off"
                  value={this.state.estTime}
                  id="estTime"
                  type="number"
                  className="validate"
                  placeholder="est Time"
                  onChange={this.update("estTime")}
                />
                <label htmlFor="estTime">Estimated Time</label>
              </div>
              <div className="input-field col s6">
                <i className="far fa-calendar-alt prefix"></i>
                <input
                  type="date"
                  placeholder="deadline date"
                  value={this.state.deadline}
                  onChange={this.update("deadline")}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <i className="far fa-folder-open prefix"></i>
                <Select
                  id="cateId"
                  value={this.state.cateId}
                  options={cateOptions}
                  isSearchable="true"
                  placeholder="Which product?"
                  onChange={this.handlecateChange}
                />
              </div>
              <div className="input-field col s6">
                <i className="fas fa-user prefix"></i>
                <Select
                  id="userId"
                  value={this.state.userId}
                  options={userOptions}
                  isSearchable="true"
                  placeholder="Assign To?"
                  onChange={this.handleUserChange}
                />
              </div>
            </div>
          </div>
          <div id="close-button">
            <button
              className="btn waves-effect waves-light modal-close"
              type="submit"
            >
              {" "}
              Create Task{" "}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(TaskCreate);
