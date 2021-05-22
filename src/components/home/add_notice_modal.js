import React, { useState } from "react";
import { isAuthenticated } from "../../actions/user_actions";
import { createNotice } from "../../util/notice_api_util";

/**
 * @author
 * @function AddNoticeMOdal
 **/

const AddNoticeModal = props => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [values, setValues] = useState({
    name: "",
    description: "",
    date: "",
    loading: false,
    createdNotice: "",
  });
  const id = isAuthenticated().id
  const { name, description, date } = values;
  const handleSubmit = e => {
    e.preventDefault();
    if (isValid()) {
      const notice = {
        name: name,
        description: description,
        created: date
      };
      createNotice(notice,id).then(data => {
        if (data.error) {
          console.log(error);
          setError(error);
        }
        else {
          setSuccess("created successfully");
          props.createNoticeClicked();
        }
      });
      // this.props.snack();
    }
  };
  const isValid = () => {
    if (!description.length > 0) {
      setError("description should not be empty");
      return false;
    } else if (!name.length > 0) {
      setError("title should not be empty");
      return false;
    }
    else if (!date.length > 0) {
      setError("date should not be empty");
      return false;
    }
    return true;
  };
  const update = field => {
    return e => setValues({ ...values, [field]: e.currentTarget.value });
  };
  // if(modalOpen){
  //   return <Redirect to = {`/#/`}/>
  // }
  return (
    <div className="task-modal-container">
      <div className="label">
        <p style={{ color: "red" }}>{error}</p>
        <p style={{ color: "green" }}>{success}</p>
        <h1>Create New Notice</h1>
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
              placeholder="notice title"
              onChange={update("name")}
            />
            <label htmlFor="name">Title for Notice</label>
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
              placeholder="notice description"
              onChange={update("description")}
            />
            <label htmlFor="description">Additional Info</label>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="far fa-calendar-alt prefix"></i>
              <input
                type="date"
                placeholder="date"
                value={date}
                onChange={update("date")}
              />
            </div>
          </div>
        </div>
        <div id="close-button">
          <button
            className="btn waves-effect waves-light"
            type="submit"
          >
            {" "}
            Create Notice{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNoticeModal;
