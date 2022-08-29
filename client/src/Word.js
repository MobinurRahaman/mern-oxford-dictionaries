import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import {
  VolumeUp as VolumeUpIcon,
  StarOutline as StarOutlineIcon,
  Star as StarIcon,
  Share as ShareIcon,
} from "@material-ui/icons";
import ReactHowler from "react-howler";

import Page from "./components/Page";
import BackdropComponent from "./components/BackdropComponent";

const styles = {
  word: {
    fontWeight: "bold",
    color: "#3f51b5",
  },
  lexicalCategory: {
    fontSize: ".8rem",
    color: "#080",
  },
  sectionTitle: {
    marginBottom: -5,
  },
  etymology: {
    fontSize: ".9rem",
  },
  pronunciationWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    //fontSize: ".9rem",
  },
  definition: {
    fontSize: ".9rem",
  },
  domainClasses: {
    fontStyle: "italic",
  },
  definitionRegister: {
    fontStyle: "italic",
  },
  examplesWrapper: {
    listStyleType: "square",
  },
  example: {
    marginTop: -15,
    fontStyle: "italic",
    fontSize: ".8rem",
  },
  exampleRegister: {},
  shortDefinition: {
    fontSize: ".8rem",
    color: "#555",
  },
  synonyms: {
    margin: "10px 0",
  },
  synonym: {
    fontSize: ".75rem",
  },
  phrase: {
    fontSize: ".8rem",
    lineSpacing: 0.1,
  },
};

