import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { signup, removeSessionErrors } from "../../actions/session_actions";
import SessionForm from "./session_form";

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "Register",
    navLink: (
      <Link to="/">
        <div className="other-session-link">Back to Home</div>
      </Link>
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(removeSessionErrors()),
    signup: (user) => dispatch(signup(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
