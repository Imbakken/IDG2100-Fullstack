import { useState, useEffect } from "react";
import { createBean } from "../../api/api";
import coffeebeans from "../../assets/coffeebeans.svg";

import "./AddBeanForm.css";

const AddBeanForm = (props) => {
  const [CoffeeBean, setCoffeeBean] = useState({
      name: "",
      brand: "",
      roastProfile: null,
      price: null,
      country: "",
      beanType: "", 
      metersAboveSeaLevel: null,
      aroma: ""
  });
  useEffect(() => {
    setCoffeeBean({ name: "", brand: "", roastProfile: null, price: null, country: "", beanType: "", metersAboveSeaLevel: null, aroma: "" });
  }, [props.coffeeBeans]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, brand, roastProfile, price, country, beanType, metersAboveSeaLevel, aroma } = CoffeeBean;

    try {
      const response = await createBean(name, brand, roastProfile, price, country, beanType, metersAboveSeaLevel, aroma);
      if (!response.errors) {
        alert("Bean added!");
      }
    } catch (error) {
      alert("Error adding bean");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCoffeeBean({
      ...CoffeeBean,
      [e.target.name]: e.target.value,
    });
  };

  return (
    
    <form className="AddBeanForm" onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="PlaceForm">
          <div className="BeansImg">
            <img src={coffeebeans} alt="coffee beans"></img>
          </div>
          <label htmlFor="name">Name</label>
          <input name="name" type="text" onChange={handleChange} required />

          <label htmlFor="brand">Brand</label>
          <input name="brand" type="text" onChange={handleChange} required />

          <label htmlFor="roastProfile">Roast profile</label>
          <select name="roastProfile" onChange={handleChange} required >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <label htmlFor="price">Price</label>
          <input name="price" type="number" onChange={handleChange} required />
        
          <label htmlFor="country">Country</label>
          <input name="country" type="text" onChange={handleChange} required />

          <label htmlFor="beanType">Bean type</label>
          <input name="beanType" type="text" onChange={handleChange} required />

          <label htmlFor="metersAboveSeaLevel">Meters above sea level</label>
          <input name="metersAboveSeaLevel" type="number" onChange={handleChange} required />

          <label htmlFor="aroma">Aroma</label>
          <input name="aroma" type="text" onChange={handleChange} required />
      
          <input type="submit" value="Add a new coffee bean" />
       </div>
    </form>
    
  );
};

export default AddBeanForm;
