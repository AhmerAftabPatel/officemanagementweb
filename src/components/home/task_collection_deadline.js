import React from "react";
import Moment from "moment";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import Default from "../../assets/images/Default.png";
import { constants } from "../../constants";

/**
 * @author
 * @function TaskCollectionDeadline
 **/

const TaskCollectionDeadline = props => {
  const tasks = props.tasks;
  let today = new Date();
  let date = today.getDate();
  return (
    <>
      <div className="task-card-container">
        {tasks.map((task, index) => {
          if (
            Moment(task.deadline).utc().format("D") - date <= 2 &&
            task.completed === false
          ) {
            return (
              <div className="task-card" key={index}>
                <div
                  className="face face1"
                  style={{
                    borderStyle: "solid",
                    borderWidth: "7px",
                    borderColor:
                      task.dummy === "code"
                        ? "blue"
                        : "" || task.dummy === "design"
                        ? "green"
                        : "" || task.dummy === "research"
                        ? "red"
                        : ""
                  }}
                >
                  <div className="content">
                    <div className="avatar mx-auto">
                      <Image
                        alt="avatar"
                        size="mini"
                        src={
                          `${constants}/api/photo/${task.userId}`
                            ? `${constants}/api/photo/${task.userId}`
                            : Default
                        }
                        onError={i => {
                          i.target.src = `${Default}`;
                        }}
                        className="rounded-circle"
                      />
                    </div>
                    <i
                      class="fa fa-exclamation"
                      style={{ color: "red", float: "left" }}
                      aria-hidden="true"
                    ></i>
                    <h3>comments : {task.comments.length}</h3>
                    <h3>{task.name}</h3>
                  </div>
                </div>
                <div className="face face2">
                  <div className="content">
                    <p
                      style={{
                        overflow: "hidden",
                        width: "200px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {" "}
                      {task.description}
                    </p>
                    <Link to={`/task/${task._id}`}>
                      <div className="adduser">
                        <Button>
                          <span>Read More</span>
                        </Button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};

export default TaskCollectionDeadline;
