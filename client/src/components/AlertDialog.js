import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props) {
  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-zoom-title"
        aria-describedby="alert-dialog-zoom-description"
      >
        <DialogTitle id="alert-dialog-zoom-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-zoom-description">
            {props.desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            props.buttons.map((item, index) => {
            return <Button color="primary" onClick={handleClose} key={index}>
              {item}
            </Button>
            })
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