export default function Word() {
  const [state, setState] = useState("loading");
  const [data, setData] = useState({});
  const [isPronunciationPlaying, setPronunciationPlaying] = useState(false);
  const [isBookmarked, setBookmarked] = useState(false);
  const { wordId } = useParams();

  useEffect(() => {
    setState("loading");
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/word/${wordId}`)
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        setState("loaded");
        addWordToHistory({ wordId: jsonData.id, word: jsonData.word });
        checkIfBookmarked(wordId);
      })
      .catch(() => {
        setState("error");
      });
  }, [wordId]);

  const addWordToHistory = (wordObj) => {
    if (localStorage) {
      let history = JSON.parse(localStorage.getItem("history"));
      if (history === null) {
        history = [];
        history.push(wordObj);
      } else {
        history = history.filter((item) => item.wordId !== wordObj.wordId);
        history.push(wordObj);
      }
      localStorage.setItem("history", JSON.stringify(history));
      console.log(`${wordObj.word} added to history`);
    } else {
      console.log("localStorage is not supported on your browser");
    }
  };

  const checkIfBookmarked = (wordId) => {
    if (localStorage) {
      let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
      if (bookmarks !== null) {
        const bookmarked = bookmarks.some((item) => item.wordId === wordId);
        setBookmarked(bookmarked);
      }
    }
  };

  const toggleAddWordToBookmarks = (wordObj) => {
    if (localStorage) {
      let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
      if (bookmarks === null) {
        bookmarks = [];
        bookmarks.push(wordObj);
      } else {
        bookmarks = bookmarks.filter((item) => item.wordId !== wordObj.wordId);
        !isBookmarked && bookmarks.push(wordObj);
      }
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setBookmarked(!isBookmarked);
      console.log(
        `${wordObj.word} ${
          isBookmarked ? "removed from" : "added to"
        } bookmarks`
      );
      console.log(JSON.parse(localStorage.getItem("bookmarks")));
    } else {
      console.log("localStorage is not supported on your browser");
    }
  };

  const shareWord = (word) => {
    if (navigator.share) {
      navigator
        .share({
          text: word,
        })
        .then(() => {
          console.log(`word ${word} shared`);
        })
        .catch((err) => {
          console.log(`Couldn't share because of`, err.message);
        });
    } else {
      console.log("web share not supported on your device");
    }
  };

  const DictionaryContent = () => {
    switch (state) {
      case "loading":
        return <BackdropComponent isLoading={true} />;
      case "error":
        return (
          <p>
            {navigator.onLine
              ? "Error occurred while fetching data from server"
              : "No internet connection"}
          </p>
        );
      case "loaded":
        return (
          <>
            <div style={{ display: "flex", gap: 5 }}>
              <span style={styles.word}>{data.word}</span>
              <div style={{ flexGrow: 1 }}></div>
              <IconButton
                size="small"
                aria-label="toggle bookmark"
                onClick={() =>
                  toggleAddWordToBookmarks({ wordId: data.id, word: data.word })
                }
              >
                {isBookmarked ? <StarIcon /> : <StarOutlineIcon />}
              </IconButton>
              <IconButton
                size="small"
                aria-label="share word"
                onClick={() => shareWord(data.word)}
              >
                <ShareIcon />
              </IconButton>
            </div>
            {data?.limit_error && (
              <p>
                Usage limit exceeded. Contact the admin to get further access.
              </p>
            )}
            {data?.error ? (
              <p>Word not found. Please check the spelling.</p>
            ) : (
              data?.results?.map((a, ai) => (
                <>
                  {a.lexicalEntries?.map((x, xi) => (
                    <>
                      <span style={styles.lexicalCategory}>
                        {x.lexicalCategory?.text}
                      </span>

                      {x.entries?.map((y, yi) => (
                        <>
                          {y.etymologies && (
                            <>
                              <h4 style={styles.sectionTitle}>Etymology</h4>
                              {y.etymologies?.map((b, bi) => (
                                <div key={bi}>
                                  <p style={styles.etymology}>{b}</p>
                                </div>
                              ))}
                            </>
                          )}

                          {y.pronunciations && (
                            <>
                              <h4 style={styles.sectionTitle}>Pronunciation</h4>
                              {y.pronunciations?.map((c, ci) => (
                                <div key={ci}>
                                  <div style={styles.pronunciationWrapper}>
                                    <div
                                      aria-label="play pronunciation"
                                      onClick={() =>
                                        setPronunciationPlaying(true)
                                      }
                                    >
                                      <VolumeUpIcon />
                                    </div>

                                    <ReactHowler
                                      src={c.audioFile}
                                      playing={isPronunciationPlaying}
                                      onStop={() =>
                                        setPronunciationPlaying(false)
                                      }
                                      onEnd={() =>
                                        setPronunciationPlaying(false)
                                      }
                                    />

                                    <p style={styles.dialect}>
                                      ({c.dialects[0]})
                                    </p>
                                    <p style={styles.phoneticNotation}>
                                      {c.phoneticNotation}:
                                    </p>
                                    <p style={styles.phoneticSpelling}>
                                      /{c.phoneticSpelling}/
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}

                          {y.senses && (
                            <>
                              <ol>
                                {y.senses?.map((d, di) => (
                                  <div key={di}>
                                    <div>
                                      <li style={styles.definition}>
                                        {d.domainClasses && (
                                          <>
                                            (
                                            <span style={styles.domainClasses}>
                                              {d.domainClasses[0]?.text}
                                            </span>
                                            ){" "}
                                          </>
                                        )}
                                        {d.registers && (
                                          <>
                                            (
                                            <span
                                              style={styles.definitionRegister}
                                            >
                                              {d.registers[0]?.text}
                                            </span>
                                            ){" "}
                                          </>
                                        )}
                                        {d.definitions[0]}
                                      </li>
                                    </div>

                                    {d.examples && (
                                      <ul className={styles.examplesWrapper}>
                                        {d.examples?.map((e, ei) => (
                                          <li style={styles.example} key={ei}>
                                            <p>
                                              {e.registers && (
                                                <span
                                                  style={styles.exampleRegister}
                                                >
                                                  ({e.registers[0]?.text}){" "}
                                                </span>
                                              )}
                                              {e.text}
                                            </p>
                                          </li>
                                        ))}
                                      </ul>
                                    )}

                                    {d.shortDefinitions && (
                                      <p style={styles.shortDefinition}>
                                        {d.shortDefinitions}
                                      </p>
                                    )}

                                    {d.synonyms && (
                                      <div style={styles.synonymsWrapper}>
                                        <h4 style={styles.sectionTitle}>
                                          Synonyms
                                        </h4>
                                        <div style={styles.synonyms}>
                                          {d.synonyms?.map((z, zi) => (
                                            <>
                                              {z.language === "en" && (
                                                <span
                                                  style={styles.synonym}
                                                  key={zi}
                                                >
                                                  {(zi ? ", " : "") + z.text}
                                                </span>
                                              )}
                                            </>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </ol>
                            </>
                          )}
                        </>
                      ))}

                      {x.phrases && (
                        <>
                          <h4 style={styles.sectionTitle}>Phrases</h4>
                          {x.phrases?.map((f, fi) => (
                            <p style={styles.phrase} key={fi}>
                              {f.text}
                            </p>
                          ))}
                        </>
                      )}
                      {ai < data.results.length - 1 && <hr style={styles.hr} />}
                    </>
                  ))}
                </>
              ))
            )}
          </>
        );
      case "default":
        return <p>Unknown error occurred</p>;
    }
  };

  return (
    <Page searchField>
      <div className="App">
        <DictionaryContent />
      </div>
    </Page>
  );
}
