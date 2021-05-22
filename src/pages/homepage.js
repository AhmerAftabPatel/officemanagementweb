import React from "react";
import TaskIndexContainer from "../components/task/task_index_container";
import TaskCollection from "../components/home/TaskCollection";
// import Base from "../components/base/base";
import PresentUsers from "../components/home/present_users";
import { isAuthenticated } from "../actions/user_actions";

const HomePage = (props) => {
  return (
    <div className ="home-page-main">
      {isAuthenticated() && isAuthenticated().role === 1 ? (
        <div className="present-users">
          <PresentUsers />
        </div>
      ) : (
        ""
      )}
      <div
        title={isAuthenticated().username}
        description="Welcome to the world of moments"
        className="container-fluid base"
      >
        <div className="home-page container p-0">
          <TaskIndexContainer history = {props.history}/>
        </div>

        <hr className="solid" />
        {isAuthenticated() && isAuthenticated().role === 1 && (
          <div className="completed-tasks">
            <TaskCollection tasks = {props.tasks}/>
          </div>
        )}
      </div>
    </div>
  );
  // }
};

export default HomePage;
