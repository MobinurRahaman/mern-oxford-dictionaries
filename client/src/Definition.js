import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { IconButton, Divider } from "@material-ui/core";
import {
  VolumeUp as VolumeUpIcon,
  StarOutline as StarOutlineIcon,
  Star as StarIcon,
  Share as ShareIcon,
} from "@material-ui/icons";

import Page from "./components/Page";
import BackdropComponent from "./components/BackdropComponent";

const styles = {
  word: {
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "#6e7ccd",
  },
  lexicalCategory: {
    fontSize: ".9em",
    fontWeight: "bold",
    color: "#080",
  },
  sectionTitle: {
    marginBottom: -5,
  },
  pronunciationWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  domainClasses: {
    fontStyle: "italic",
  },
  definitionRegister: {
    fontStyle: "italic",
  },
  variantFormRegion: {
    fontStyle: "italic",
  },
  examplesWrapper: {
    listStyleType: "disc",
  },
  example: {
    marginTop: "-1em",
    fontStyle: "italic",
    fontSize: ".9em",
  },
  shortDefinition: {
    fontSize: ".9em",
    color: "#666",
  },
  variantForm: {
    fontSize: ".9em",
    color: "#888",
  },
  synonyms: {
    margin: "10px 0",
  },
  synonym: {
    fontSize: ".8em",
  },
  derivative: {
    fontSize: ".9em",
    margin: "2px 0",
  },
  phrase: {
    fontSize: ".9em",
    margin: "2px 0",
  },
  note: {
    fontSize: ".9em",
  },
};

