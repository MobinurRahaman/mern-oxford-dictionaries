import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "./components/Page";
import ListContainer from "./components/ListContainer";

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
      {history === null || history?.length === 0 ? (
        <p>Your history is empty</p>
      ) : (
        <ListContainer
          items={history}
          onItemClick={(wordId) => navigate(`/definition/?q=${wordId}`)}
          onItemRemove={removeWordFromHistory}
        />
      )}
    </Page>
  );
}
