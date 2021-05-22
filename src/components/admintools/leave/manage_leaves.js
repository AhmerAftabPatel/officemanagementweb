import React, { useEffect, useState } from "react";
import { constants } from "../../../constants";
import { fetchleaves } from "../../../util/leave_api_util";
import Base from "../../base/base";
import { Button, Card, Image, Modal } from "semantic-ui-react";
import Default from "../../../assets/images/Default.png";
import SingleLeave from "./single_leave";

/**
 * @author
 * @function ManageLeaves
 **/

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
const ManageLeaves = props => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined
  });
  const { open, dimmer } = state;
  const [leaves, setLeaves] = useState([]);
  //   const { user, token } = isAuthenticated();

  const preload = () => {
    const token = localStorage.getItem("jwtToken");
    fetchleaves(token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLeaves(data.data.leaves);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);
  return (
    <>
      <Base title="Manage Leaves" description="Manage Agents Leaves">
        <div className="leave-container">
          {leaves.map((leave, index) => {
            return (
              <div className="leave-page">
                <Card.Group>
                  <Card key={index}>
                    <Card.Content style={{ color: "white" }}>
                      <Image
                        floated="right"
                        size="mini"
                        name="ahmer"
                        src={
                          `${constants}/api/photo/${leave.requestedBy}`
                            ? `${constants}/api/photo/${leave.requestedBy}`
                            : Default
                        }
                      />

                      <Card.Header header={"name"}>
                        {/* <p> */}
                        <iframe
                          title="none"
                          src={`${constants}/api/v1/user/username/${leave.requestedBy}`}
                          width="100px"
                          height="55px"
                          frameBorder="0"
                        ></iframe>
                        {/* </p> */}
                      </Card.Header>
                      <Card.Meta>{leave.leaveType}</Card.Meta>
                      <Card.Description>
                        <strong>
                          {leave.description
                            ? leave.description
                            : "no description"}
                        </strong>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        {/* <Link to={`/admin/leaves/${leave._id}`}>
                        <Button color="green">View</Button>
                      </Link> */}
                        <Button
                          onClick={() =>
                            dispatch({ type: "OPEN_MODAL", dimmer: "blurring" })
                          }
                        >
                          View
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
                          <SingleLeave
                            leaveId={leave._id}
                            onclose={() => dispatch({ type: "CLOSE_MODAL" })}
                          />
                        </Modal>
                        <Button
                          color={
                            leave.approvalStatus === "declined"
                              ? "orange"
                              : "teal"
                          }
                        >
                          <span style={{ paddingRight: "5px" }}>status</span>
                          {leave.approvalStatus === "declined" ? (
                            <i
                              className="fa fa-times fa-1x"
                              style={{ color: "red" }}
                            ></i>
                          ) : (
                            <i
                              className="fa fa-check fa-1x"
                              style={{ color: "green" }}
                            ></i>
                          )}
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </div>
            );
          })}
        </div>
      </Base>
    </>
  );
};

export default ManageLeaves;
