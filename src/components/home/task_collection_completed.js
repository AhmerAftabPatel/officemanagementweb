import React from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import { constants } from "../../constants";
import Default from "../../assets/images/Default.png";

/**
 * @author
 * @function TaskCollectionDeadline
 **/

const CompletedTaskCollection = props => {
  const tasks = props.tasks;

  return (
    <>
      <div className="task-card-container">
        {tasks.map((task, index) => {
          if (task.completed === true) {
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
                    <h3>comments :{task.comments.length}</h3>
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

export default CompletedTaskCollection;
