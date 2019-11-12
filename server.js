require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const { location, radius, type, pageToken } = req.body;
  const key = process.env.GOOGLE_API_KEY;
  let url;

  if (pageToken) {
    url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&opennow=true&location=${location}&radius=${radius}&type=${type}&pagetoken=${pageToken}`;
  } else {
    url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&opennow=true&location=${location}&radius=${radius}&type=${type}`;
  }

  const data = await fetch(url);
  const json = await data.json();
  res.send(json);
});

app.post('/photos', async (req, res) => {
  const photoreference = req.body.photoreference;
  // const photoreference = 'CmRaAAAA4VHkY-1LyjPjNs2gaGgaWy0bZkc5HaXu3aK1O705kyLz-dudTb_k-Nw2EvlGXEBlKEosFd-ZbCLGAtebdK_14vZ4Y-zjURS987XPMGP2iSczlHI9uAZufqGLnkdsC1O_EhBQeVos2Rt4eZVda-B-vBIFGhRNzcZZrzLO2F-GssOoP_uyaMYVLw';
  const key = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/photo?key=${key}&photoreference=${photoreference}&maxwidth=400`;

  const photo = await fetch(url);
  const photoURL = {url: photo.url};
  const json = await JSON.stringify(photoURL);

  console.log(photoURL)
  // res.type('text/plain')
  res.send(json);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    // console.log the port if we're in the development environment
    console.log('Server start successful. Node evironment: DEVELOPMENT');
    console.log(`Listening on http://localhost:${port}`);
  }
});
