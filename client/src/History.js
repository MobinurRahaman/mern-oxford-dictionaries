import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ButtonBase,
  IconButton,
  Divider,
} from "@material-ui/core";
import { Clear as ClearIcon } from "@material-ui/icons";
import Page from "./components/Page";

export default function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );

  const removeWordFromHistory = (wordId) => {
    const newHistory = history.filter((item) => item.wordId !== wordId);
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(newHistory));
  };

  return (
    <Page title="History">
      {history === null ? (
        <p>Your history is empty</p>
      ) : (
        <List
          aria-label="history"
          style={{ display: "flex", flexDirection: "column-reverse" }}
        >
          {history.map((item, index) => (
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
                    onClick={() => removeWordFromHistory(item.wordId)}
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
