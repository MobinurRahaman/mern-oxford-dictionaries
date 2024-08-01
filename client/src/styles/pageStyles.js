import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const usePageStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiAutocomplete-clearIndicator": {
      color: "#fff",
    },
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  main: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  header: {
    flex: 1,
  },
  centeredTitle: {
    textAlign: "center",
  },
  content: {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
  },
}));

export default usePageStyles;
