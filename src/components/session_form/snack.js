import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const SessionSnack = props => {
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      id="success"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={props.open ? props.open : open}
      autoHideDuration={1}
      onClose={handleClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={
        <div id="message-id">
          <CheckCircleIcon id="check-icon" />
          <div>Success</div>
        </div>
      }
    />
  );
};

export default SessionSnack;
