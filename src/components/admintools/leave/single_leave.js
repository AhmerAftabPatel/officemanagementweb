import React, { useEffect, useState } from "react";
import Default from "../../../assets/images/Default.png";
import { Image } from "semantic-ui-react";
import { constants } from "../../../constants";
import { fetchleavesById, updateleave } from "../../../util/leave_api_util";
// import Base from "../../base/base";
import { Redirect } from "react-router-dom";
import moment from "moment";

/**
 * @author
 * @function SingleLeave
 **/

const SingleLeave = props => {
  const [leaves, setLeaves] = useState([]);
  const [name, setName] = useState({
    approvalStatus: ""
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  //   const { user, token } = isAuthenticated();
  // const { leaveId } = props.match.params;

  const token = localStorage.getItem("jwtToken");
  const preload = () => {
    fetchleavesById(props.leaveId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLeaves(data.data.leave);

        if (data.data.leave.approvalStatus === "declined") {
          setName({ approvalStatus: "granted" });
        } else {
          setName({ approvalStatus: "declined" });
        }
      }
    });
  };
  useEffect(() => {
    preload();
    // eslint-disable-next-line
  }, []);
  const onSubmit = event => {
    event.preventDefault();

    //backend req fired
    updateleave(props.leaveId, name, token).then(data => {
      if (data.error) {
        setName({ ...name, error: data.error });
        setError(true);
        props.onclose();
        window.location.href("/admin/leaves");
      } else {
        setName({
          ...name,
          name: data
        });

        setSuccess(true);
      }
    });
  };

  const successMessage = () => {
    if (success === true && name.approvalStatus === "granted") {
      return (
        <>
          <h4 className="text-success">granted permission successfully</h4>
          <i
            class="fa fa-check fa-3x"
            style={{ marginLeft: "150px", color: "green" }}
          ></i>
          <Redirect to="/admin/leaves"></Redirect>{" "}
        </>
      );
    } else if (success === true && name.approvalStatus === "declined") {
      return (
        <>
          <h4 className="text-danger">leave declined</h4>
          <i
            class="fa fa-times fa-4x"
            style={{ marginLeft: "150px", color: "red" }}
          ></i>
          {}
          <Redirect to="/admin/leaves" delay="30"></Redirect>{" "}
        </>
      );
    }
  };
  // const ggwp = () => {
  //   return (
  //     <h5>
  //       <span style={h5style}>Status : &nbsp; &nbsp; </span> &nbsp;
  //       {leaves.approvalStatus === "declined" ? (
  //         <i className="fa fa-times fa-4x" style={{ color: "red" }}></i>
  //       ) : (
  //         <i className="fa fa-check fa-3x" style={{ color: "green" }}></i>
  //       )}
  //     </h5>
  //   );
  // };
  const errorMessage = () => {
    if (error === true) {
      return <h4 className="text-warning">some problem occured</h4>;
    }
  };
  let buttonText =
    leaves.approvalStatus === "granted" ? "Decline" : "Grant Permission";
  return (
    <div style={{ textAlign: "center" }}>
      {successMessage()}
      {errorMessage()}
      <Image
        floated="right"
        size="small"
        // name={`${constants}/api/v1/user/username/${leaves.requestedBy}`}
        src={
          leaves.requestedBy
            ? // requestedBy later
              `${constants}/api/photo/${leaves.requestedBy}`
            : Default
        }
      />
      <h5>
        <span style={h5style}>RequestedBy :</span>
        <iframe
          type="text/html"
          title="none"
          src={
            leaves.requestedBy
              ? `${constants}/api/v1/user/username/${leaves.requestedBy}`
              : "no name"
          }
          width="80px"
          height="23px"
          scrolling="no"
          frameBorder="0"
        />
      </h5>

      <h5>
        <span style={h5style}>Type : </span> {leaves.leaveType}
      </h5>
      <h5>
        <span style={h5style}>Description : </span> {leaves.description}
      </h5>
      <h5>
        <span style={h5style}>from : </span>{" "}
        {moment(leaves.date).format("MMMM Do YYYY")}
        &nbsp; &nbsp;
        <span style={h5style}>to : </span> {leaves.enddate}
      </h5>
      {/* {ggwp()} */}

      <div>
        <button
          // style={{ width: "250px" }}
          className="btn btn-outline-info"
          onClick={onSubmit}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
  // );
};

export default SingleLeave;
const h5style = {
  color: "black",
  fontWeight: "bold"
};
