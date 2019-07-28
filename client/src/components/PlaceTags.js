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
      chipArray = [...chipArray, <Chip label={props.value[i]} key={i} />];
    }
    return chipArray;
  };
  return (
    <div>
        {chipTags(props.value)}
    </div>
  );
}
