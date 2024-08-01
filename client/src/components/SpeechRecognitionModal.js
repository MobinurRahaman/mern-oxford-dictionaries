import PropTypes from "prop-types";
import React from "react";
import { Backdrop, Modal, Typography } from "@material-ui/core";
import useSpeechRecognitionModalStyles from "../styles/speechRecognitionModalStyles";
import animationData from "../lotties/19246-voice.json";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function SpeechRecognitionModal({
  open,
  onClose,
  onBackdropClick,
  transcript,
}) {
  const classes = useSpeechRecognitionModalStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      onBackdropClick={onBackdropClick}
      className={classes.speechRecognitionModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.speechRecognitionModalBody}>
        <Typography variant="h6" gutterBottom>
          Listening...
        </Typography>
        <Lottie options={defaultOptions} height={120} width={200} />
        <Typography className={classes.transcript} variant="subtitle1">
          {transcript}
        </Typography>
      </div>
    </Modal>
  );
}

SpeechRecognitionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onBackdropClick: PropTypes.func.isRequired,
  transcript: PropTypes.string.isRequired,
};

export default SpeechRecognitionModal;
