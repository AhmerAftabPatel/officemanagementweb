import React from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import { constants } from "../../constants";
import Default from "../../assets/images/Default.png";

/**
 * @author
 * @function TaskCollectionDeadline
 **/

const AllTaskCollection = props => {
  const tasks = props.tasks;
  return (
    <>
      <div className="task-card-container">
        {tasks.map((task, index) => {
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
                <div className="row">
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
                  &nbsp;&nbsp;&nbsp;
                  <div className="content" style={{ margin: "auto" }}>
                    {/* <div className="avatar mx-auto"> */}

                    {/* </div> */}
                    <h3>comments : {task.comments.length}</h3>
                    <h3>Title : {task.name}</h3>
                    <h3>Phase : {task.phase}</h3>
                  </div>
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
                        <span color="blue">Read More</span>
                      </Button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllTaskCollection;
