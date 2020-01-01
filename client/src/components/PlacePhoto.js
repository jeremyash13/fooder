import React, { Component } from 'react';

export default class PlacePhoto extends Component {
    
    render() {
        if(this.props.value){
            return (
                <div style={{position: "relative"}}>
                    <img className={this.props.className} src={`data:image;base64,${this.props.value}`} alt="restaurant"></img>
                    <img className={`${this.props.className}-shadow`} src={`data:image;base64,${this.props.value}`}></img>
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
