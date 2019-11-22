import React, { Component } from 'react'
import { type } from 'os';

export default class PlacePhoto extends Component {

    constructor(props){
        super(props);
    }

    render() {
        if(this.props.value){
            return (
                <div>
                    <img src={`${this.props.value}`}></img>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>no photos could be found</h3>
                </div>
            )
        }
    }
}
