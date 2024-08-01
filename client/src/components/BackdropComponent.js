import PropTypes from "prop-types";
import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import useBackdropStyles from "../styles/backdropStyles";

export default function BackdropComponent({ isLoading }) {
  const classes = useBackdropStyles();

  return (
    <Backdrop className={classes.backdrop} open={isLoading} onClick={() => {}}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

BackdropComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
