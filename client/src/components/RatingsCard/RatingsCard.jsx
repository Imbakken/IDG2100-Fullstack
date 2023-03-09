import React from "react";
import moment from "moment";
import YourStars from "../YourStars/YourStars";
import edit from "../../assets/edit.svg";

import "./RatingsCard.css";

const RatingsCard = (props) => {
  return (
    <div className="RatingsCard">
      <div className="text">
        <button
          onClick={() => {
            props.triggerPopup(props.data.brewName, props.data.brewId);
          }}
        >
          <img src={edit} alt="Edit my ratings"></img>
      
        </button>
        <p>Brew name: {props.data.brewName}</p>
        <p>Grind settings: {props.data.grind}</p>
        <p>Water: {props.data.water} l</p>
        <p>Gram of coffee: {props.data.gram} g</p>
        <p>{moment(props.data.createdAt).format("dddd")}</p>
        <YourStars rating={props.data.rating} />
  
      </div>
    </div>
  );
};

export default RatingsCard;
