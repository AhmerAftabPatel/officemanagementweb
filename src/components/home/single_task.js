import React, { Component } from "react";
import { Link } from "react-router-dom";
import Comment from "./comments";
import { deleteTask, fetchTask } from "../../util/task_api_util";
import Axios from "axios";
import { constants } from "../../constants";
import { GuardSpinner } from "react-spinners-kit";
import { Container } from "@material-ui/core";
import { Button, Image, Segment, Grid, Header } from "semantic-ui-react";
import Moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import Default from "../../assets/images/Default.png";
// import SingleTaskModal from "./single_task_modal";
class SingleTask extends Component {
  state = {
    task: "",
    users: [],
    redirectToHome: false,
    redirectToSignin: false,
    loading: true,
    comments: []
  };

  componentDidMount = () => {
    Axios.get(`${constants}/api/v1/users`)
      .then(res => this.setState({ users: res.data, loading: false }))
      .catch(err => console.log(err));

    const taskId = this.props.match.params.taskId;
    const token = localStorage.getItem("jwtToken");
    fetchTask(taskId, token)
      .then(data => {
        this.setState({
          task: data.data.task,
          comments: data.data.task.comments
        });
      })
      .catch(err => console.log(err));
  };

  updateComments = comments => {
    this.setState({ comments });
  };

  deleteConfirmed = id => {
    let answer = window.confirm("Are you sure you want to delete this task?");
    if (answer) {
      // deleteTheTask = id => {
      deleteTask(id).then(data => {
        if (data.error) {
          console.log(data.error);
        } else return (window.location.href = "/");
      });
    }
  };

  renderTask = task => {
    let user = Object.assign({},task.userId)
    return (
      <>
        <div>
          {/* {users.map(user => { */}
            {/* return ( */}
              <>
                <Container style={taskcontainer}>
                  <Header as="h2" textAlign="center">
                    Task Feed
                  </Header>
                  <Grid celled>
                    <Grid.Row>
                      <Grid.Column width={3}>
                        <Segment>
                          <Image
                            alt="avatar"
                            size="small"
                            src={
                              `${constants}/api/photo/${user._id}`
                                ? `${constants}/api/photo/${user._id}`
                                : Default
                            }
                            onError={i => {
                              i.target.src = `${Default}`;
                            }}
                          />
                        </Segment>
                      </Grid.Column>
                      <Grid.Column width={13}>
                        <Segment style={{ height: "220px" , overflow : 'auto'}}>
                          <p>
                            <span style={{ color: "blue" }}>Title</span> :{" "}
                            {task.name}
                          </p>
                          <p>
                            {" "}
                            <span style={{ color: "blue" }}>
                              Description
                            </span> : {task.description}
                          </p>
                          <p>
                            <span style={{ color: "blue" }}> Deadline </span>:{" "}
                            {`Finish by: ${Moment(task.deadline)
                              .utc()
                              .format("MMMM Do, YYYY")}`}
                          </p>
                          <p>
                            <span style={{ color: "blue" }}>Phase </span>:{" "}
                            {task.phase ? task.phase : "no phase"}
                          </p>
                          <p>
                            <span style={{ color: "blue" }}>
                              Submitted ?
                            </span>{" "}
                            : {task.completed === true ? "Yes" : "no"}
                          </p>
                          <p>
                            <span style={{ color: "blue" }}>
                              Confirmed By admin ?
                            </span>{" "}
                            : {task.isConfirmed === true ? "Yes" : "no"}
                          </p>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Segment>
                    <Avatar
                      style={{ float: "right" }}
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
                    <Button
                      style={{ float: "right" }}
                      onClick={() => this.deleteConfirmed(task._id)}  
                    >
                      Delete
                    </Button>
                    <p>Asigned To : {user.username}</p>
                    <Link to={`/user/${user.id}`}>View profile</Link>
                  </Segment>
                </Container>
              </>
            {/* );
          })} */}
        </div>
      </>
    );
  };
  render() {
    const { task, comments, loading } = this.state;
    return (
      <div>
        {loading ? (
          <div style={{ marginLeft: "46%" }}>
            <GuardSpinner size={50} color="#686769" />
          </div>
        ) : (
          this.renderTask(task)
        )}
        <div style={commentClass}>
          <Comment
            taskId={task._id}
            comments={comments.reverse()}
            updateComments={this.updateComments}
          />
        </div>
      </div>
    );
  }
}

export default SingleTask;
const commentClass = {
  margin: "auto",
  width: "80%",
  border: "3px solid green",
  padding: "10px",
  backgroundColor: "white"
};
const taskcontainer = {
  margin: "auto",
  width: "80%",
  padding: "50px",
  backgroundColor: "khaki"
};
// const modalStyle = {
//   magrin : 'auto'
// }
