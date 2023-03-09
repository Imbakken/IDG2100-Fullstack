/** Inspiration from 
https://www.npmjs.com/package/react-rating-stars-component
https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6 
**/

import React, { useState, useEffect } from "react";
import { ReactComponent as Star } from "../../assets/ratingstar.svg";

import "./YourStars.css";

const YourStars = (props) => {
  const [YourStars, setYourStars] = useState([
    <Star key={1} fill="#ABAA97" />,
    <Star key={2} fill="#ABAA97" />,
    <Star key={3} fill="#ABAA97" />,
    <Star key={4} fill="#ABAA97" />,
    <Star key={5} fill="#ABAA97" />,
    <Star key={6} fill="#ABAA97" />,
  ]);

  useEffect(() => {
    switch (props.rating) {
      case 1:
        setYourStars([
          SelectedStar(1),
          UnselectedStar(2),
          UnselectedStar(3),
          UnselectedStar(4),
          UnselectedStar(5),
          UnselectedStar(6),
        ]);
        break;
      case 2:
        setYourStars([
          SelectedStar(1),
          SelectedStar(2),
          UnselectedStar(3),
          UnselectedStar(4),
          UnselectedStar(5),
          UnselectedStar(6),
        ]);
        break;
      case 3:
        setYourStars([
          SelectedStar(1),
          SelectedStar(2),
          SelectedStar(3),
          UnselectedStar(4),
          UnselectedStar(5),
          UnselectedStar(6),
        ]);
        break;
      case 4:
        setYourStars([
          SelectedStar(1),
          SelectedStar(2),
          SelectedStar(3),
          SelectedStar(4),
          UnselectedStar(5),
          UnselectedStar(6),
        ]);
        break;
      case 5:
        setYourStars([
          SelectedStar(1),
          SelectedStar(2),
          SelectedStar(3),
          SelectedStar(4),
          SelectedStar(5),
          UnselectedStar(6),
        ]);
        break;
      case 6:
        setYourStars([
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
  }, [props.rating]);

  const UnselectedStar = (item) => {
    return <Star key={item} fill="#ABAA97" />;
  };

  const SelectedStar = (item) => {
    return <Star key={item} fill="#6A694F" />;
  };

  return <div className="YourStars">{YourStars}</div>;
};

export default YourStars;
