import React, { Component } from "react";
import { Button, Chip } from "@material-ui/core/";
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
      //location: Lat, Long
      location: "",
      places: [
        {
          name: "",
          vicinity: "",
          rating: "",
          price_level: "",
          types: []
        }
      ],
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
    console.log(json);
    this.setState({
      places: json.results,
      nextPageToken: json.next_page_token,
      placesIndex: 0
    });
  };

  acceptableTags(type) {
    // Filtering conditions for the .filter() func on the places.types array
    return type === "food" || type === "bar" || type === "restaurant";
  }

  handleChoice = choice => {
    const { placesIndex, places } = this.state;
    if (choice === "next") {
      if (placesIndex !== places.length - 1) {
        // show next place if we arent viewing the final place
        this.setState(prevState => {
          return {
            placesIndex: prevState.placesIndex + 1
          };
        });
      } else {
          // save next page of search results to state
          this.fetchPlaces()
      }
    }
    if (choice === "prev") {
      // show previous place if we arent viewing the first place
      if (placesIndex !== 0) {
        this.setState(prevState => {
          return {
            placesIndex: prevState.placesIndex - 1
          };
        });
      }
    }
  };

  render() {
    const { places, placesIndex } = this.state;
    return (
      <div className={this.props.className}>
        <Heading className="Heading">
          <PlaceName value={places[placesIndex].name} />
          {/* <h2>{`Distance: ${distance}`}</h2> */}
          <PlaceAddress value={places[placesIndex].vicinity} />
        </Heading>
        <PlaceInfo className="PlaceInfo">
          <PlaceRating value={places[placesIndex].rating} />
          <PlacePrice value={places[placesIndex].price_level} />
          <PlaceTags
            value={places[placesIndex].types.filter(this.acceptableTags)}
          />
        </PlaceInfo>

        <Button
          color="primary"
          classes={{ label: "button--primary" }}
          onClick={() => this.handleChoice("prev")}
        >
          PREV
        </Button>
        <Button color="secondary" onClick={() => this.handleChoice("next")}>
          NEXT
        </Button>
      </div>
    );
  }
}
