const express = require("express");
const bodyParser = require("body-parser");
const http = require("https");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // body-parser
app.use(bodyParser.json()); // body-parser
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "server home" });
});

app.get("/search/:searchTerm", (req, res) => {
  const options = {
    host: 'od-api.oxforddictionaries.com',
    port: '443',
    path: '/api/v2/search/thesaurus/en?q=' + req.params.searchTerm,
    method: "GET",
    headers: {
      'app_id': process.env.APP_ID,
      'app_key': process.env.APP_KEY
    }
  };
  
  http.get(options, (resp) => {
    let body = '';
    resp.on('data', (d) => {
      body += d;
    });
    resp.on('end', () => {
      try {
        let parsed = JSON.parse(body);
        //console.log(parsed);
        res.json(parsed);
      }
      catch(e) {
        res.status(500).json({"limit_error": "Use limit exceeded"});
      }
    });
  });
});

app.get("/word/:wordId", (req, res) => {
  const options = {
    host: 'od-api.oxforddictionaries.com',
    port: '443',
    path: '/api/v2/entries/en-gb/' + req.params.wordId,
    method: "GET",
    headers: {
      'app_id': process.env.APP_ID,
      'app_key': process.env.APP_KEY
    }
  };
  
  http.get(options, (resp) => {
    let body = '';
    resp.on('data', (d) => {
      body += d;
    });
    resp.on('end', () => {
      try {
        let parsed = JSON.parse(body);
        //console.log(parsed);
        res.json(parsed);
      }
      catch(e) {
        res.status(500).json({"limit_error": "Usage limit exceeded"});
      }
    });
  });
});
app.all("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

app.listen(port, () => {
  console.log(`React Oxford Dictionaries server listening on port ${port}`);
});
