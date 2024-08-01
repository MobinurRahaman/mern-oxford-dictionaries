import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Drawer,
  SwipeableDrawer,
  Hidden,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import {
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon,
  Mic as MicIcon,
} from "@material-ui/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import DrawerContent from "./DrawerContent";
import AsyncSearchSuggestions from "./AsyncSearchSuggestions";
import SpeechRecognitionModal from "./SpeechRecognitionModal";
import usePageStyles from "../styles/pageStyles";
import { SearchTermContext } from "../contexts/SearchTermContext";
import { useAlertDialog } from "../hooks/useAlertDialog";

function Page({
  window,
  title,
  centeredTitle,
  backBtn,
  noRightBtns,
  noDrawer,
  searchField,
  noPadding,
  children,
}) {
  const classes = usePageStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAlert, AlertDialogComponent] = useAlertDialog();

  const { transcript, finalTranscript, listening, isMicrophoneAvailable } =
    useSpeechRecognition();

  const startListening = () => {
    if (isMicrophoneAvailable) {
      SpeechRecognition.startListening();
    } else {
      showAlert(
        "Microphone permission is not available",
        "To enable microphone permission:\n\n" +
          "Chrome:\n" +
          "1. Click the lock icon next to the URL.\n" +
          "2. Find 'Microphone' in the dropdown menu.\n" +
          "3. Select 'Allow'.\n" +
          "4. Refresh the page.\n\n" +
          "Firefox:\n" +
          "1. Click the shield icon next to the URL.\n" +
          "2. Go to 'Permissions'.\n" +
          "3. Find 'Microphone' and select 'Allow'.\n" +
          "4. Refresh the page.\n\n" +
          "Safari:\n" +
          "1. Click Safari in the top menu.\n" +
          "2. Select 'Settings for This Website'.\n" +
          "3. Find 'Microphone' and choose 'Allow'.\n" +
          "4. Refresh the page."
      );
    }
  };

  const stopListening = () => {
    SpeechRecognition.abortListening();
  };

  useEffect(() => {
    listening ? setModalOpen(true) : setModalOpen(false);
  }, [listening]);

  useEffect(() => {
    if (finalTranscript.trim()) {
      navigate(`/definition/?q=${encodeURIComponent(finalTranscript)}`);
    }
  }, [finalTranscript, navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {backBtn && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="go back"
              onClick={() => window.history.back()}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          {!noDrawer && (
            <Tooltip title="Menu">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                className={classes.menuButton}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}

          <Typography
            noWrap
            variant="h6"
            className={`${classes.header} ${
              centeredTitle && classes.centeredTitle
            }`}
          >
            {title}
          </Typography>
          {searchField && (
            <>
              <SearchTermContext.Provider value={{ searchTerm: "" }}>
                <AsyncSearchSuggestions />
              </SearchTermContext.Provider>
              <div>
                {!noRightBtns && (
                  <>
                    <Tooltip title="Voice search">
                      <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="voice search"
                        onClick={startListening}
                      >
                        <MicIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </div>
              <SpeechRecognitionModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onBackdropClick={stopListening}
                transcript={transcript}
              />
            </>
          )}
        </Toolbar>
      </AppBar>
      {!noDrawer && (
        <nav className={classes.drawer} aria-label="category browser">
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
              <DrawerContent />
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
              <DrawerContent />
            </Drawer>
          </Hidden>
        </nav>
      )}
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <div
          className={classes.content}
          style={{ padding: noPadding ? 0 : theme.spacing(1) }}
        >
          {children}
        </div>
      </main>
      <AlertDialogComponent />
    </div>
  );
}

Page.propTypes = {
  window: PropTypes.func,
  title: PropTypes.string,
  centeredTitle: PropTypes.bool,
  backBtn: PropTypes.bool,
  noRightBtns: PropTypes.bool,
  noDrawer: PropTypes.bool,
  searchField: PropTypes.bool,
  noPadding: PropTypes.bool,
  children: PropTypes.node,
};

export default Page;
