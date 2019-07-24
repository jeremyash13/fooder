import React, { Component } from "react";
import { Button } from "@material-ui/core/";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger, faGlassCheers, faUtensils } from '@fortawesome/free-solid-svg-icons'
import Heading from "./Heading";
import About from "./About";

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
      placesIndex: 0
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

    const { location } = this.state;

    const url = "http://localhost:8080";
    const body = {
      location: location,
      radius: "32186.9", /* 20 mi. (in meters)*/
      type: "restaurant"
    };
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await res.json();
    console.log(json.results);
    this.setState({
      places: json.results
    });
  };

  acceptableTags(type) {
    // Filtering conditions for the .filter() func on the places.types array
    return type === "food" || type === "bar" || type === "restaurant";
  }

  handleChoice = choice => {
    if (choice === "no") {
      this.setState(prevState => {
        return {
          placesIndex: prevState.placesIndex + 1
        };
      });
    }
  };

  render() {
    const {
      places,
      placesIndex
    } = this.state;
    return (
      <div className={this.props.className}>
        <Heading className="Heading">
          <h1>{`Name: ${places[placesIndex].name}`}</h1>
          {/* <h2>{`Distance: ${distance}`}</h2> */}
          <h4>{`Address: ${places[placesIndex].vicinity}`}</h4>
        </Heading>
        <About className="About">
          <p>{`Rating: ${places[placesIndex].rating}`}</p>
          <p>{`Price: ${places[placesIndex].price_level}`}</p>
          <p>{`Tags: ${places[placesIndex].types.filter(this.acceptableTags)}`}</p>
          <Button color="secondary" onClick={() => this.handleChoice("no")}>
            NOPE
          </Button>
          <Button
            color="primary"
            classes={{ label: "button--primary" }}
            onClick={() => this.handleChoice("yes")}
          >
            YEA
          </Button>
        </About>
      </div>
    );
  }
}
