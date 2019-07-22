import React, { Component } from 'react'
import Heading from './Heading';
import About from './About';


export default class Body extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            //location: Lat, Long
            location: '',
             name: 'Texas Roadhouse',
             distance: '5mi.',
             address: '2535 South 25th East, Ammon',
             rating: '4.4',
             price: '2',
             tags: ['bar', ' restaurant'],
             key: 'AIzaSyCAkiTbJB7LAyQx3lBt-P0XYIgZqe5G7Zs',
        }
    }
    componentDidMount() {
        this.getGeoLocation()
    }
    getGeoLocation() {
        navigator.geolocation.getCurrentPosition(position => {

            const latitude = position.coords.latitude.toString()
            const longitude = position.coords.longitude.toString()

            this.setState({
                location: latitude + ',' + longitude
            })

            this.fetchPlaces()
        })
    }
    fetchPlaces() {
        //fetch nearby restaurants using Google's Places Search API

        
    }
    
    render() {
        return (
            <div className={this.props.className}>
                {/* <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${this.state.key}&libraries=places`}>
                </script> */}
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
