// Directly inspired by Carlos's lecture 11, with activities. 

import React, { useState, useEffect } from "react";
import moment from "moment";
import Stars from "../Stars/Stars";
import Coffeepot from "../Coffeepot/Coffeepot";

import "./ThermosStatus.css";

const ThermosStatus = (props) => {
  const [Temperature, setTemperature] = useState("Cold");
  useEffect(() => {
    handleStatus(moment().diff(props.createdAt, "minutes"));
  });

  const handleStatus = (timeSince) => {
    switch (true) {
      case timeSince < 30:
        setTemperature("Hot");
        break;
      case timeSince < 60:
        setTemperature("Warm");
        break;
      case timeSince < 90:
        setTemperature("Cold");
        break;
      default:
        break;
    }
  };

  return (
    <div className="ThermosStatus">
      <div className="ThermosTitle">
        <h2>{props.brewName}</h2>
        <h3>Brewed by {props.User}</h3>
        <Stars avgRating={props.avgRating} />
      </div>
      <div className="CoffeeStatus">
        <div className="LeftSide">
          <Coffeepot water={props.water} />
        </div>
        <div className="RightSide">
          <div className="CoffeeStats">
            <p><strong>Brewed:</strong></p>
            <p>{moment(props.createdAt).format("dddd")}</p>
          </div>
          <div className="CoffeeStats">
            <p><strong>Time:</strong></p>
            <p>{moment(props.createdAt).format("LT")}</p>
          </div>
          <div className="CoffeeStats">
            <p><strong>Liters brewed:</strong></p>
            <p>{props.water} L</p>
          </div>
          <div className="CoffeeStats">
            <p><strong>Coffee left:</strong></p>
            <p>1.1 L</p>
          </div>
          <div className="CoffeeStats">
            <p><strong>Status:</strong></p>
            <p>{Temperature}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermosStatus;
