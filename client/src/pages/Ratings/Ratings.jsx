import React, { useState, useEffect } from "react";
import { default as AuthContext } from "../../utils/AuthContextProvider";
import { fetchYourRatings } from "../../api/api";
import RatingsCard from "../../components/RatingsCard/RatingsCard";
import EditStarsPopup from "../../components/EditStarsPopup/EditStarsPopup";

import "./Ratings.css";

const Ratings = (props) => {
  const auth = React.useContext(AuthContext);

  const [YourRatings, setYourRatings] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Popup, setPopup] = useState(false);
  const [PopupData, setPopupData] = useState({});


  useEffect(() => {
    fetchYourRatings(auth.user.id).then((response) => {
      setYourRatings(response.data);
      setLoading(false);
    });
    props.handlePage("My ratings");
  }, [props, auth.user.id]);

  const triggerPopup = (name, brewId) => {
    setPopup(true);
    setPopupData({ name: name, brewId: brewId });
  };

  return (
    <div className="Ratings">
      <p id="intro">
    Here is all the brews you have rated. Edit a rating by clicking on the pen.
      </p>
      <div className="RatingsContainer">
        <div className="EditRating">
          {!Loading &&
            YourRatings.map((item) => (
              <RatingsCard
                key={item.brewName}
                data={item}
                triggerPopup={triggerPopup}
              />
            ))}
        </div>
        <div className="EditStars">
          {Popup && (
            <EditStarsPopup
              name={PopupData.name}
              id={PopupData.brewId}
              fetchData={props.fetchData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ratings;
