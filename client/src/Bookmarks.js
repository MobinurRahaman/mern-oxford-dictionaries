import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ButtonBase,
  IconButton,
  Divider,
} from "@material-ui/core";
import { Clear as ClearIcon } from "@material-ui/icons";
import Page from "./components/Page";

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
        <List
          aria-label="bookmarks"
          style={{ display: "flex", flexDirection: "column-reverse" }}
        >
          {bookmarks.map((item, index) => (
            <>
              <Divider />
              <ListItem
                key={index}
                style={{ margin: 0, padding: 0, alignItems: "stretch" }}
              >
                <ButtonBase
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                  onClick={() => navigate(`/word/${item.wordId}`)}
                >
                  <ListItemText
                    primary={item.word}
                    style={{
                      padding: "0 10px",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  />
                </ButtonBase>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={() => removeWordFromBookmarks(item.wordId)}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              </ListItem>
            </>
          ))}
        </List>
      )}
    </Page>
  );
}
