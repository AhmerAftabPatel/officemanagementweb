import React from "react";
import { Image, Message, Button, Icon } from "semantic-ui-react";
import { constants } from "../../constants";
import { confirmTask } from "../../util/task_api_util";
import { CSSTransition, TransitionGroup } from "react-transition-group";

/**
 * @author
 * @function Notifications
 **/

const Notifications = props => {
  const confirm = { isConfirmed: true };
  const tasks = props.tasks;
  const UpdateTask = id => {
    confirmTask(id, confirm).then((data, err) => {
      if (data.error) {
        console.log(err);
      } else {
        props.onclickTask();
      }
    });
  };
  const ViewTaskCLicked = id => {
    props.history.push(`/task/${id}`);
  };
  return (
    <div>
      <TransitionGroup>
        {tasks.map(task => {
          if (task.completed === true) {
            return (
              <CSSTransition key={task._id} timeout={500} classNames="item">
                <Message
                  icon
                  className="animate__animated animate__fadeOutLeftBig"
                >
                  <Image
                    size="mini"
                    src={`${constants}/api/photo/${task.userId}`}
                  />
                  <Message.Content>
                    <Message.Header>{task.name}</Message.Header>
                    {task.description}
                  </Message.Content>

                  <Icon
                    style={{ cursor: "pointer" }}
                    className="eye"
                    onClick={() => ViewTaskCLicked(task._id)}
                  />
                  <Button onClick={() => UpdateTask(task._id)}>Confirm</Button>
                </Message>
              </CSSTransition>
            );
          } else return null;
        })}
      </TransitionGroup>
    </div>
  );
};

export default Notifications;
