import React from "react";
import { Modal } from "react-materialize";
import TaskShowContainer from "../task/task_show_container";
import TaskEdit from "../task/task_edit";
import Snack from "../task/snack";
import Moment from "moment";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

// const $ = window.$;

class ProfileIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snackOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    this.props.fetchTasks(token);
    this.props.fetchUsers();
   
  }
  

  handleClick() {
    this.setState({ snackOpen: true });
  }

  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackOpen: false });
  }

  renderComplete(complete) {
    if (complete) {
      return "complete";
    } else {
      return "incomplete";
    }
  }

  render() {
    if (!this.props.tasks) return null;
    let { tasks } = this.props;

    return (
      <div className="task-parent-2">
        <List
          id="task-index-list"
          className="task-index-container collection with-header"
        >
          <ListItem id="task-header">
            <div style={{}}>
              <h5>User Tasks</h5>{" "}
            </div>

            {/* <Modal id="create-task-modal" trigger={createTaskButton}>
              <div className="modal-content"><TaskCreateContainer snack={this.handleClick} />
              </div>
            </Modal> */}
          </ListItem>
          {tasks.map(task => (
            <Modal
              key={task._id}
              trigger={
                <ListItem className={`collection-item hvr-fade`} key={task._id}>
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
                        snack={this.handleClick}
                        updateTask={this.props.updateTask}
                        users={this.props.users}
                        task={task}
                      />
                      <IconButton
                        aria-label="Delete"
                        onClick={() => this.props.deleteTask(task._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </IconButton>
                    </div>
                    <Link to={`/task/${task._id}`}>
                      <Button basic>Read more</Button>
                    </Link>
                  </ListItemSecondaryAction>
                </ListItem>
              }
            >
              <TaskShowContainer task={task} />
            </Modal>
          ))}
        </List>

        <Snack open={this.state.snackOpen} onClose={this.handleClose} />
      </div>
    );
  }
}

export default ProfileIndex;
