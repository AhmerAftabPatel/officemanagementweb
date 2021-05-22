import React from "react";

/**
 * @author
 * @function Base
 **/

const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-transparent text-white",
  children
}) => {
  return (
    <div>
      {/* <header className="home-page-header">
        <NavBarContainer />
      </header> */}
      <div className="container-fluid base">
        <div className="jumbotron bg-transparent text-white text-center base-text">
          <h1 className="display-5">{title}</h1>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Base;
