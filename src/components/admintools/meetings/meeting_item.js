import React, { useContext } from "react";
import PropTypes from "prop-types";
import MeetingContext from "./meeting_context";
import { constants } from "../../../constants";
import { Dropdown, Button, Modal, Header } from "semantic-ui-react";
function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}
const MeetingItem = ({ meeting, type, showChildrenDrawer }) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined
  });
  const { open, dimmer } = state;
  const meetingContext = useContext(MeetingContext);
  const { deleteMeeting, setCurrent, clearCurrent } = meetingContext;

  const {
    _id,
    name,
    hostedby,
    meetingdate,
    meetingtime,
    description,
    attendees,
    addinsight
  } = meeting;
  console.log(addinsight);
  let userOptions = [];
  attendees.forEach(user => {
    userOptions.push({ text: user });
  });

  const onDelete = () => {
    deleteMeeting(_id);
    clearCurrent();
  };
  const editButtonClicked = () => {
    showChildrenDrawer()
    setCurrent(meeting)
  }

  return (
    <div className="card light">
      <h3 className="text-primary">
        Hostedby :{" "}
        <iframe
          // type="text/html"
          title="none"
          src={
            hostedby
              ? `${constants}/api/v1/user/username/${hostedby}`
              : "no name"
          }
          width="80px"
          height="23px"
          scrolling="no"
          frameBorder="0"
        />
        {/* <span
          style={{ float: "right" }}
          className={
            "badge primary " +
            (type === "professional" ? "text-success" : "text-light")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span> */}
      </h3>
      <div>
        {/* {email && (
          <p>
            <i className="fas fa-envelope-open badge primary" /> {email}
          </p>
        )}
        {phone && (
          <p>
            <i className="fas fa-phone badge primary" /> {phone}
          </p>
        )} */}
        {name && (
          <p>
            <i className="fas fa-pen badge primary" /> Topic :{name}
          </p>
        )}
        {description && (
          <p>
            <i className="fas fa-pen badge primary" /> Description :
            {description}
          </p>
        )}

        {meetingdate && (
          <p>
            <i className="fas fa-calendar-alt badge primary" /> Date :
            {meetingdate}
          </p>
        )}
        {meetingtime && (
          <p>
            <i className="fas fa-clock badge primary" />
            Time : {meetingtime}
          </p>
        )}
      </div>
      <div>
        {/* <Button onClick={() => dispatch({ type: "OPEN_MODAL" })}>
          Default
        </Button>
        <Button
          onClick={() => dispatch({ type: "OPEN_MODAL", dimmer: "inverted" })}
        >
          Inverted
        </Button> */}
        <Button
          onClick={() => dispatch({ type: "OPEN_MODAL", dimmer: "blurring" })}
        >
          View Insights
        </Button>

        <Modal
          dimmer={dimmer}
          open={open}
          style={{
            width: "50%",
            height: "100%",
            marginLeft: "23%",
            marginTop: "5%",
            overflow: "auto"
          }}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
        >
          <Modal.Header>
            This Meeting was hosted by{" "}
            {
              <iframe
                // type="text/html"
                title="none"
                src={
                  hostedby
                    ? `${constants}/api/v1/user/username/${hostedby}`
                    : "no name"
                }
                width="80px"
                height="23px"
                scrolling="no"
                frameBorder="0"
              />
            }
          </Modal.Header>
          <Modal.Content>
            {/* <div>{attendees}&nbsp;</div> */}
            <b>Meeting Description : </b>
            {description} <br />
            <b>Date :</b> {meetingdate}
            <br />
            <b>Time :</b> {meetingtime}
          </Modal.Content>
          <hr />
          <Modal.Content>
            <Header as="h2" textAlign="center">
              Insights
            </Header>
            <hr />
            {addinsight.map(insight => {
              return (
                <div>
                  <b>{insight.text} </b>&nbsp; &nbsp; &nbsp; &nbsp;{" "}
                  <span style={{ color: "green", float: "right" }}>
                    Posted by{" "}
                    {
                      <iframe
                        // type="text/html"
                        title="none"
                        src={
                          hostedby
                            ? `${constants}/api/v1/user/username/${insight.postedBy}`
                            : "no name"
                        }
                        width="80px"
                        height="23px"
                        scrolling="no"
                        frameBorder="0"
                      />
                    }
                  </span>
                  <hr />
                </div>
              );
            })}
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
              Close
            </Button>
            {/* <Button positive onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
              Agree
            </Button> */}
          </Modal.Actions>
        </Modal>
      </div>
      <p>
        {type === "homePage" ? (
          <Button type="primary" onClick={() => editButtonClicked()}>
            Edit
          </Button>
        ) : (
          <button
            className="btn dark btn-sm"
            onClick={() => setCurrent(meeting)}
          >
            Edit
          </button>
        )}

        <button className="btn danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
      <p style={{ textAlign: "center" }}>
        <label>Attendees</label>
      </p>
      <Dropdown
        placeholder="Attendees"
        selection
        search
        options={userOptions}
      />
    </div>
  );
};

MeetingItem.propTypes = {
  meeting: PropTypes.object.isRequired
};

export default MeetingItem;
