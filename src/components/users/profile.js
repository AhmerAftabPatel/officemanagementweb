import React, { Component } from "react";
import Default from "../../assets/images/Default.png";
import { read } from "../../util/user_api_util";
import TaskIndexContainer from "./profile_index_container";
import AttendanceIndexContainer from "./attendance_index_container";
import { Link } from "react-router-dom";
import Moment from "moment";
import { constants } from "../../constants";
import { isAuthenticated } from "../../actions/user_actions";
// import { constants } from "../../constants";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      redirectToSignin: false,
      //   following: false,
      error: "",
      tasks: []
    };
  }

  init = userId => {
    localStorage.setItem("userIDforUse", userId);
    read(userId)
      .then(data => {
        this.setState({ user: data.data });
      })
      .catch(error => {
        console.error(error.response);
        this.setState({ redirectToSignin: true });
      });
  };
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params._id;

    this.init(userId);
  }

  render() {
    const { user } = this.state;
    const photoUrl = user.image
      ? `${constants}/uploads/${user.image}`
      : Default;
    return (
      <>
        <div className="profile-container">
          <div className="container-fluid">
            <h2
              style={{
                backgroundColor: "khaki",
                textAlign: "center",
                borderRadius: "7px"
              }}
              className="mt-5"
            >
              Profile
            </h2>{" "}
            <h2>
              {user.role === 1 ? "Emissory - " : "Agent - "} {user.category}{" "}
              Engine
            </h2>
            <hr />
            <div className="profile-second-container row">
              <div className="col-md-4 col-sm-4">
                <img
                  style={{ height: "200px", width: "200px" }}
                  className="img-thumbnail"
                  src={photoUrl}
                  onError={i => {
                    i.target.src = `${Default}`;
                  }}
                  // src={photoUrl}
                  alt={user.username}
                />
              </div>

              <div className="col-md-8">
                <div className="lead">
                  <p>
                    This is{" "}
                    <span style={{ fontWeight: "bold" }}>{user.username}</span>{" "}
                  </p>
                  <p>Email: {user.email}</p>

                  <p>{`Joined on ${Moment(user.date)
                    .utc()
                    .format("Do dddd MMMM gggg")}`}</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="col-md-12 mb-5">
                <div style={{ backgroundColor: "khaki", textAlign: "center" }}>
                  <h2 className="mt-5">Personal details</h2>
                </div>{" "}
                <hr />
                <p className="lead">userid : {user.id}</p>
                <p>
                  <b> First Name : </b> {user.fName}
                </p>
                <p>
                  <b>Last Name : </b> {user.lName}
                </p>
                <p>
                  <b>Hobbies : </b>
                  {user.hobbies ? user.hobbies : "---No hobbies, so boring!---"}
                </p>
                <p>
                  <b>Personal Email :</b>
                  {user.personalemail ? user.personalemail : " not provided"}
                </p>
                <p>
                  <b>Phone Number :</b>{" "}
                  {user.phoneno ? user.phoneno : " not provided"}
                </p>
                <hr />
                <div className="row">
                  <div className="s-6">
                    <TaskIndexContainer />
                  </div>
                  <div className="m-6">
                    <AttendanceIndexContainer />
                  </div>
                </div>
              </div>
            </div>
            <div>
              {isAuthenticated() && isAuthenticated().role === 1 && 
              <div className="card mt-5 edit-profile">
                <div className="card-body">
                  <h5 className="card-title">Admin</h5>
                  <p className="mb-2 text-danger">Edit/Delete as an Admin</p>
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/profile/edit/${user.id}`}
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
