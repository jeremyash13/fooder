import React, { Component } from 'react'

export default class PlacePhoto extends Component {

    constructor(props){
        super(props);

        this.state = {
            imageURL: ''
        }
    }
    componentDidUpdate(props) {
        if(this.state.imageURL === '') {
            this.fetchPhoto(props);
        }
    }
    fetchPhoto = async (props) => {
    
    const photoreference = props.value;
    
    const url = "http://localhost:8080/photos";
    const body = {
    //   photoreference: photoreference
    photoreference: 'CmRaAAAA4VHkY-1LyjPjNs2gaGgaWy0bZkc5HaXu3aK1O705kyLz-dudTb_k-Nw2EvlGXEBlKEosFd-ZbCLGAtebdK_14vZ4Y-zjURS987XPMGP2iSczlHI9uAZufqGLnkdsC1O_EhBQeVos2Rt4eZVda-B-vBIFGhRNzcZZrzLO2F-GssOoP_uyaMYVLw'
    };
    const photoURL = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    //   headers: {
    //     "Content-Type": "image/jpeg"
    //   }
    });
    console.log(photoURL)
    this.setState({imageURL: photoURL})
    
    };

    render() {
        return (
            <div>
                <img src={this.state.imageURL}></img>
            </div>
        )
    }
}
