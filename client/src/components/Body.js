import React, { Component } from 'react'
import Heading from './Heading';
import About from './About';

export default class Body extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            coords: {
                latitude: '',
                longitude: ''
            },
             name: 'Texas Roadhouse',
             distance: '5mi.',
             address: '2535 South 25th East, Ammon',
             rating: '4.4',
             price: '2',
             tags: ['bar', ' restaurant']
        }
    }
    componentDidMount() {
        this.getGeoLocation()
    }
    getGeoLocation() {
        navigator.geolocation.getCurrentPosition(position => {

            const latitude = position.coords.latitude.toString()
            const longitude = position.coords.longitude.toString()

            const newCoords = {
                latitude: latitude,
                longitude: longitude
            }

            const newState = {...this.state}
            newState.coords = newCoords
            this.setState(newState)

            this.fetchPlaces()
        })
    }
    fetchPlaces() {
        //fetch nearby restaurants using Google's Places Search API
        const params = {
            key: 'AIzaSyCAkiTbJB7LAyQx3lBt-P0XYIgZqe5G7Zs',
                //location: latitude, longitude
            location: `${this.state.coords.latitude},${this.state.coords.longitude}`,
                //radius (in meters), 32186.9m. = 20mi.
            radius: '32186.9',
            type: 'restaurant'
        }
        const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?
                    key=${params.key}&location=${params.location}&radius=${params.radius}&type=${params.type}`
        fetch(URL, {
            method: 'GET',
            // mode: 'no-cors',
            // headers: {
            //     'Content-Type': appli
            // }
        }).then(res => console.log(res))
    }
    
    render() {
        return (
            <div className={this.props.className}>
                <Heading className="Heading">
                    <h1>{this.state.name}</h1>
                    <h2>{this.state.distance}</h2>
                    <h4>{this.state.address}</h4>
                </Heading>
                <About className="About">
                    <p>{this.state.rating}</p>
                    <p>{this.state.price}</p>
                    <p>{this.state.tags}</p>
                </About>
            </div>
        )
    }
}
