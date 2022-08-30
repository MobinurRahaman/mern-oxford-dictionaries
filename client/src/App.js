import { useState, createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Home from "./Home";
import Word from "./Word";
import History from "./History";
import Bookmarks from "./Bookmarks";
import PageNotFound from "./PageNotFound";

export const DarkModeContext = createContext();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/word/:wordId" element={<Word />} />
            <Route path="/history" element={<History />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}
