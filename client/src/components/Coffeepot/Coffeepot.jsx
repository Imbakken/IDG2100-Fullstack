// Directly inspired by Carlos's lecture 11, with activities. 

import React, { useState, useEffect } from "react";
import coffeepot from "../../assets/coffeepot.svg";

import "./Coffeepot.css";

const Coffeepot = (props) => {
  const [Height, setHeight] = useState("dashboard");

  useEffect(() => {
    handleCoffeeHeight();
  });

  const handleCoffeeHeight = () => {
    switch (props.water) {
      case 2.2:
        setHeight("50%");
        break;
      case 1.1:
        setHeight("30%");
        break;
      case 0.5:
        setHeight("15%");
        break;
      default:
        setHeight("0%");
        break;
    }
  };

  return (
    <div className="Coffeepot">
      <div className="volume" style={{ height: `${Height}` }}></div>
      <img src={coffeepot} alt="coffee pot"></img>
    </div>
  );
};

export default Coffeepot;
