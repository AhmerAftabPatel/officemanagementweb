import React from "react";
import Default from "../../assets/images/Default.png";
import { Link } from "react-router-dom";
import { constants } from "../../constants";

/**
 * @author
 * @function CodeEngine
 **/

const UserCollection = props => {
  const user = props.user;
  const i = props.i;
  return (
    <>
      <div key={i} className="col-md-3">
        <div className="card testimonial-card">
          <div className="card-up indigo lighten-1"></div>
          <div className="avatar mx-auto white">
            <img
              alt="avatar"
              style={{ height: "128px" }}
              src={user.id ? `${constants}/api/photo/${user.id}` : Default}
              onError={i => {
                i.target.src = `${Default}`;
              }}
              className="rounded-circle"
            />
          </div>
          <div className="card-body">
            <h4
              className="card-title"
              style={{
                overflow: "hidden",
                width: "200px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis"
              }}
            >
              {user.username}
            </h4>
            <hr />
            <p>Engine: {user.category}</p>
            <Link to={`/user/${user.id}`}>View Profile</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCollection;
