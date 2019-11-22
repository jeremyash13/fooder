import React, { Component } from "react";
import { Button } from "@material-ui/core/";
import Heading from "./Heading";
import PlaceInfo from "./PlaceInfo";
import PlaceRating from "./PlaceRating";
import PlacePrice from "./PlacePrice";
import PlaceTags from "./PlaceTags";
import PlaceAddress from "./PlaceAddress";
import PlaceName from "./PlaceName";
import PlacePhoto from "./PlacePhoto";

export default class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //location (Lat, Long)
      location: "",
      places: [{
            name: "",
            vicinity: "",
            rating: "",
            price_level: "",
            types: [],
            photos: [{}],
          }],
      placesIndex: 0,
      placePhotoUrls: [''],
      isFetchingData: false,
      nextPageToken: null
    };
  }
  componentDidMount() {
    this.getGeoLocation();
    
  }
  getGeoLocation() {
    // Get user location (latitude, longitude)

    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude.toString();
      const longitude = position.coords.longitude.toString();

      this.setState({
        location: latitude + "," + longitude
      });
      this.fetchPlaces();
      
    });
  }
  fetchPlaces = async () => {
    //fetch nearby restaurants using Google's Places Search API
    this.setState({isFetchingData: true})

    const { location, nextPageToken } = this.state;

    const url = "http://localhost:8080";
    // const url = "https://fooder--app.herokuapp.com/";
    const body = {
      location: location,
      radius: "32186.9" /* 20 mi. (in meters)*/,
      type: "restaurant",
      pageToken: nextPageToken
    };
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await res.json();
    const newState = this.state
    let places = [...newState.places]
    places = [...places, ...json.results]
    newState.nextPageToken = json.next_page_token
    
    // convert places array to set to purge potential duplicates, then convert back to array
    newState.places = [...new Set(places)]
    this.fetchPhotos(newState.places)

    if (newState.placesIndex === 0) {
      newState.placesIndex = 1
    }
    this.setState(newState)
    this.setState({isFetchingData: false}, () => {console.log(this.state.places)})
  };

  fetchPhotos = async (inputArray) => {
    const url = 'http://localhost:8080/photos'
    const neededPhotos = inputArray.map((item, idx) => {
      if (item.photos !== undefined) {
        return item.photos[0].photo_reference
      } else {
        return null
      }
    })
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(neededPhotos),
      headers: {
        "Content-Type": "application/json",
      }
    })
    const json = await res.json()
    const newState = this.state
    newState.placePhotoUrls = [...newState.placePhotoUrls, ...json]
    this.setState(newState)
  }

  handleShowNextPlace = () => {
    const { placesIndex, places, isFetchingData } = this.state;
    if (placesIndex !== places.length - 1) {
      // show next place if we arent viewing the final place
      this.setState(prevState => {
        return {
          placesIndex: prevState.placesIndex + 1
        };
      });
    }
    if (placesIndex >= places.length - 5 && isFetchingData === false) {
      // save next page of search results to state when nearing end of places array
      this.fetchPlaces()
    }
  }

  handleShowPreviousPlace = () => {
    // show previous place if we arent viewing the first place
    const { placesIndex } = this.state;
    if (placesIndex !== 1) {
      this.setState(prevState => {
        return {
          placesIndex: prevState.placesIndex - 1
        };
      });
    }
  }

  render() {
    const { places, placesIndex, placePhotoUrls } = this.state;
    let i = placesIndex;
    return (
      <div className={this.props.className}>
        <Heading className="Heading">
          <PlaceName value={places[i].name} />
          <PlacePhoto value={placePhotoUrls[i+1]}></PlacePhoto>
        </Heading>
        <PlaceInfo className="PlaceInfo">
          <PlaceAddress value={places[i].vicinity} />
          <PlaceRating value={places[i].rating} />
          <PlacePrice value={places[i].price_level} />
          <PlaceTags value={[...places[i].types]} />
        </PlaceInfo>

        <div className="buttons--wrapper">
          <Button
            color="primary"
            classes={{ label: "button--primary" }}
            onClick={() => this.handleShowPreviousPlace()}
          >
            PREV
          </Button>
          <Button color="secondary" onClick={() => this.handleShowNextPlace()}>
            NEXT
          </Button>
        </div>
      </div>
    );
  }
}
