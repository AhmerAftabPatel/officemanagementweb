import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { constants } from "../../constants";

/**
 * @author
 * @function EditProfile
 **/

const EditProfile = props => {
  const [username, setUsername] = useState([]);
  const [email, setEmail] = useState([]);
  const [image, setimage] = useState([]);
  const [message, setMessage] = useState([]);
  const [redirectToProfile, setRedirect] = useState(false);
  const onChangeFile = e => {
    setimage(e.target.files[0]);
  };
  const changeOnClick = e => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("image", image);

    setEmail("");
    setUsername("");

    axios
      .put(
        `${constants}/api/v1/users/user/update/${props.match.params.userId}`,
        formData
      )
      .then(res => [setMessage(res.data), setRedirect(true)])
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    
    axios
      .get(`${constants}/api/v1/users/${props.match.params.userId}`)
      .then(res => [
        setUsername(res.data.username),
        setEmail(res.data.email),
        setimage(res.data.image)
      ]);
      // eslint-disable-next-line
  }, [`${props.match.params.userId}`]);
  // const redirect = () => {
  if (redirectToProfile) {
    return <Redirect push to={`/user/${props.match.params.userId}`} />;
  }
  // };
  // redirect();
  return (
    <div className="container" style={{ marginTop: "1vh", padding: "5vw" }}>
      <div className="card cloudy-knoxville-gradient">
        <h5 className="card-header info-color black-text text-center py-4">
          <b>Edit Profile</b>
          <p>{message}</p>
        </h5>
        <div className="card-body px-lg-5 pt-0">
          {/* {loading ? "Loading..." : null} */}
          <form
            onSubmit={changeOnClick}
            encType="multipart/form-data"
            className="text-center"
            style={{ color: "#757575" }}
          >
            <div className="form">
              <div className="md-form">
                <input
                  type="file"
                  name="photo"
                  accept="image"
                  required="required"
                  onChange={onChangeFile}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form">
              <div className="md-form">
                <input
                  autoCapitalize="true"
                  autoComplete="username"
                  type="text"
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  id="materialRegisterFormLastName"
                  className="form-control"
                />
                <label htmlFor="materialRegisterFormLastName">Full Name</label>
              </div>
            </div>
            <div className="form">
              <div className="md-form">
                <input
                  autoComplete="email"
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  className="form-control"
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            {/* <div className="md-form">
            <input
              autoComplete="current-password"
              type="password"
              onChange={this.handleChange("password")}
              id="materialRegisterFormPassword"
              className="form-control"
              aria-describedby="materialRegisterFormPasswordHelpBlock"
            />
            <label htmlFor="materialRegisterFormPassword">Password</label>
            <button onClick={this.toggle}>Show Password</button>
            <small
              id="materialRegisterFormPasswordHelpBlock"
              className="form-text text-muted mb-4"
            >
              Atleast 6 chars
            </small>
          </div> */}
            {/* <div className="md-form">
            <textarea
              onChange={this.handleChange("about")}
              value={about}
              id="materialContactFormMessage"
              className="form-control md-textarea"
              rows="3"
            ></textarea>
            <label htmlFor="materialContactFormMessage">About</label>
          </div> */}
            <button
              // onClick={this.clickSubmit}
              className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
