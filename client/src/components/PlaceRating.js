import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const starRating = (starCount) => {
    
    for (let i = 0; i < starCount; i++) {
        return <FontAwesomeIcon icon={faStar} />
    }

}
export default function PlaceRating(props) {
    // convert me to Pure Component to see if that renders me only once vs three times on app load

    return (
        <div>
            {/* <p>{`Rating: ${props.value}`}</p> */}
            {/* <p>{`Rating: ${starRating(props.value)}`}</p> */}
            {starRating(props.value)}
        </div>
    )
}
