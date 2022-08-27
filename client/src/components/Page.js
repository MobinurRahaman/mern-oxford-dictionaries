import { useState, useEffect, createContext, useContext } from "react";
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
  Clear as ClearIcon,
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
    color: "#fff",
  },
  endAdornment: {
    marginRight: 35,
  },
  content: {
    position: "relative",
    width: "100%",
    //height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    //overflow: "auto",
    boxSizing: "border-box",
  },
}));

const SearchTermContext = createContext();

function AsyncSearchSuggestions() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { searchTerm } = useContext(SearchTermContext);

  const [open, setOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [status, setStatus] = useState("idle");
  const [options, setOptions] = useState([]);
  const loading = open && searchInputValue.length > 0 && options;

  const handleChange = (event) => {
    setSearchInputValue(event.target.value);

    if (event.target.value) {
      if (event.keyCode === 13) {
        navigate(`/word/${encodeURIComponent(event.target.value)}`);
      } else {
        setStatus("loading");
        fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/search/${encodeURIComponent(event.target.value)}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.results) {
              setOptions(data.results);
              setStatus("idle");
            } else if (data.limit_error) {
              setStatus("error");
              setTimeout(() => setStatus("idle"), 1000);
              setOpen(false);
              alert(
                "Usage limit exceeded. Contact the admin to get further access."
              );
            } else {
              setStatus("error");
              setTimeout(() => setStatus("idle"), 1000);
            }
          })
          .catch((err) => {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 1000);
          });
      }
    } else {
      setOptions([]);
    }
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
      case "default":
        return null;
    }
  };

  return (
    <Autocomplete
      id="search-field"
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      closeIcon={
        searchInputValue ? (
          <ClearIcon
            onClick={() => {
              setSearchInputValue("");
              setOpen(false);
              setOptions([]);
            }}
          />
        ) : null
      }
      isOptionEqualToValue={(option, value) => option.word === value.word}
      getOptionLabel={(option) => option.word}
      onChange={(event, newValue) => {
        if (newValue) {
          navigate(`/word/${newValue.word ? newValue.word : newValue}`);
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
          autoFocus
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
  );
}

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
              <SearchTermContext.Provider value={{ searchTerm: "reed" }}>
                <AsyncSearchSuggestions />
              </SearchTermContext.Provider>
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
