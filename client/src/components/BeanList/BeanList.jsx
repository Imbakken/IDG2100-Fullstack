import { useState, useEffect } from "react";
import { getBeans } from "../../api/api";

import "./BeanList.css";

const BeanList = () => {
  const [coffeeBeans, setCoffeeBeans] = useState([]);

  useEffect(() => {
    getBeans()
      .then((res) => {
        setCoffeeBeans(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="BeanList">
      <h1>List of coffee beans</h1>
      <ul>
        {coffeeBeans.reverse().map((coffeeBean) => {
          return (
            <div key={coffeeBean._id} className="BeanCard">
              <h2>{coffeeBean.name}</h2>
              <p><strong>Brand:</strong> {coffeeBean.brand}</p>
              <p><strong>Roast profile:</strong> {coffeeBean.roastProfile}</p>
              <p><strong>Price:</strong> {coffeeBean.price} NOK</p>
              <p><strong>Country:</strong> {coffeeBean.country}</p>
              <p><strong>Bean type:</strong> {coffeeBean.beanType}</p>
              <p><strong>Meters above sea level:</strong> {coffeeBean.metersAboveSeaLevel}</p>
              <p><strong>Aroma:</strong> {coffeeBean.aroma}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default BeanList;
