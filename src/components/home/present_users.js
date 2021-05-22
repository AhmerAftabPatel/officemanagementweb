import React, { useState } from "react";
import { useEffect } from "react";
import { fetchAttendance } from "../../util/attend_api_util";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { constants } from "../../constants";
import { Link } from "react-router-dom";
import Default from "../../assets/images/Default.png";
import { Popup } from "semantic-ui-react";
import Moment from "moment";
/**
 * @author
 * @function presentUsers
 **/
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    overflowY: "auto",
    "& > *": {
      margin: theme.spacing(1)
    },
    height: "60px",
    float: "left"
  }
}));
const PresentUsers = props => {
  const [attendance, setAttendance] = useState([]);
  const classes = useStyles();
  const token = localStorage.getItem("jwtToken");
  const preload = () => {
    fetchAttendance(token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAttendance(data.data.attendances);
      }
    });
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line
  }, []);
  let gg = new Date().toDateString();
  let today = new Date();
  let date = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  let todayDate = `${date} ${month + 1} ${year}`;
  const map = {};
  const newArray = [];

  attendance.forEach(attend => {
    if (!map[JSON.stringify(attend.userId)] && attend.date === todayDate) {
      map[JSON.stringify(attend.userId)] = true;
      newArray.push(attend);
    }
  });

  return (
    <>
      <div className={classes.root}>
        <p style={{ paddingTop: "20px", fontWeight: "bolder" }}>
          {" "}
          <span style={{ color: "white" }}>{gg}</span>
        </p>
        {newArray.map((attend, index) => {
          if (attend.date === todayDate) {
            return (
              <div key={index}>
                <Link to={`/user/${attend.userId}`}>
                  <Popup
                    content={`In time : ${Moment(attend.inTime).format(
                      "h:mm a")}`}
                    key={attend.name}
                    header={attend.name}
                    trigger={
                      <Avatar
                        alt={attend.username}
                        src={`${constants}/api/photo/${attend.userId}`}
                        onError={i => {
                          i.target.src = `${Default}`;
                        }}
                      />
                    }
                  />
                </Link>
              </div>
            );
          } else return null;
        })}
      </div>
    </>
  );
};

export default PresentUsers;
