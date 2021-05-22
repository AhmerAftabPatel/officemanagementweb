import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../actions/user_actions";
import Base from "../components/base/base";

/**
 * @author
 * @function AdminDashboard
 **/

const AdminDashboard = props => {
  const fName = isAuthenticated().fName;
  const email = isAuthenticated().email;

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h5 className="card-header bg-dark text-white">Admin Navigation</h5>
        <ul className="list-group">
        <li className="list-group-item">
            <Link to="/admin/tasks" className="nav-link text-info">
              Manage Tasks
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-info">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/leaves" className="nav-link text-info">
              Manage leaves
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/mom" className="nav-link text-info">
              Manage meetings
            </Link>
          </li> 
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className=" badge badge-success mr-2">Name </span>
            {fName}
          </li>
          <li className="list-group-item">
            <span className=" badge badge-success mr-2">Email </span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome Admin"
      description="Manage Products and services"
      className="container"
    >
      <div className="row ml-5 ">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
