const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const { key, location, radius, type } = req.body;

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&location=${location}&radius=${radius}&type=${type}`;
  const data = await fetch(url);
  const json = await data.json();
  res.send(json);
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
