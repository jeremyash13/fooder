import React from "react";
import Chip from "@material-ui/core/Chip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlassCheers,
  faUtensils,
  faHamburger
} from "@fortawesome/free-solid-svg-icons";

export default function PlaceTags(props) {
  const chipTags = tagCount => {
    let chipArray = [];
    for (let i = 0; i < tagCount.length; i++) {
      // chipArray = [...chipArray, <Chip label={props.value[i]} key={i} />];
      if (props.value[i] === 'bar') {
        chipArray = [...chipArray,<Chip label={'Bar'}><FontAwesomeIcon icon={faGlassCheers} color={'red'} key={i}/></Chip>]
      } else if (props.value[i] === 'restaurant') {
        chipArray = [...chipArray, <FontAwesomeIcon icon={faUtensils} key={i}/>]
      } else if (props.value[i] === 'food') {
        chipArray = [...chipArray, <FontAwesomeIcon icon={faHamburger} key={i}/>]
      }
    }
    return chipArray;
  };
  return (
    <div>
        {chipTags(props.value)}
    </div>
  );
}
