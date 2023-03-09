import React, { useState, useEffect } from "react";
import { default as AuthContext } from "../../utils/AuthContextProvider";
import { getAllBrews } from "../../api/api";

import BrewHistoryCard from "../../components/BrewHistoryCard/BrewHistoryCard";
import EditStarsPopup from "../../components/EditStarsPopup/EditStarsPopup";

import "./BrewHistory.css"; 

const BrewHistory = (props) => {
  const auth = React.useContext(AuthContext);

  const [YourRatings, setYourRatings] = useState([]);
  const [YourRatingsFiltered, setYourRatingsFiltered] = useState([]);
  const [FilterGrind, setFilterGrind] = useState("all");
  const [FilterWater, setFilterWater] = useState("all");
  const [Loading, setLoading] = useState(true);
  const [Popup, setPopup] = useState(false);
  const [PopupData, setPopupData] = useState({});
  const [SortDate, setSortDate] = useState("desc");
  
  useEffect(() => {
    getAllBrews().then((response) => {
      setYourRatings(response.data);
      setYourRatingsFiltered(response.data);
      setLoading(false);
  });

    props.handlePage("Brew history");
  }, [props, auth.user.id]);

  const triggerPopup = ( name, grind, water, gram, createdAt, brewId) => {
    setPopup(true);
    setPopupData({
      name: name,
      grind: grind,
      water: water,
      gram: gram,
      createdAt: createdAt,
      brewId: brewId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await getAllBrews().then((response) => {
      setYourRatings(response.data);
      setLoading(false);
    });

    let array = YourRatings;

    if (FilterGrind!== "all" && FilterWater === "all") {
      array = array.filter((data) => data.grind === Number(FilterGrind));
      sortByDate(array);
    } else if (FilterWater !== "all" && FilterGrind=== "all") {
      array = array.filter((data) => data.water === Number(FilterWater));
      sortByDate(array);
    } else if (FilterGrind!== "all" && FilterWater!== "all") {
      array = array.filter(
        (data) =>
          data.grind === Number(FilterGrind) &&
          data.water === Number(FilterWater) 
      );
      sortByDate(array);
    } else if (FilterGrind=== "all" && FilterWater === "all") {
      sortByDate(array);
    }
  };

  const sortByDate = (array) => {
    const sortDateDesc = []
      .concat(array)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

    const sortDateAsc = []
      .concat(array)
      .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));

    SortDate === "desc" && setYourRatingsFiltered(sortDateDesc);
    SortDate === "asc" && setYourRatingsFiltered(sortDateAsc);
  };

  return (
    <div className="BrewHistory">
    <div className="BrewContainer">
        <div className="IntroContainer">
          <p id="intro">
          Here is every brew created! The stars indicates the average rating of each 
          brew. Edit your rating by clicking on the pen. You can also see the brews you have
          already rated, indicated by a checkmark. 
          </p>
        </div>
        <div className="SortContainer">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h2>Filters</h2>

            <label htmlFor="sortdate">Sort by date created</label>
            <select onChange={(e) => setSortDate(e.target.value)} name="sortdate">
              <option value="desc">New to old</option>
              <option value="asc">Old to new</option>
            </select>

            <label htmlFor="sortgrinding">Filter by grind settings</label>
            <select
              onChange={(e) => setFilterGrind(e.target.value)}
              name="sortgrinding"
            >
              <option value="all">All</option>
              <option value={1}>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>

            <label htmlFor="sortwater">Filter by water level</label>
            <select
              onChange={(e) => setFilterWater(e.target.value)}
              name="sortwater"
            >
              <option value="all">All</option>
              <option value="0.5">0.5</option>
              <option value="1.1">1.1</option>
              <option value="2.2">2.2</option>
            </select>

            <input type="submit" value="Filter" />
          </form>
          </div>
      </div>
        <div className="BrewHistoryContainerGrid">
          <div className="BrewHistoryContainer">
            {!Loading &&
              YourRatingsFiltered.map((item) => (
                <BrewHistoryCard
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
                grind={PopupData.grind}
                water={PopupData.water}
                gram={PopupData.gram}
                createdAt={PopupData.createdAt}
                id={PopupData.brewId}
                fetchData={props.fetchData}
              />
            )}
        </div>
      </div>
     </div>
    
  );
};

export default BrewHistory;
