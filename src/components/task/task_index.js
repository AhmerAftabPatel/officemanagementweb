import React, { useEffect, useState } from "react";
import { Modal } from "react-materialize";
import TaskCreateContainer from "./task_create_container";
import TaskCodeContainer from "./task_code_container";
import TaskShowContainer from "./task_show_container";
import TaskDesignContainer from "./task_design_container";
import TaskResearchContainer from "./task_research_container";
import TaskEdit from "./task_edit";
import Snack from "./snack";
import Moment from "moment";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import { AiFillProfile } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Analytics from "../home/analytics";
import { isAuthenticated } from "../../actions/user_actions";
import { constants } from "../../constants";
// import Button from '@material-ui/core/Button';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MeetingState from "../../actions/mom";
import AlertState from "../admintools/meetings/AlertState";

// const $ = window.$;

const TaskIndex = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackOpen, setsnackOpen] = useState(false);
  const [validCategories, setvalidCategories] = useState([]);
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     snackOpen: false,
  //     validCategories: []
  //   };

  // this.handleClick = this.handleClick.bind(this);
  // this.handleClose = this.handleClose.bind(this);
  // }

  // componentDidMount() {

  useEffect(() => {
    props.fetchTasks();
    props.fetchUsers();
    const token = localStorage.getItem("jwtToken");
    fetch(`${constants}/api/v1/categories`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())

      .then(data => setvalidCategories(data));
    // eslint-disable-next-line
  }, []);

  // }

  const handleClick = () => {
    setsnackOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setsnackOpen(false);
  };
  const handleDropdownClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  // const renderComplete = complete => {
  //   if (complete) {
  //     return "complete";
  //   } else {
  //     return "incomplete";
  //   }
  // };

  // render() {
  if (!props.tasks) return null;
  let { tasks } = props;
  let createTaskButton = (
    <div className="hover-task">
      <div className="social-link">
        {/* <i className="fab fa-twitter"></i> */}
        <p>General</p>
      </div>
    </div>
  );
  let codeTaskButton = (
    <div className="hover-task">
      <div className="social-link">
        {/* <i class="fa fa-code" aria-hidden="true"></i> */}
        <p>Code</p>
      </div>
    </div>
  );
  let designTaskButton = (
    <div className="hover-task">
      <div className="social-link">
        {/* <i class="fa fa-cube" aria-hidden="true"></i> */}
        <p>Design</p>
      </div>
    </div>
  );
  let researchTaskButton = (
    <div className="hover-task">
      <div className="social-link">
        {/* <i class="fa fa-cube" aria-hidden="true"></i> */}
        <p>Research</p>
      </div>
    </div>
  );

  return (
    <div className="task-parent-container">
      {!tasks ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <List
          id="task-index-list"
          className="task-index-container collection with-header"
        >
          <ListItem className="collection-header" id="task-header">
            {isAuthenticated().role === 1 ? (
              <div>
                <Button
                  style={{ color: "blue", backgroundColor : 'black'  }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleDropdownClick}
                >
                  Open Menu
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleDropdownClose}
                >
                  <Link to={`/admin/tasks`}>
                    <MenuItem onClick={handleDropdownClose}>
                      Manage Tasks
                    </MenuItem>
                  </Link>
                  <Link to={`/admin/products`}>
                    <MenuItem onClick={handleDropdownClose}>
                      Manage Products
                    </MenuItem>
                  </Link>
                  <Link to={`/admin/leaves`}>
                    <MenuItem onClick={handleDropdownClose}>
                      {" "}
                      Manage leaves
                    </MenuItem>
                  </Link>
                  <Link to={`/admin/mom`}>
                    <MenuItem onClick={handleDropdownClose}>
                      {" "}
                      Manage Meetings
                    </MenuItem>
                  </Link>
                </Menu>
              </div>
            ) : (
              // <Link to={"/products"}>
              //   <div className="adduser">
              //     <Button>
              //       <span>Admin Tools</span>
              //     </Button>
              //   </div>
              // </Link>
              <Link to={`/user/${isAuthenticated().id}`}>
                <div className="adduser">
                  <Button>
                    <span>Settings</span>
                  </Button>
                </div>
              </Link>
            )}
            {isAuthenticated() && isAuthenticated().role === 1 && (
              <div className="hover">
                <span>Create Task</span>

                <Modal id="create-task-modal" trigger={createTaskButton}>
                  <div className="modal-content">
                    <TaskCreateContainer
                      validCategories={validCategories}
                      snack={handleClick}
                    />
                  </div>
                </Modal>
                <Modal id="code-task-modal" trigger={codeTaskButton}>
                  <div className="modal-content">
                    <TaskCodeContainer
                      validCategories={validCategories}
                      snack={handleClick}
                    />
                  </div>
                </Modal>
                <Modal id="design-task-modal" trigger={designTaskButton}>
                  <div className="modal-content">
                    <TaskDesignContainer
                      validCategories={validCategories}
                      snack={handleClick}
                    />
                  </div>
                </Modal>
                <Modal id="research-task-modal" trigger={researchTaskButton}>
                  <div className="modal-content">
                    <TaskResearchContainer
                      validCategories={validCategories}
                      snack={handleClick}
                    />
                  </div>
                </Modal>
              </div>
            )}
            {isAuthenticated().role === 1 ? (
              <Link to={"/user/signup"}>
                <div className="adduser">
                  <Button>
                    <span>Add User</span>
                  </Button>
                </div>
              </Link>
            ) : (
              <Link to={"/user/signup"}>
                <div className="adduser">
                  <Button>
                    <span>Apply Leave</span>
                  </Button>
                </div>
              </Link>
            )}
          </ListItem>
          <div className="container-fluid mt-5">
            <div className="col-md-12">
              {isAuthenticated() && isAuthenticated().role === 1 && (
                <MeetingState>
                <AlertState>
                <Analytics
                  tasks={props.AllTasks}
                  onclickTask={() => props.fetchTasks()}
                  history = {props.history}
                />
                </AlertState>
                </MeetingState>
              )}
            </div>
          </div>
          {isAuthenticated() && isAuthenticated().role === 0 && (
            <div>
              {tasks.map(task => (
                <Modal
                  id="complete-task-modal"
                  key={task._id}
                  trigger={
                    <ListItem
                      className={`collection-item hvr-fade`}
                      key={task._id}
                    >
                      <ListItemAvatar>
                        <Avatar
                          className={`folder-icon ${
                            task.completed ? "complete" : "incomplete"
                          }`}
                        >
                          {task.completed ? (
                            <i className="fas fa-check"></i>
                          ) : (
                            <FolderIcon />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={task.name}
                        secondary={`Finish by: ${Moment(task.deadline)
                          .utc()
                          .format("MMMM Do, YYYY")}`}
                      />
                      <ListItemSecondaryAction>
                        <div className="secondary-action-container">
                          <TaskEdit
                            snack={handleClick}
                            updateTask={props.updateTask}
                            users={props.users}
                            task={task}
                          />
                          <IconButton
                            aria-label="Delete"
                            onClick={() => props.deleteTask(task._id)}
                          >
                            <i className="fas fa-trash"></i>
                          </IconButton>
                          <Link to={`/task/${task._id}`}>
                            <IconButton>
                              <AiFillProfile />
                            </IconButton>
                          </Link>
                        </div>
                      </ListItemSecondaryAction>
                    </ListItem>
                  }
                >
                  <TaskShowContainer task={task} />
                </Modal>
              ))}
            </div>
          )}
        </List>
      )}

      <Snack open={snackOpen} onClose={handleClose} />
    </div>
  );
  // }
};

export default TaskIndex;
