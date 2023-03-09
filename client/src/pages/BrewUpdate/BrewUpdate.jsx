import React, { useEffect } from "react";
import ThermosStatus from "../../components/ThermosStatus/ThermosStatus";

const BrewUpdate = (props) => {
  useEffect(() => {
    props.handlePage("Update brew");
  });

  return (
    <div className="BrewUpdate">
      <ThermosStatus {...props.brewStatus} />
    </div>
  );
};

export default BrewUpdate;
