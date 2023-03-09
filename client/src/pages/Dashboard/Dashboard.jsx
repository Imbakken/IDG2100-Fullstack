import React, { useEffect } from "react";
import ThermosStatus from "../../components/ThermosStatus/ThermosStatus";

const Dashboard = (props) => {
  useEffect(() => {
    props.handlePage("Thermos status");
  }, [props]);

  return ( 
    
    <div className="Dashboard">
      <ThermosStatus {...props.brewStatus} avgRating={props.avgRating} />
    </div>
  );
};

export default Dashboard;
