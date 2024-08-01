import React from "react";
import PropTypes from "prop-types";
import { List, Divider } from "@material-ui/core";
import ListItemComponent from "./ListItemComponent";
import useListContainerStyles from "../styles/listContainerStyles";

function ListContainer({ items, onItemClick, onItemRemove }) {
  const classes = useListContainerStyles();

  return (
    <List aria-label="items" className={classes.list}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Divider />
          <ListItemComponent
            item={item}
            onClick={() => onItemClick(item.wordId)}
            onRemove={() => onItemRemove(item.wordId)}
          />
        </React.Fragment>
      ))}
    </List>
  );
}

ListContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onItemClick: PropTypes.func.isRequired,
  onItemRemove: PropTypes.func.isRequired,
};

export default ListContainer;
