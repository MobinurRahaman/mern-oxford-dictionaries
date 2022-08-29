const express = require("express");
const apicache = require("apicache");
const bodyParser = require("body-parser");

const http = require("https");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
let cache = apicache.middleware;

app.use(bodyParser.urlencoded({ extended: true })); // body-parser
app.use(bodyParser.json()); // body-parser
const port = process.env.PORT || 5000;

const cacheSearchSuggestions = cache("1 day");
const cacheWords = cache("30 minutes");

app.get("/", (req, res) => {
  res.json({ message: "server home" });
});

app.get("/search/:searchTerm", cacheSearchSuggestions, (req, res) => {
  const options = {
    host: "od-api.oxforddictionaries.com",
    port: "443",
    path:
      "/api/v2/search/thesaurus/en?q=" + req.params.searchTerm + "&limit=20",
    method: "GET",
    headers: {
      app_id: process.env.APP_ID,
      app_key: process.env.APP_KEY,
    },
  };

  http.get(options, (resp) => {
    let body = "";
    resp.on("data", (d) => {
      body += d;
    });
    resp.on("end", () => {
      try {
        let parsed = JSON.parse(body);
        res.json(parsed);
      } catch (e) {
        res.status(500).json({ limit_error: "Usage limit exceeded" });
      }
    });
  });
});

app.get("/word/:wordId", cacheWords, (req, res) => {
  const options = {
    host: "od-api.oxforddictionaries.com",
    port: "443",
    path: "/api/v2/entries/en-gb/" + req.params.wordId,
    method: "GET",
    headers: {
      app_id: process.env.APP_ID,
      app_key: process.env.APP_KEY,
    },
  };

  http.get(options, (resp) => {
    let body = "";
    resp.on("data", (d) => {
      body += d;
    });
    resp.on("end", () => {
      try {
        let parsed = JSON.parse(body);
        res.json(parsed);
      } catch (e) {
        res.status(500).json({ limit_error: "Usage limit exceeded" });
      }
    });
  });
});
app.all("*", (req, res) => {
  res.status(404).json({ message: "route not found" });
});

app.listen(port, () => {
  console.log(`MERN Oxford Dictionaries server listening on port ${port}`);
});
