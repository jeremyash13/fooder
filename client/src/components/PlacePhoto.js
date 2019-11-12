import React from 'react'


const fetchPhoto = async (props) => {
    
    const photoreference = props.value;

    const url = "http://localhost:8080/photos";
    const body = {
      photoreference: photoreference
    };
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    //   headers: {
    //     "Content-Type": "image/jpeg"
    //   }
    });
    let photoBuffer = await res.arrayBuffer();
    let photo = arrayBufferToBase64(photoBuffer);
    const base64Flag = 'data:image/jpeg;base64,';
    let final = base64Flag + photo;
    console.log(final);
    return final;
    
  };

  function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
  
    bytes.forEach((b) => binary += String.fromCharCode(b));
  
    return window.btoa(binary);
  };

export default function PlacePhoto(props) {


    return (
        <div>
            <img width="50px" src={fetchPhoto(props)}></img>
        </div>
    )
}
