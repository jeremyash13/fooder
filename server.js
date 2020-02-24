// require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const { location, radius, type, pageToken } = req.body;
  const key = process.env.GOOGLE_API_KEY;
  let url;

  if (pageToken) {
    // 2 different urls depending on if a pageToken is present in the request body
    url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&opennow=true&location=${location}&radius=${radius}&type=${type}&pagetoken=${pageToken}`;
  } else {
    url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&opennow=true&location=${location}&radius=${radius}&type=${type}`;
  }

  const data = await fetch(url);
  const json = await data.json();
  res.send(json);
});

app.post("/photos",(req, res) => {
  const key = process.env.GOOGLE_API_KEY;
  const getPhotosArray = req => {
    const promises = req.body.map(photoRef => {
      // array of promises 
      if (photoRef) {
        const url = `https://maps.googleapis.com/maps/api/place/photo?key=${key}&photoreference=${photoRef}&maxwidth=400`;
        return fetch(url)
          .then(data => {
            let imagePromise;
            let image;
            let chunks = [];
            return imagePromise = new Promise((resolve, reject) => {
              //concatinate all data chunks into one before encoding to base64
              data.body.on('data', (chunk) => {
                chunks.push(chunk);
              })
              data.body.on('end', () => {
                image = Buffer.concat(chunks).toString('base64');
                resolve(image);
              })  
            })
          })
          .catch(err => console.log(err));
      } else {
        return null;
      }
    });
    Promise.all(promises)
    // when all images are recieved send the array of dataUri images to front end
      .then(dataURIArray => {
        res.send(dataURIArray);
      })
      .catch(err => console.log(err));
  };
  getPhotosArray(req);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  if (process.env.NODE_ENV === "development") {
    // console.log the port if we're in the development environment
    console.log("Server start successful. Node evironment: DEVELOPMENT");
    console.log(`Listening on http://localhost:${port}`);
  }
});
