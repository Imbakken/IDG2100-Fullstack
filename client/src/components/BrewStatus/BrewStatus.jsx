import React, { useState, useEffect } from "react";
import { default as AuthContext } from "../../utils/AuthContextProvider";
import EditStars from "../EditStars/EditStars";

import "./BrewStatus.css";

const BrewStatus = (props) => {
  const auth = React.useContext(AuthContext);
  const [YourStars, setYourStars] = useState(0);
  const [User, setUser] = useState(null);

  useEffect(() => {
    auth.user && setUser(auth.user);
  }, []);

  const setStars = (item) => {
    setYourStars(item);
  };

  return (
    <div className="BrewStatus">
      <div className="info">
        <p><strong>Producers coffeename</strong></p>
        <p id="small">{props.brewStatus.coffeeName}</p>
      </div>
      <div className="info">
        <p><strong>Grinding settings</strong></p>
        <p id="small">{props.brewStatus.grind}</p>
      </div>
      <div className="info">
        <p><strong>Water level</strong></p>
        <p id="small">{props.brewStatus.water}</p>
      </div>
      <div className="info">
        <p><strong>Gram of coffee</strong></p>
        <p id="small">{props.brewStatus.gram}</p>
      </div>

      {User && (
        <>
          <EditStars setStars={setStars}></EditStars>
          <button onClick={() => {props.setRating(YourStars);}} >
            Rate this brew
          </button>
        </>
      )}
    </div>
  );
};

export default BrewStatus;
