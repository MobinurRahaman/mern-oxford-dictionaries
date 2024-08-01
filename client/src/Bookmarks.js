import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "./components/Page";
import ListContainer from "./components/ListContainer";

export default function Bookmarks() {
  const navigate = useNavigate();

  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks"))
  );

  const removeWordFromBookmarks = (wordId) => {
    const newBookmarks = bookmarks.filter((item) => item.wordId !== wordId);
    setBookmarks(newBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  };

  return (
    <Page title="Bookmarks">
      {bookmarks === null || bookmarks?.length === 0 ? (
        <p>Bookmarks empty</p>
      ) : (
        <ListContainer
          items={bookmarks}
          onItemClick={(wordId) => navigate(`/definition/?q=${wordId}`)}
          onItemRemove={removeWordFromBookmarks}
        />
      )}
    </Page>
  );
}
