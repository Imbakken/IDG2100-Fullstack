import React, { useState } from "react";
import { updateRating, checkRating, postRating } from "../../api/api";
import { default as AuthContext } from "../../utils/AuthContextProvider";
import EditStars from "../EditStars/EditStars";

import "./EditStarsPopup.css";

const EditStarsPopup = (props) => {
  const auth = React.useContext(AuthContext);
  const [YourStars, setYourStars] = useState(0);

  const setStars = (item) => {
    setYourStars(item);
  };


  const handleUpdate = () => {
    updateRating(auth.user.id, props.id, YourStars);
    props.fetchData();
  };


  const handleCreate = () => {
    postRating(
      props.id,
      auth.user.id,
      YourStars,
      props.name,
      props.grind,
      props.water,
      props.gram,
      props.createdAt
    );
    props.fetchData();
  };

  return (
    <div className="EditStarsPopup">
      <h2>{props.name}</h2>
      <EditStars setStars={setStars}></EditStars>
      <button
        onClick={() => {
          checkRating(auth.user.id, props.id).then((response) =>
            response.data.length !== 0 ? handleUpdate() : handleCreate()
          );
        }}
      >
        Update rating
      </button>
    </div>
  );
};

export default EditStarsPopup;
