import { makeStyles } from "@material-ui/core/styles";

const useSpeechRecognitionModalStyles = makeStyles((theme) => ({
  speechRecognitionModal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  speechRecognitionModalBody: {
    width: "90%",
    maxWidth: 500,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
  },
  transcript: {
    textAlign: "center",
  },
}));

export default useSpeechRecognitionModalStyles;
