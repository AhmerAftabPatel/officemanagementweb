import React, { useState, useContext, useEffect } from "react";
import MeetingContext from "./meeting_context";
import AlertContext from "./alert";
import Alerts from "./alerts_layout";
import { isAuthenticated } from "../../../actions/user_actions";
// import { Dropdown } from "semantic-ui-react";
// import clsx from "clsx";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
// import Chip from "@material-ui/core/Chip";

const MeetingForm = props => {
  const meetingContext = useContext(MeetingContext);
  const { addMeeting, updateMeeting, current, clearCurrent } = meetingContext;
  const alertContext = useContext(AlertContext);
  const users = props.users;
  const { setAlert } = alertContext;
  // getUsers();
  useEffect(() => {
    if (current !== null) {
      setMeeting(current);
    } else {
      setMeeting({
        name: "",
        meetingdate: "",
        meetingtime: "",
        description: "",
        attendees: [],
        type: "important"
      });
    }
    // getUsers();
  }, [meetingContext, current]);

  const host = isAuthenticated().id;

  const [meeting, setMeeting] = useState({
    name: "",
    // phone: "",
    // email: "",
    hostedby: "",
    meetingdate: "",
    meetingtime: "",
    description: "",
    attendees: [""],
    type: "service"
  });
  // console.log(attendees)

  const onChange = e =>
    setMeeting({ ...meeting, [e.target.name]: e.target.value, hostedby: host });
  // const fld = document.getElementById("myMulti");
  // const onChangeUser = e => {
  //   const values = [];
  //   for (let i = 0; i < fld.options.length; i++) {
  //     if (fld.options[i].selected) {
  //       values.push(fld.options[i].value);
  //       setMeeting({ attendees: values });
  //     }
  //   }
  //   console.log(values);
  // };

  // const onUserChange = selectedOptions => {
  //   setMeeting({ attendees: selectedOptions });
  // };

  const onSubmit = e => {
    e.preventDefault();

    const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(
      meetingdate
    );
    const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(
      meetingtime
    );

    if (meeting.name === "" || !dateRegex || !timeRegex) {
      // if (!phoneRegex) setAlert("Please enter a valid phone number", "danger");
      if (!dateRegex)
        setAlert("Please enter a valid date: YYYY:MM:DD", "danger");
      if (!timeRegex) setAlert("Please enter a valid time: HH:MM", "danger");

      return;
    }

    // create new or update  exisiting meeting
    current === null ? addMeeting(meeting, attendees) : updateMeeting(meeting);

    clearAll();
  };

  const clearAll = () => clearCurrent();

  const {
    name,
    meetingdate,
    meetingtime,
    description,
    attendees
    // attendees
  } = meeting;
  // let arr = Object.values(users);
  let userOptions = [];
  users.forEach(user => {
    userOptions.push(user.username);
  });
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200
      }
    }
  };
  // const [attendees, setPersonName] = React.useState([]);

  // const handleChange = event => {
  //   setPersonName(event.target.value);
  // setMeeting({ attendees: event.target.value });
  // };

  return (
    <div style={meetingclass}>
      <form onSubmit={onSubmit}>
        <Alerts />
        <h2>{current ? "Update Meeting" : "Add Meeting"}</h2>
        <input
          type="text"
          name="name"
          placeholder="Title"
          value={name}
          onChange={onChange}
          required
          maxLength="40"
          autoComplete="off"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={onChange}
          rows="4"
          maxLength="200"
          autoComplete="off"
        />
        <label htmlFor="meetingdate">Meeting date</label>
        <div className="input-field col s6">
          <i className="far fa-calendar-alt prefix"></i>
          <input
            type="date"
            name="meetingdate"
            placeholder="date"
            value={meetingdate}
            onChange={onChange}
          />
        </div>
        <label htmlFor="meetingtime">Meeting Time</label>
        <div className="input-field col s6">
          <input
            type="time"
            name="meetingtime"
            placeholder="Time HH:MM"
            value={meetingtime}
            onChange={onChange}
            required
          />
        </div>
        {/* <select
          multiple="multiple"
          name="attendees"
          id="myMulti"
          onChange={onChangeUser}
        >
          {<option value="user">users</option>}
        </select> */}
        {/* <Dropdown
          placeholder="Skills"
          fluid
          multiple
          onChange={onChangeUser}
          options={userOptions}
        /> */}
        <div style= {{texOverflow: "ellipsis"}} >
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          name="attendees"
          multiple
          style= {{texOverflow: "ellipsis"}}
          value={attendees}
          onChange={onChange}
          input={<Input />}
          renderValue={selected => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {userOptions.map(name => (
            <MenuItem key={name} value={name} >
              <Checkbox checked={attendees.indexOf(name) > -1} />
              <ListItemText primary={name} style= {{texOverflow: "ellipsis"}}/>
            </MenuItem>
          ))}
        </Select>
        </div>

        {/* <p className="radio-row">
        Meeting Type:&nbsp;&nbsp;&nbsp;
        <label htmlFor="personal">
          {" "}
          <input
            type="radio"
            name="type"
            value="personal"
            checked={type === "personal"}
            onChange={onChange}
          />{" "}
          Personal{" "}
        </label>
        <label htmlFor="professional">
          {" "}
          <input
            type="radio"
            name="type"
            value="professional"
            checked={type === "professional"}
            onChange={onChange}
          />{" "}
          Professional{" "}
        </label>
      </p> */}
        <div>
          <input
            type="submit"
            value={current ? "Update Meeting" : "Add Meeting"}
            className="btn dark btn-block"
          />
        </div>
        <br />
        {current && (
          <div>
            <input
              type="button"
              className="btn light btn-block"
              value="Clear"
              onClick={clearAll}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default MeetingForm;
const meetingclass = {
  margin: "auto",
  border: "3px solid black",
  padding: "10px",
  backgroundColor: "white"
};
