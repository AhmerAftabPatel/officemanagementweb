import React, { useEffect, useState } from "react";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import { Header } from "semantic-ui-react";

const TaskCreateCode = props => {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    description: "",
    deadline: "",
    phase: "",
    userId: null,
    cateId: null,
    validcategories: [],
    validUsers: []
  });
  const { name, description, deadline, phase, userId, cateId } = values;

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid()) {
      const task = {
        name: name,
        description: description,
        phase: phase.label,
        deadline: deadline,
        userId: userId.value,
        cateId: cateId.value,
        dummy: "code"
      };


      props.createTask(task);
      props.fetchTasks();
      clearInput();
      props.snack();
    }
  };

  const clearInput = () => {
    setValues({
      ...values,
      name: "",
      description: "",
      phase: "",
      deadline: "",
      error: "",
      userId: null,
      cateId: null,
      validcategories: [],
      validUsers: []
    });
  };

  const isValid = () => {
    if (!description.length > 0) {
      setError("description should not be empty ");
      return false;
    } else if (deadline === "" || userId === null || cateId === null) {
      setError("all fields are required");
      return false;
    }
    return true;
  };

  const update = field => {
    return e => setValues({ ...values, [field]: e.currentTarget.value });
  };

  const handleUserChange = user => {
    setValues({ ...values, userId: user });
  };

  const handlecateChange = cate => {
    setValues({ ...values, cateId: cate });
  };
  const handlePhaseChange = phase => {
    setValues({ ...values, phase: phase });
  };

  useEffect(() => {}, []);

  if (!props.users) return null;
  let { users } = props;
  const categories = props.validCategories;

  const arr = Object.values(categories);
  let userOptions = [];
  users.forEach(user => {
    if (user.category === "code") {
      userOptions.push({
        label: user.username,
        value: user.id
      });
    }
  });
  let phaseOptions = [
    { label: "Research" },
    { label: "Design" },
    { label: "Coding" },
    { label: "Testing" },
    { label: "Deployment" },
    { label: "Maintainance" }
  ];

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
          <span style={{ color: "red" }}>{error}</span>
        </p>
        <h1>
          <Header textAlign="center" style={{ color: "yellow" }}>
            Code Engine
          </Header>
          &nbsp;
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <i className="fas fa-tasks prefix"></i>
            <input
              autoComplete="off"
              value={name}
              id="name"
              type="text"
              className="validate"
              placeholder="Task title"
              onChange={update("name")}
            />
            <label htmlFor="name">Name of Task</label>
          </div>
        </div>

        <div>
          <div className="input-field col s6">
            <i className="fas fa-comment prefix"></i>
            <input
              autoComplete="off"
              value={description}
              id="description"
              type="text"
              className="validate"
              // maxLength="35"
              placeholder="Task description"
              onChange={update("description")}
            />
            <label htmlFor="description">Additional Info</label>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="far fa-calendar-alt prefix"></i>
              {/* <label htmlFor="name">Deadline</label> */}

              <input
                type="date"
                className="form-control"
                placeholder="deadline date"
                value={deadline}
                onChange={update("deadline")}
              />
            </div>
            <div className="input-field col s6">
              <Select
                id="phase"
                value={phase}
                options={phaseOptions}
                isSearchable="true"
                placeholder="Which Phase?"
                onChange={handlePhaseChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <i className="far fa-folder-open prefix"></i>
              <Select
                id="cateId"
                value={cateId}
                options={cateOptions}
                isSearchable="true"
                placeholder="Which product?"
                onChange={handlecateChange}
              />
            </div>
            <div className="input-field col s6">
              <i className="fas fa-user prefix"></i>
              <Select
                id="userId"
                value={userId}
                options={userOptions}
                isSearchable="true"
                placeholder="Assign To?"
                onChange={handleUserChange}
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
};

export default withRouter(TaskCreateCode);
