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
    componentDidUpdate() {
        
    }

    render() {
        return (
            <div>
                <img src={''}></img>
            </div>
        )
    }
}
