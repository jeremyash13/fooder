import React, { Component } from "react";
import { Button } from "@material-ui/core/";
import Heading from "./Heading";
import PlaceInfo from "./PlaceInfo";
import PlaceRating from "./PlaceRating";
import PlacePrice from "./PlacePrice";
import PlaceTags from "./PlaceTags";
import PlaceAddress from "./PlaceAddress";
import PlaceName from "./PlaceName";

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
            types: []
          }],
      placesIndex: 0,
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
    newState.places = [...newState.places, ...json.results]
      newState.nextPageToken = json.next_page_token
      if (newState.placesIndex === 0) {
        newState.placesIndex = 1
      }
      this.setState(newState)
  };

  handleShowNextPlace = () => {
    const { placesIndex, places } = this.state;
    if (placesIndex !== places.length - 1) {
      // show next place if we arent viewing the final place
      this.setState(prevState => {
        return {
          placesIndex: prevState.placesIndex + 1
        };
      });
    }
    if (placesIndex >= places.length - 5) {
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
    const { places, placesIndex } = this.state;
    let i = placesIndex;
    return (
      <div className={this.props.className}>
        <Heading className="Heading">
          <PlaceName value={places[i].name} />
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
