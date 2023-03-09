/** Inspiration from 
https://www.npmjs.com/package/react-rating-stars-component
https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6 
**/

import React, { useState, useEffect } from "react";
import { ReactComponent as Star } from "../../assets/ratingstar.svg";

import "./Stars.css";

const Stars = (props) => {
  const [Stars, setStars] = useState([
    <Star key={1} fill="#ABAA97" />,
    <Star key={2} fill="#ABAA97" />,
    <Star key={3} fill="#ABAA97" />,
    <Star key={4} fill="#ABAA97" />,
    <Star key={5} fill="#ABAA97" />,
    <Star key={6} fill="#ABAA97" />,
  ]);

  const [RoundedRating, setRoundedRating] = useState(0);

  useEffect(() => {
    setRoundedRating(Math.round(props.avgRating));
    switch (RoundedRating) {
      case 1:
        setStars([
          SelectedStar(1),
          UnselectedStar(2),
          UnselectedStar(3),
          UnselectedStar(4),
          UnselectedStar(5),
          UnselectedStar(6),
        ]);
        break;
      case 2:
        setStars([
          SelectedStar(1),
          SelectedStar(2),
          UnselectedStar(3),
          UnselectedStar(4),
          UnselectedStar(5),
          UnselectedStar(6),
        ]);
        break;
      case 3:
        setStars([
          SelectedStar(1),
          SelectedStar(2),
          SelectedStar(3),
          UnselectedStar(4),
          UnselectedStar(5),
          UnselectedStar(6),
        ]);
        break;
      case 4:
        setStars([
          SelectedStar(1),
          SelectedStar(2),
          SelectedStar(3),
          SelectedStar(4),
          UnselectedStar(5),
          UnselectedStar(6),
        ]);
        break;
      case 5:
        setStars([
          SelectedStar(1),
          SelectedStar(2),
          SelectedStar(3),
          SelectedStar(4),
          SelectedStar(5),
          UnselectedStar(5),
        ]);
        break;
      case 6:
        setStars([
          SelectedStar(1),
          SelectedStar(2),
          SelectedStar(3),
          SelectedStar(4),
          SelectedStar(5),
          SelectedStar(6),
        ]);
        break;
      default:
        break;
    }
  }, [props.avgRating, RoundedRating]);

  const UnselectedStar = (item) => {
    return <Star key={item} fill="#ABAA97" />;
  };

  const SelectedStar = (item) => {
    return <Star key={item} fill="#6A694F" />;
  };

  return <div className="Stars">{Stars}</div>;
};

export default Stars;
