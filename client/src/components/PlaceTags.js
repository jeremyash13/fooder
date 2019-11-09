import React from "react";
import Chip from "@material-ui/core/Chip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlassCheers,
  faUtensils,
  faHamburger,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

export default function PlaceTags(props) {
  const chipTags = tagCount => {
    let chipArray = [];
    for (let i = 0; i < tagCount.length; i++) {
      if (props.value[i] === 'bar') {
        chipArray = [...chipArray,<Chip label={'Bar'} className="tags--chip" key={i} icon={<FontAwesomeIcon icon={faGlassCheers} />}/>]
      } else if (props.value[i] === 'restaurant') {
        chipArray = [...chipArray, <Chip label={'Restaurant'} className="tags--chip" key={i} icon={<FontAwesomeIcon icon={faUtensils} />}/>]
      } else if (props.value[i] === 'food') {
        chipArray = [...chipArray, <Chip label={'Food'} className="tags--chip" key={i} icon={<FontAwesomeIcon icon={faHamburger} />}/>]
      } else if (props.value[i] === 'night_club') {
        chipArray = [...chipArray, <Chip label={'Night Club'} className="tags--chip" key={i} icon={<FontAwesomeIcon icon={faMusic} />}/>]
      }
    }
    return chipArray;
  };
  return (
    <div className="tags--wrapper">
        {chipTags(props.value)}
    </div>
  );
}
