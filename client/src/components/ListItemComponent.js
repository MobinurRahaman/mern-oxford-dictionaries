import React from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemText,
  ButtonBase,
  IconButton,
} from "@material-ui/core";
import { Clear as ClearIcon } from "@material-ui/icons";
import useListItemStyles from "../styles/listItemStyles";

function ListItemComponent({ item, onClick, onRemove }) {
  const classes = useListItemStyles();

  return (
    <ListItem className={classes.listItem}>
      <ButtonBase className={classes.buttonBase} onClick={onClick}>
        <ListItemText primary={item.word} className={classes.listItemText} />
      </ButtonBase>
      <div className={classes.iconButtonContainer}>
        <IconButton onClick={onRemove}>
          <ClearIcon />
        </IconButton>
      </div>
    </ListItem>
  );
}

ListItemComponent.propTypes = {
  item: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ListItemComponent;
