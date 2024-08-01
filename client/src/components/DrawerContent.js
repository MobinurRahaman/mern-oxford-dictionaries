import React from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Switch,
} from "@material-ui/core";
import {
  Home as HomeIcon,
  History as HistoryIcon,
  Star as StarIcon,
  Receipt as ReceiptIcon,
  Brightness3 as Brightness3Icon,
} from "@material-ui/icons";
import useDrawerContentStyles from "../styles/drawerContentStyles";
import { DarkModeContext } from "../contexts/DarkModeContext";

function DrawerContent() {
  const classes = useDrawerContentStyles();
  const navigate = useNavigate();
  const { darkMode, setDarkModePersistantly } =
    React.useContext(DarkModeContext);

  return (
    <div className={classes.drawerContent}>
      <List aria-label="menu">
        <ListItem button onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => navigate("/history")}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button onClick={() => navigate("/bookmarks")}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Bookmarks" />
        </ListItem>
      </List>
      <Divider />
      <List aria-label="misc">
        <ListItem button onClick={() => navigate("/privacy-policy")}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Privacy policy" />
        </ListItem>
      </List>
      <Divider />
      <List aria-label="settings">
        <ListItem>
          <ListItemIcon>
            <Brightness3Icon />
          </ListItemIcon>
          <ListItemText primary="Dark mode" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              color="primary"
              checked={darkMode}
              onChange={() => setDarkModePersistantly(!darkMode)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}

export default DrawerContent;
