import React, { useState, useEffect } from "react";
import { getUsers } from "../util/task_api_util";
import PropTypes from "prop-types";
import Default from "../assets/images/Default.png";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { constants } from "../constants";
import { GuardSpinner } from "react-spinners-kit";
import UserCollection from "../components/users/users_collection";

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  }
  return false;
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      rnpole="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "65rem",
    marginTop: "50px",
    marginLeft: "250px",
    marginRight: "50px",
    height: "600px",
    boxShadow: "0 0 10px 0",
    overflow: "auto"
    // background: "transparent"
  }
}));
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [tab, setTab] = useState("code");

  const preload = () => {
    getUsers().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data.data);
        setLoading(false);
      }
    });
  };
  const arr = [
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4 ALL" }
  ];
  const tabs = [
    { label: "Code Engine", value: 0, key: "code" },
    { label: "Design Engine", value: 1, key: "design" },
    { label: "Agri Engine", value: 2, key: "agri" },
    { label: "Research Engine", value: 2, key: "research" }
  ];

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <>
      <div className="row">
        <div className={classes.root}>
          <AppBar position="sticky" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              style={{ backgroundColor: "khaki" }}
              position="fixed"
            >
              {tabs.map(tab => (
                <Tab
                  label={tab.label}
                  onClick={() => setTab(tab.key)}
                  {...a11yProps(tab.value)}
                />
              ))}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {arr.map(ar => {
              return (
                <div className="container">
                  <TabPanel dir={theme.direction} key={ar}>
                    <div className="row">
                      {loading ? (
                        <div style={{ marginLeft: "46%", marginTop: "22%" }}>
                          <GuardSpinner size={50} color="#686769" />
                        </div>
                      ) : (
                        users.map((user, i) => {
                          let photoUrl = user.id
                            ? `${constants}/${user.image}`
                            : Default;
                          if (user.category === tab) {
                            return (
                              <UserCollection
                                user={user}
                                i={i}
                                photoUrl={photoUrl}
                              />
                            );
                          } else {
                            return null;
                          }
                        })
                      )}
                    </div>
                  </TabPanel>
                </div>
              );
            })}
          </SwipeableViews>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
