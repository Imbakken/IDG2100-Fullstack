import React, { useState, useEffect } from "react";
import { createBrew } from "../../api/api";
import { default as AuthContext } from "../../utils/AuthContextProvider";

import "./UpdateBrewForm.css";

const UpdateBrewForm = (props) => {
  const auth = React.useContext(AuthContext);
  const [ brewStatus, setBrewStatus] = useState({
    name: "",
    bean: "",
    grind: null,
    water: null,
  });

 
  useEffect(() => {
    setBrewStatus({ bean: props.coffeeBeans[0], grind: 1, water: 0.5 });
  }, [props.coffeeBeans, auth.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, bean, grind, water, gram } = brewStatus;

    try {
      const response = await createBrew({
        brewName: name,
        coffeeName: bean,
        grind: grind,
        water: water,
        gram: gram,
        User: auth.user.username,
    });

      const updatedBrewStatus = {
        brewName: name,
        coffeeName: bean,
        grind: grind,
        water: water,
        gram: gram,
        User: auth.user.username,
    };

  props.setUpdatedBrewStatus(updatedBrewStatus);

    if (!response.errors) {
      alert("Brew added!");
    }
    } catch (error) {
      alert("Error adding brew");
    }
  };


  const handleChange = (e) => {
    e.preventDefault();
    setBrewStatus({
      ...brewStatus,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="UpdateBrewForm"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    > 
    <div className="PlaceForm">
      <div className="BrewFormTitle">
        <h4>Create a new brew</h4>
      </div>
        <label htmlFor="name">Brew name</label>
        <input name="name" type="text" onChange={handleChange} required />

        <label htmlFor="bean">Producers coffee name</label>
        <select name="bean" onChange={handleChange} required >
          {props.coffeeBeans.map((bean) => (
            <option key={bean}>{bean}</option>
          ))}
        </select>

        <label htmlFor="grind">Grind settings</label>
        <select name="grind" onChange={handleChange} required >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>

        <label htmlFor="water">Liter coffee</label>
        <select name="water" onChange={handleChange} required >
          <option value="0.5">0.5</option>
          <option value="1.1">1.1</option>
          <option value="2.2">2.2</option>
        </select>

        <label htmlFor="gram">Gram of coffee</label>
        <input name="gram" type="number" onChange={handleChange} required />

        <input type="submit" value="Create" id="submit"></input>
    </div>
    </form>
  );
};

export default UpdateBrewForm;
