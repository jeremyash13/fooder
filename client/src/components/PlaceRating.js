import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const starRating = starCount => {
  let starArray = [];
  starCount = Math.round(starCount)
  for (let i = 0; i < starCount; i++) {
      starArray = [
          ...starArray,
          <FontAwesomeIcon icon={faStar} color="yellow" key={i}/>
        ];
  }
  return starArray;
};
export default function PlaceRating(props) {
  // convert me to Pure Component to see if that renders me only once vs three times on app load

  return (
    <div>
      <p>Rating:{starRating(props.value)}</p>
    </div>
  );
}
