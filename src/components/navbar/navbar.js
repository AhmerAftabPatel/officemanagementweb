import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../pages/all_users";
import { RiHome4Line } from "react-icons/ri";
import { ImUsers, ImExit } from "react-icons/im";
import { constants } from "../../constants";
import { fetchleaves } from "../../actions/leave_actions";
// import { useSelector } from "react-redux";
// import MobileContainer from "./MobileHeader";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};
const Navbar = ({ currentUser, logout, history }) => {
// const tasks = useSelector(state => state.entities.tasks)
fetchleaves()
  return (
    <div>
      <nav
        className="navbar"
        style={{ display: isAuthenticated() ? "" : "none" }}
      >
        <ul className="navbar-nav">
          <li className="logo">
            <div className="nav-link">
              <span className="link-text logo-text">
                {currentUser.username}
              </span>
              <span style={{ marginTop: "70px" }}>
                <img
                  style={{ width: "70px", height: "70px" }}
                  className="logo-svg rounded-circle"
                  alt="profileImage"
                  src={`${constants}/api/photo/${isAuthenticated().id}`}
                ></img>
              </span>
            </div>
          </li>
          {/* {isAuthenticated() && isAuthenticated().role === 1 && ( */}
          <li className="nav-item">
            <Link style={currentTab(history, "/")} to="/" className="nav-link">
              <RiHome4Line style={icon} />
              <span className="link-text">Home</span>
            </Link>
          </li>
          {/* )} */}
          {isAuthenticated() && isAuthenticated().role === 1 && (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/user/allusers")}
                to="/user/allusers"
                className="nav-link"
              >
                <ImUsers style={icon} />
                <span className="link-text">Agents</span>
              </Link>
            </li>
          )}
          {/* {isAuthenticated() && isAuthenticated().role === 1 && (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/products")}
                className="nav-link"
                // to="/user/signup"
                to="/products"
              >
                <BsFillCloudFill style={icon} />
                <span className="link-text">AdminTools</span>
              </Link>
            </li>
          )} */}

          <li className="nav-item">
            <div className="nav-link">
              <ImExit onClick={logout} style={icon} />
              <button className="logout-button" onClick={logout}>
                <span className="link-text">logout</span>
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const icon = {
  height: "2rem",
  width: "2rem"
};
export default withRouter(Navbar);
