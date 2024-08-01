import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField, Tooltip } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ClearIcon from "@material-ui/icons/Clear";
import { useAlertDialog } from "../hooks/useAlertDialog";
import useAsyncSearchSuggestionsStyles from "../styles/asyncSearchSuggestionsStyles";

function AsyncSearchSuggestions() {
  const classes = useAsyncSearchSuggestionsStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [status, setStatus] = useState("idle");
  const [options, setOptions] = useState([]);
  const [showAlert, AlertDialogComponent] = useAlertDialog();

  const handleChange = (event) => {
    setSearchInputValue(event.target.value);

    if (event.target.value) {
      if (event.keyCode === 13) {
        navigate(`/definition/?q=${encodeURIComponent(event.target.value)}`);
      } else {
        setStatus("loading");
        fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/search/${encodeURIComponent(
            event.target.value
          )}`
        )
          .then((res) => {
            if (!res.ok) {
              // Handle HTTP errors
              return res.json().then((data) => {
                if (data.limit_error) {
                  // Handle limit error
                  setStatus("error");
                  setOpen(false);
                  showAlert(
                    "Usage limit exceeded",
                    "Contact the admin to get further access."
                  );
                } else {
                  // Handle other types of server errors
                  setStatus("error");
                  showAlert(
                    "Server error",
                    "Error occured while fetching data from the server."
                  );
                }
                throw new Error("Server error");
              });
            }
            return res.json();
          })
          .then((data) => {
            if (data.results) {
              setOptions(data.results);
              setStatus("idle");
            } else {
              // Handle unexpected response data
              setStatus("error");
              setTimeout(() => setStatus("idle"), 1000);
              showAlert(
                "Unexpected response",
                "Unexpected response from server"
              );
            }
          })
          .catch((err) => {
            // Handle network errors or other issues
            setStatus("error");
            setTimeout(() => setStatus("idle"), 1000);
            showAlert(
              "Server error",
              "Error occured while fetching data from the server."
            );
          });
      }
    } else {
      setOptions([]);
    }
  };

  const isTouchDevice = () => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };

  const EndAdornment = () => {
    switch (status) {
      case "loading":
        return (
          <CircularProgress
            className={classes.endAdornment}
            color="inherit"
            size={20}
          />
        );
      case "error":
        return <ErrorOutlineIcon className={classes.endAdornment} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Autocomplete
        id="search-field"
        className={classes.autocomplete}
        fullWidth
        open={open}
        clearText=""
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        closeIcon={
          searchInputValue ? (
            <Tooltip title="Clear">
              <ClearIcon
                onClick={() => {
                  setSearchInputValue("");
                  setOpen(false);
                  setOptions([]);
                }}
              />
            </Tooltip>
          ) : null
        }
        isOptionEqualToValue={(option, value) => option.word === value.word}
        getOptionLabel={(option) => option.word}
        onChange={(event, newValue) => {
          if (newValue) {
            navigate(
              `/definition/?q=${newValue.word ? newValue.word : newValue}`
            );
          }
        }}
        onBlur={() => setStatus("idle")}
        noOptionsText={searchInputValue ? "No results found" : ""}
        options={options}
        loading={status !== "idle" ? true : false}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            type="search"
            autoFocus={!isTouchDevice()}
            placeholder="Enter search term here"
            variant="standard"
            onKeyUp={handleChange}
            InputProps={{
              ...params.InputProps,
              className: classes.input,
              disableUnderline: true,
              endAdornment: (
                <>
                  <EndAdornment />
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <AlertDialogComponent />
    </>
  );
}

export default AsyncSearchSuggestions;
