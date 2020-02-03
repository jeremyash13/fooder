import React from "react";
import Chip from "@material-ui/core/Chip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlassCheers,
  faUtensils,
  faHamburger,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

const styleTags = {
  backgroundColor: '#E0E5EC',
}

export default function PlaceTags(props) {
  const chipTags = tagCount => {
    let chipArray = [];
    for (let i = 0; i < tagCount.length; i++) {
      if (props.value[i] === 'bar') {
        chipArray = [...chipArray,<Chip style={styleTags} label={'Bar'} className="tags--chip" key={i} icon={<FontAwesomeIcon icon={faGlassCheers} />}/>]
      } else if (props.value[i] === 'restaurant') {
        chipArray = [...chipArray, <Chip style={styleTags} label={'Restaurant'} className="tags--chip" key={i} icon={<FontAwesomeIcon icon={faUtensils} />}/>]
      } else if (props.value[i] === 'food') {
        chipArray = [...chipArray, <Chip style={styleTags} label={'Food'} className="tags--chip" key={i} icon={<FontAwesomeIcon icon={faHamburger} />}/>]
      } else if (props.value[i] === 'night_club') {
        chipArray = [...chipArray, <Chip style={styleTags} label={'Night Club'} className="tags--chip" key={i} icon={<FontAwesomeIcon icon={faMusic} />}/>]
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
