import React, { Component } from "react";
// import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../actions/user_actions";
import Default from "../../assets/images/Default.png";
import { constants } from "../../constants";
import { comment, uncomment } from "../../util/task_api_util";

class Comment extends Component {
  state = {
    text: "",
    error: ""
  };

  handleChange = event => {
    this.setState({ error: "" });
    this.setState({ text: event.target.value });
  };

  isValid = () => {
    const { text } = this.state;
    if (!text.length > 0 || text.length > 150) {
      this.setState({
        error: "Comment should not be empty and less than 150 characters long"
      });
      return false;
    }
    return true;
  };

  addComment = e => {
    e.preventDefault();
    const userId = isAuthenticated().id;
    const taskId = this.props.taskId;
    // const token = localStorage.getItem("jwtToken");

    if (this.isValid()) {
      comment(userId, taskId, { text: this.state.text }).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ text: "" });
          this.props.updateComments(data.comments);
        }
      });
    }
  };

  deleteComment = comment => {
    const userId = isAuthenticated().id;
    const taskId = this.props.taskId;
    const comId = comment._id;
    uncomment(userId, taskId, comId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.props.updateComments(data.comments);
      }
    });
  };

  deleteConfirmed = comment => {
    let answer = window.confirm(
      "Are you sure you want to delete your comment?"
    );
    if (answer) {
      this.deleteComment(comment);
    }
  };

  render() {
    const { comments } = this.props;
    const { error } = this.state;
    return (
      <div className="comment-section">
        <h2 className="mt-5 mb-5">Discussion</h2>

        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.text}
              className="form-control"
              placeholder="Leave a comment..."
            />
            <button className="btn btn-raised btn-success mt-2">Post</button>
          </div>
        </form>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div className="col-md-12">
          <h3 className="text-primary">{comments.length} Threads</h3>
          <hr />
          {comments.map((comment, i) => (
            <div key={i}>
              <div>
                <Link to={`/user/${comment.postedBy}`}>
                  <img
                    style={{
                      borderRadius: "50%",
                      border: "1px solid black"
                    }}
                    className="float-left mr-2"
                    height="30px"
                    width="30px"
                    onError={i => (i.target.src = `${Default}`)}
                    src={comment.postedBy ? `${constants}/api/photo/${Object.assign({},comment.postedBy)._id}` : Default}
                    alt={comment.postedBy.fname}
                  />
                </Link>
                <div>
                  <p className="lead">{comment.text}</p>
                  <p className="font-italic mark">
                    Posted by{" "}
                    <Link to={`/user/${Object.assign({},comment.postedBy)._id}`}>
                      {console.log(comment.postedBy)}
                      {Object.assign({},comment.postedBy).username}
                         
                    </Link>{" "}
                    on {new Date(comment.created).toDateString()}{" "}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Comment;
