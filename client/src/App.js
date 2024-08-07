import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import Home from "./Home";
import Definition from "./Definition";
import History from "./History";
import Bookmarks from "./Bookmarks";
import PageNotFound from "./PageNotFound";
import { DarkModeContext } from "./contexts/DarkModeContext";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") !== null
      ? true
      : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ? true
      : false
  );

  const setDarkModePersistantly = (bool = false) => {
    setDarkMode(bool);
    bool
      ? localStorage.setItem("darkMode", true)
      : localStorage.removeItem("darkMode");
  };

  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkModePersistantly }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/definition" element={<Definition />} />
            <Route path="/history" element={<History />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}
