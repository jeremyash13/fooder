import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

export default function PlacePrice(props) {
  const priceRating = dollarCount => {
    if (dollarCount !== undefined) {
      let dollarArray = [' ',];
      dollarCount = Math.round(dollarCount);
      for (let i = 0; i < dollarCount; i++) {
        dollarArray = [
          ...dollarArray,
          <FontAwesomeIcon icon={faDollarSign} color="green" key={i} />
        ];
      }
      return dollarArray;
    } else {
      return ' Unknown'
    }
  };

  return (
    <div>
      <p>Price:{priceRating(props.value)}</p>
    </div>
  );
}