export default function Definition() {
  const [state, setState] = useState("loading");
  const [data, setData] = useState({});
  const [dictionaryFontSize, setDictionaryFontSize] = useState(
    localStorage.getItem("dictionaryFontSize") !== null
      ? parseInt(localStorage.getItem("dictionaryFontSize"))
      : 14
  );
  const [isBookmarked, setBookmarked] = useState(false);
  const [audioFileUrl, setAudioFileUrl] = useState(
    "http://goldfirestudios.com/proj/howlerjs/sound.ogg"
  );
  const [isPlaying, setPlaying] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const wordId = searchParams.get("q");
  const htmlAudioRef = useRef(null);

  useEffect(() => {
    const pronunciation = new Audio(audioFileUrl);
    isPlaying ? pronunciation.play() : pronunciation.pause();
    pronunciation.onended = () => setPlaying(false);
  }, [isPlaying]);

  useEffect(() => {
    setState("loading");
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/word/${wordId}`)
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        setState("loaded");
        !jsonData.error &&
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

  const decreaseFontSize = () => {
    const newFontSize =
      dictionaryFontSize > 8 ? dictionaryFontSize - 1 : dictionaryFontSize;
    setDictionaryFontSize(newFontSize);
    localStorage.setItem("dictionaryFontSize", newFontSize);
  };

  const increaseFontSize = () => {
    const newFontSize =
      dictionaryFontSize < 30 ? dictionaryFontSize + 1 : dictionaryFontSize;
    setDictionaryFontSize(newFontSize);
    localStorage.setItem("dictionaryFontSize", newFontSize);
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
      console.log("web share is not supported on your browser");
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
              <span style={styles.word}>{data?.word}</span>
              <div style={{ flexGrow: 1 }}></div>
              <IconButton
                size="small"
                aria-label="decrease font size"
                onClick={decreaseFontSize}
              >
                A-
              </IconButton>
              <IconButton
                size="small"
                aria-label="increase font size"
                onClick={increaseFontSize}
              >
                A+
              </IconButton>
              <IconButton
                size="small"
                aria-label="toggle bookmark"
                onClick={() =>
                  toggleAddWordToBookmarks({
                    wordId: data?.id,
                    word: data?.word,
                  })
                }
              >
                {isBookmarked ? <StarIcon /> : <StarOutlineIcon />}
              </IconButton>
              <IconButton
                size="small"
                aria-label="share word"
                onClick={() => shareWord(data?.word)}
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
              <>
                {data?.results?.map((a, ai) => (
                  <div key={ai}>
                    {data?.results[0]?.lexicalEntries[0]?.entries[0]
                      ?.pronunciations && (
                      <>
                        <h4 style={styles.sectionTitle}>Pronunciation</h4>
                        {data?.results[0]?.lexicalEntries[0]?.entries[0]?.pronunciations?.map(
                          (c, ci) => (
                            <div style={styles.pronunciationWrapper} key={ci}>
                              <IconButton
                                size="small"
                                aria-label="play pronunciation"
                                onClick={() => {
                                  setAudioFileUrl(c.audioFile);
                                  setPlaying(true);
                                }}
                              >
                                <VolumeUpIcon />
                              </IconButton>
                              <p style={styles.dialect}>({c.dialects[0]})</p>
                              <p style={styles.phoneticNotation}>
                                {c.phoneticNotation}:
                              </p>
                              <p style={styles.phoneticSpelling}>
                                /{c.phoneticSpelling}/
                              </p>
                            </div>
                          )
                        )}
                      </>
                    )}

                    {a.lexicalEntries?.map((x, xi) => (
                      <div key={xi}>
                        <span style={styles.lexicalCategory}>
                          {x.lexicalCategory?.text}
                        </span>

                        {x.entries?.map((y, yi) => (
                          <div key={yi}>
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

                            {y.senses && (
                              <>
                                <ol>
                                  {y.senses?.map((d, di) => (
                                    <div key={di}>
                                      {d.definitions && (
                                        <div>
                                          <li style={styles.sense}>
                                            {d.domainClasses && (
                                              <>
                                                (
                                                <span
                                                  style={styles.domainClasses}
                                                >
                                                  {d.domainClasses[0]?.text}
                                                </span>
                                                ){" "}
                                              </>
                                            )}
                                            {d.registers && (
                                              <>
                                                (
                                                <span
                                                  style={
                                                    styles.definitionRegister
                                                  }
                                                >
                                                  {d.registers[0]?.text}
                                                </span>
                                                ){" "}
                                              </>
                                            )}
                                            {d.definitions && (
                                              <span style={styles.definition}>
                                                {d.definitions[0]}
                                              </span>
                                            )}
                                          </li>
                                        </div>
                                      )}

                                      {d.examples && (
                                        <ul style={styles.examplesWrapper}>
                                          {d.examples?.map((e, ei) => (
                                            <li style={styles.example} key={ei}>
                                              <p>
                                                {e.registers && (
                                                  <span
                                                    style={
                                                      styles.exampleRegister
                                                    }
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

                                      {d.variantForms?.map((s, si) => (
                                        <div
                                          style={styles.variantForm}
                                          key={si}
                                        >
                                          {s.regions && (
                                            <span
                                              style={styles.variantFormRegion}
                                            >
                                              ({s.regions[0].text})
                                            </span>
                                          )}{" "}
                                          <span style={styles.variantForm}>
                                            {s.text}
                                          </span>
                                        </div>
                                      ))}

                                      {d.synonyms && (
                                        <div style={styles.synonymsWrapper}>
                                          <h4 style={styles.sectionTitle}>
                                            Synonyms
                                          </h4>
                                          <div style={styles.synonyms}>
                                            {d.synonyms?.map((z, zi) => (
                                              <span key={zi}>
                                                {z.language === "en" && (
                                                  <span
                                                    style={styles.synonym}
                                                    key={zi}
                                                  >
                                                    {(zi ? ", " : "") + z.text}
                                                  </span>
                                                )}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {d.subsenses && (
                                        <>
                                          <h4>Subsenses</h4>
                                          <>
                                            <ol>
                                              {d.subsenses?.map((n, ni) => (
                                                <div key={ni}>
                                                  <div>
                                                    <li style={styles.subsense}>
                                                      {n.domainClasses && (
                                                        <>
                                                          (
                                                          <span
                                                            style={
                                                              styles.domainClasses
                                                            }
                                                          >
                                                            {
                                                              n.domainClasses[0]
                                                                ?.text
                                                            }
                                                          </span>
                                                          ){" "}
                                                        </>
                                                      )}
                                                      {n.registers && (
                                                        <>
                                                          (
                                                          <span
                                                            style={
                                                              styles.definitionRegister
                                                            }
                                                          >
                                                            {
                                                              n.registers[0]
                                                                ?.text
                                                            }
                                                          </span>
                                                          ){" "}
                                                        </>
                                                      )}
                                                      {n.definitions && (
                                                        <span
                                                          style={
                                                            styles.definition
                                                          }
                                                        >
                                                          {n.definitions[0]}
                                                        </span>
                                                      )}
                                                    </li>
                                                  </div>

                                                  {n.examples && (
                                                    <ul
                                                      style={
                                                        styles.examplesWrapper
                                                      }
                                                    >
                                                      {n.examples?.map(
                                                        (o, oi) => (
                                                          <li
                                                            style={
                                                              styles.example
                                                            }
                                                            key={oi}
                                                          >
                                                            <p>
                                                              {o.registers && (
                                                                <span
                                                                  style={
                                                                    styles.exampleRegister
                                                                  }
                                                                >
                                                                  (
                                                                  {
                                                                    o
                                                                      .registers[0]
                                                                      ?.text
                                                                  }
                                                                  ){" "}
                                                                </span>
                                                              )}
                                                              {o.text}
                                                            </p>
                                                          </li>
                                                        )
                                                      )}
                                                    </ul>
                                                  )}

                                                  {n.shortDefinitions && (
                                                    <p
                                                      style={
                                                        styles.shortDefinition
                                                      }
                                                    >
                                                      {n.shortDefinitions}
                                                    </p>
                                                  )}

                                                  {n.variantForms?.map(
                                                    (s, si) => (
                                                      <div
                                                        style={
                                                          styles.variantForm
                                                        }
                                                        key={si}
                                                      >
                                                        {s.regions && (
                                                          <span
                                                            style={
                                                              styles.variantFormRegion
                                                            }
                                                          >
                                                            ({s.regions[0].text}
                                                            )
                                                          </span>
                                                        )}{" "}
                                                        <span
                                                          style={
                                                            styles.variantForm
                                                          }
                                                        >
                                                          {s.text}
                                                        </span>
                                                      </div>
                                                    )
                                                  )}

                                                  {n.synonyms && (
                                                    <div
                                                      style={
                                                        styles.synonymsWrapper
                                                      }
                                                    >
                                                      <h4
                                                        style={
                                                          styles.sectionTitle
                                                        }
                                                      >
                                                        Synonyms
                                                      </h4>
                                                      <div
                                                        style={styles.synonyms}
                                                      >
                                                        {n.synonyms?.map(
                                                          (p, pi) => (
                                                            <div key={pi}>
                                                              {p.language ===
                                                                "en" && (
                                                                <span
                                                                  style={
                                                                    styles.synonym
                                                                  }
                                                                  key={pi}
                                                                >
                                                                  {(pi
                                                                    ? ", "
                                                                    : "") +
                                                                    p.text}
                                                                </span>
                                                              )}
                                                            </div>
                                                          )
                                                        )}
                                                      </div>
                                                    </div>
                                                  )}
                                                </div>
                                              ))}
                                            </ol>
                                          </>
                                        </>
                                      )}

                                      {d.crossReferences && (
                                        <>
                                          <h4 style={styles.sectionTitle}>
                                            See also
                                          </h4>
                                          {d.crossReferences?.map((q, qi) => (
                                            <p
                                              style={styles.crossReference}
                                              key={qi}
                                            >
                                              {q.text}
                                              {d.crossReferenceMarkers[0] && (
                                                <span
                                                  style={
                                                    styles.crossReferenceMarker
                                                  }
                                                >
                                                  {" "}
                                                  ({d.crossReferenceMarkers[0]})
                                                </span>
                                              )}
                                            </p>
                                          ))}
                                        </>
                                      )}
                                    </div>
                                  ))}
                                </ol>
                              </>
                            )}
                          </div>
                        ))}

                        {ai < data?.results?.length && <Divider />}
                      </div>
                    ))}
                  </div>
                ))}

                {data?.results[0]?.lexicalEntries[0].derivatives && (
                  <>
                    <h4 style={styles.sectionTitle}>Derivatives</h4>
                    <ul>
                      {data?.results[0]?.lexicalEntries[0].derivatives?.map(
                        (m, mi) => (
                          <li style={styles.derivative} key={mi}>
                            {m.text}
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}

                {data?.results[0]?.lexicalEntries[0].phrases && (
                  <>
                    <h4 style={styles.sectionTitle}>Phrases</h4>
                    <ul>
                      {data?.results[0]?.lexicalEntries[0].phrases?.map(
                        (f, fi) => (
                          <li style={styles.phrase} key={fi}>
                            {f.text}
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}

                {data?.results[0]?.lexicalEntries[0]?.entries[0]?.notes && (
                  <>
                    <h4 style={styles.sectionTitle}>Note</h4>
                    <p style={styles.note}>
                      {
                        data?.results[0]?.lexicalEntries[0]?.entries[0]
                          ?.notes[0].text
                      }
                    </p>
                  </>
                )}
              </>
            )}
          </>
        );
      case "default":
        return <p>Unknown error occurred</p>;
    }
  };

  return (
    <Page title="MERN Oxford Dictionaries" searchField>
      <div className="content" style={{ fontSize: `${dictionaryFontSize}px` }}>
        <DictionaryContent />
      </div>
    </Page>
  );
}
