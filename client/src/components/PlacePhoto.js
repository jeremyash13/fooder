import React, { Component } from 'react'
import { type } from 'os';

export default class PlacePhoto extends Component {

    constructor(props){
        super(props);

        this.state = {
            imageURL: '',
            currentPhotoRef: ''
        }
    }
    componentDidUpdate(props) {
        if(props.photoRef !== '' && this.state.currentPhotoRef !== props.photoRef) {
            this.fetchPhoto(props);
        }
    }
    fetchPhoto = async (props) => {
    
    const photoRef = props.photoRef;
    
    const url = "http://localhost:8080/photos";
    const body = {
      photoreference: photoRef
    };
    const photoURL = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const json = await photoURL.json()
    this.setState({imageURL: json.url, currentPhotoRef: photoRef})
    
    };

    render() {
        return (
            <div>
                <img src={this.state.imageURL}></img>
            </div>
        )
    }
}
