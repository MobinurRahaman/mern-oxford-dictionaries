import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import Home from "./Home";
import Word from "./Word";
import History from "./History";
import Bookmarks from "./Bookmarks";
import PageNotFound from "./PageNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/word/:wordId" element={<Word />} />
        <Route path="/history" element={<History />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
