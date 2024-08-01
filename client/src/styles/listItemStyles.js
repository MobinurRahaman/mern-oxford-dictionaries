import { makeStyles } from "@material-ui/core/styles";

const useListItemStyles = makeStyles((theme) => ({
  listItem: {
    margin: 0,
    padding: 0,
    alignItems: "stretch",
  },
  buttonBase: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  listItemText: {
    padding: "0 10px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  iconButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useListItemStyles;
