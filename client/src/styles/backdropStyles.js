import { makeStyles } from "@material-ui/core/styles";

const useBackdropStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    backgroundColor: "#000",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default useBackdropStyles;
