import React from "react";
import Select from "react-select";
import { withRouter } from "react-router-dom";
// import { constants } from "../../constants";
import { imageUploadSizeFailueMsg } from "./Message/MessageData";
import { Image, Form } from "semantic-ui-react";
import { SuccessMessageBox, FailureMessageBox } from "./Message/MessageBoxes";
import Default from "../../assets/images/Default.png";

class TaskCreateResearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      estTime: "",
      deadline: "",
      userId: null,
      cateId: null,
      error: "",
      validCategories: [],
      validUsers: [],
      showSuccessBox: false,
      successBoxData: {
        header: null,
        content: null
      },
      successBoxAttributes: {},
      showFailureBox: false,
      failureBoxData: {
        header: null,
        content: null
      },
      failureBoxAttributes: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.isValid()) {
      const task = {
        name: this.state.name,
        description: this.state.description,
        estTime: this.state.estTime,
        deadline: this.state.deadline,
        userId: this.state.userId.value,
        cateId: this.state.cateId.value,
        dummy: "research"
      };
      console.log(task)
      const token = localStorage.getItem("jwtToken");

      this.props.createTask(task, token);
      this.props.fetchTasks(token);
      this.clearInput();
      this.props.snack();
    }
  }
  onFileChange = event => {
    const file = event.target.files[0];
    const fileSize = file.size;
    if (fileSize > 1000000) {
      this.setState({
        showFailureBox: true,
        failureBoxData: {
          header: imageUploadSizeFailueMsg.header,
          content: imageUploadSizeFailueMsg.content
        }
      });
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.setState({
      imageFile: file
    });
    reader.onloadend = () => {
      this.setState({
        imgSrc: [reader.result]
      });
    };
  };
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
    const { description, name, estTime, deadline,userId,cateId } = this.state;
    if (description.length < 5 && name.length < 5 && !estTime && !deadline) {
      this.setState({
        error: "something unexpected happened"
      });
      return false;
    } else if (deadline === ""  || userId === null || cateId === null) {
      this.setState({
        error: "deadline connot be empty"
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

  componentDidMount() {
    // const token = localStorage.getItem("jwtToken");
    // fetch(`${constants}/api/v1/categories`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    //   .then(response => response.json())

    //   .then(data => this.setState({ validCategories: data }));
  }

  render() {
    if (!this.props.users) return null;
    let { users } = this.props;
    const categories = this.props.validCategories;

    const arr = Object.values(categories);
    let userOptions = [];
    users.forEach(user => {
      if (user.category === "research") {
        userOptions.push({
          label: user.username,
          value: user.id
        });
      }
    });

    let cateOptions = [];
    arr.forEach(cate => {
      cateOptions.push({
        label: cate.name,
        value: cate._id
      });
    });

    let imagepreview = null;
    if (this.state.imgSrc) {
      imagepreview = (
        <Image src={this.state.imgSrc} size="small" centered rounded />
      );
    } else {
      imagepreview = <Image src={Default} size="small" rounded centered />;
    }

    return (
      <div className="task-modal-container">
        <div className="label">
          <p>
            <span style={{ color: "red" }}>{this.state.error}</span>
          </p>
          <h1>
            {" "}
            <span style={{ color: "red" }}>Research Engine</span> &nbsp;
            <i className="fa fa-search-plus" aria-hidden="true"></i>
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
          <div className="row">
            <div className="input-field col s3">
              {/* <i className="fas fa-comment prefix"></i> */}
              <textarea
                autoComplete="off"
                value={this.state.description}
                id="description"
                type="textarea"
                // maxLength="1000"
                className="validate"
                rows={5}
                cols={5}
                style={{ height: "100px" }}
                placeholder="Task description"
                onChange={this.update("description")}
              />
              <label htmlFor="description">Additional Info</label>
            </div>
          </div>

          <div className="input-field col s6">
            <div className="input-field col s12">{imagepreview}</div>
            {this.state.showSuccessBox ? (
              <SuccessMessageBox
                {...this.state.successBoxData}
                attributes={this.state.successBoxAttributes}
                handleDismiss={() => this.setState({ showSuccessBox: false })}
              />
            ) : null}
            {this.state.showFailureBox ? (
              <FailureMessageBox
                {...this.state.failureBoxData}
                attributes={this.state.failureBoxAttributes}
                handleDismiss={() => this.setState({ showFailureBox: false })}
              />
            ) : null}

            <p>&nbsp;</p>
            <Form.Input
              type="file"
              onChange={this.onFileChange}
              // required
              className="imagefile"
            />
          </div>

          <div>
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
            <button className="btn waves-effect waves-light" type="submit">
              {" "}
              Create Task{" "}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(TaskCreateResearch);
