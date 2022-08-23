import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Drawer,
  SwipeableDrawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  TextField,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon,
  Mic as MicIcon,
  Home as HomeIcon,
  History as HistoryIcon,
  Star as StarIcon,
  Receipt as ReceiptIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@material-ui/icons";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import searchResults2 from "../data/search-results.json";
import animationData from "../lotties/14634-voicemate.json";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  accordion: {
    border: "none",
    boxShadow: "none",
  },
  list: {
    flex: 1,
  },
  listIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
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
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  header: {
    flex: 1,
  },
  centeredTitle: {
    textAlign: "center",
  },
  input: {
    color: "white",
  },
  content: {
    position: "relative",
    width: "100%",
    //height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    //overflow: "auto",
    boxSizing: "border-box",
  },
  input: {
    color: "#fff",
  },
}));

const filter = createFilterOptions();

function FreeSoloCreateOption() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [state, setState] = useState("idle");
  const [value, setValue] = useState(null);
  const [searchResults, setSearchResults] = useState({});
  const [open, setOpen] = useState(false);

  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      navigate(`/word/${encodeURIComponent(event.target.value)}`);
    }
  };

  const EndAdornment = () => {
    switch (state) {
      case "loading":
        return <CircularProgress color="inherit" size={20} />;
      case "error":
        return <ErrorOutlineIcon />;
      case "default":
        return <></>;
    }
  };

  const searchTerm = "aqu";
  useEffect(() => {
    setState("loading");
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/search/${searchTerm}`)
      .then((res) => res.json())
      .then((json) => {
        setSearchResults(json);
        setState("loaded");
      })
      .catch(() => {
        setState("error");
        setTimeout(() => {
          setState("idle");
        }, 1000);
      });
  }, [value]);

  useEffect(() => {
    if (!open) {
      setSearchResults({});
    }
  }, [open]);

  return (
    <Autocomplete
      value={value}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
        if (newValue) navigate(`/word/${newValue.word}`);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        /*if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: "No results found",
          });
        }*/

        return filtered;
      }}
      //selectOnFocus
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={searchResults2.results}
      loading={state === "loaded" ? false : true}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.word;
      }}
      renderOption={(option) => option.word}
      style={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          type="search"
          color="primary"
          autoFocus
          placeholder="Enter search term here"
          variant="standard"
          onKeyUp={handleSearch}
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
  );
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Page(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(false);

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useEffect(() => {
    listening ? setModalOpen(true) : setModalOpen(false);
  }, [listening]);

  useEffect(() => {
    if (finalTranscript.trim()) {
      setSearchValue(finalTranscript);
      navigate(`/word/${encodeURI(finalTranscript)}`);
    }
  }, [finalTranscript]);

  const { window } = props;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
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
        <Divider />
        <ListItem button onClick={() => navigate("/privacy-policy")}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Privacy policy" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {props.backBtn && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="go back"
              onClick={() => window.history.back()}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          {!props.noDrawer && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className={classes.menuButton}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            noWrap
            variant="h6"
            className={`${classes.header} ${
              props.centeredTitle && classes.centeredTitle
            }`}
          >
            {props.title}
          </Typography>
          {props.searchField && (
            <>
              <FreeSoloCreateOption />
              <div className={classes.rightBtns}>
                {!props.noRightBtns && (
                  <>
                    <IconButton
                      edge="end"
                      color="inherit"
                      aria-label="voice search"
                      onClick={SpeechRecognition.startListening}
                    >
                      <MicIcon />
                    </IconButton>
                  </>
                )}
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {!props.noDrawer && (
        <nav className={classes.drawer} aria-label="category browser">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden mdUp implementation="css">
            <SwipeableDrawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onOpen={handleDrawerToggle}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </SwipeableDrawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <div
          className={classes.content}
          style={{ padding: props.noPadding ? 0 : theme.spacing(1) }}
        >
          {props.children}
        </div>
      </main>
    </div>
  );
}

Page.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Page;
