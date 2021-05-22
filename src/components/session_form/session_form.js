import React from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { Header, Image } from "semantic-ui-react";
// import { Image, Segment } from "semantic-ui-react";
import logo from "../../assets/images/ph_logo-min.jpeg";
// import SessionSnack from "./snack";
//register and login form details
class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      category: "",
      catename: "",
      password: "",
      email: "",
      fName: "",
      lName: "",
      password2: "",
      eye: "fas fa-eye",
      success: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }
  // handleBucketChange = () => {
  //   this.setState({ cate: event.target.value });
  // };

  handleSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      category: this.state.category.value,
      password: this.state.password,
      email: this.state.email,
      fName: this.state.fName,
      lName: this.state.lName,
      password2: this.state.password2
    };

    this.props.processForm(user);
    if (Object.values(this.props.errors).length > 0) {
      this.setState({ success: false });
    } else {
      // this.renderSuccess();
      this.setState({
        success: true,
        username: "",
        category: null,
        catename: "",
        password: "",
        email: "",
        fName: "",
        lName: "",
        password2: ""
      });
    }
  }
  handleEnigneChange = data => {
    this.setState({ category: data });
  };

  renderErrors() {
    const errors =
      Object.values(this.props.errors).length > 0 ? "session-errors" : "";
    return (
      <div className={errors}>
        {Object.values(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </div>
    );
  }

  additionalParams() {
    const options = [
      { label: "Code", value: "code" },
      { label: "Design", value: "design" },
      { label: "Research", value: "research" },
      { label: "Agri", value: "agri" }
    ];
    if (this.props.formType === "Register") {
      //register form starts here
      return (
        <>
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.update("username")}
            className="session-input"
            required
            autoComplete="off"
          />
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={this.state.fName}
              onChange={this.update("fName")}
              className="session-input"
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={this.state.lName}
              onChange={this.update("lName")}
              className="session-input"
              autoComplete="off"
            />
          </div>
          <br />
          <p style={{ backgroundColor: "color" }}>
            <Select
              style={{ color: "black" }}
              id="category"
              value={this.state.category}
              options={options}
              isSearchable="true"
              placeholder="Select Engine"
              onChange={this.handleEnigneChange}
            />
          </p>
        </>
      );
    }
  }
  toggle = () => {
    var temp = document.getElementById("materialRegisterFormPassword");
    if (temp.type === "password") {
      temp.type = "text";
      this.setState({ eye: "fas fa-eye-slash" });
    } else {
      temp.type = "password";
      this.setState({ eye: "fas fa-eye" });
    }
  };

  render() {
    const pass2 =
      this.props.formType === "Register" ? (
        <input
          type="password"
          placeholder="Confirm Password"
          value={this.state.password2}
          onChange={this.update("password2")}
          className="session-input"
          required
          autoComplete="off"
        />
      ) : null;
    return (
      //login form starts here
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card-login">
              <form className="box" onSubmit={this.handleSubmit}>
                <Header textAlign="center">
                  <Image circular size="big" src={logo} />
                </Header>
                <h1>{this.props.formType}</h1>
                {this.renderErrors()}
                <input
                  type="text"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                  required
                  autoComplete="off"
                />{" "}
                <br />
                {this.additionalParams()}
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  required
                  autoComplete="off"
                  id="materialRegisterFormPassword"
                  aria-describedby="materialRegisterFormPasswordHelpBlock"
                />{" "}
                <i
                  className={this.state.eye}
                  style={{ cursor: "pointer" }}
                  onClick={this.toggle}
                />
                <br />
                {pass2}
                <br />
                <input type="submit" value={this.props.formType} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(SessionForm);