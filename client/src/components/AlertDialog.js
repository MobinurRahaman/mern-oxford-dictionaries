import PropTypes from "prop-types";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Zoom from "@material-ui/core/Zoom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ isOpen, setOpen, title, desc }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-zoom-title"
      aria-describedby="alert-dialog-zoom-description"
    >
      <DialogTitle id="alert-dialog-zoom-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-zoom-description" component="pre">
          {desc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string,
  desc: PropTypes.string.isRequired,
};
