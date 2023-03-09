import React, { useState, useEffect } from "react";
import moment from "moment";
import { fetchRatings, checkRating } from "../../api/api";
import edit from "../../assets/edit.svg";
import checkmark from "../../assets/check.svg";
import { default as AuthContext } from "../../utils/AuthContextProvider";
import YourStars from "../YourStars/YourStars";

import "./BrewHistoryCard.css";

const BrewHistoryCard = (props) => {
  const auth = React.useContext(AuthContext);
  const [AvgRating, setAvgRating] = useState(0);
  const [AlreadyRated, setAlreadyRated] = useState(false);
 
  useEffect(() => {
    fetchRatings(props.data._id).then((response) => {
      calcAverageRating(response.data);
    });
    checkRating(auth.user.id, props.data._id).then(
      (response) => response.data.length !== 0 && setAlreadyRated(true)
    );
  }, [props.data._id, auth.user.id]);

  const calcAverageRating = (data) => {
    const arr = [];
    data.map((item) => arr.push(item.rating));
    arr.length !== 0 &&
      setAvgRating(Math.round(arr.reduce((a, b) => a + b) / arr.length));
  };

  return (
    <div className="BrewHistoryCard">
      <div className="text">
        <button
          onClick={() => {
            props.triggerPopup(
              props.data.brewName,
              props.data.grind,
              props.data.water,
              props.data.gram,
              props.data.createdAt,
              props.data._id
            );
          }}
        >
          <img src={edit} alt="Edit my ratings"></img>
        </button>
        {AlreadyRated && (
          <div className="check">
            <img src={checkmark} alt="Edit my ratings"></img>
          </div>
        )}
        <p><strong>Brew name:</strong> {props.data.brewName}</p>
        <p><strong>Grind settings:</strong> {props.data.grind}</p>
        <p><strong>Water:</strong> {props.data.water} l</p>
        <p><strong>Gram of coffee:</strong> {props.data.gram}</p>
        <div className="date">
          <p><strong>Brew date:</strong> {moment(props.data.createdAt).format("dddd")}</p>
        </div>
        <YourStars rating={AvgRating} />
      </div>
    </div>
  );
};

export default BrewHistoryCard;
