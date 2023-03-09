import React, { useEffect } from "react";
import { useContext } from "react";
import { default as AuthContext } from "../../utils/AuthContextProvider";

import AddBeanForm from "../../components/AddBeanForm/AddBeanForm";
import BeanList from "../../components/BeanList/BeanList";

const CoffeeBeans = (props) => {
  useEffect(() => {
    props.handlePage("Add coffee bean");
  }, [props]);


  const auth = useContext(AuthContext);

  return (
    <div className="CoffeeBeans">
      {auth.isAuth && auth.user.role[0] === "admin" ? (
        <>
          <AddBeanForm />
          <BeanList />
        </>
      ) : (
        <BeanList />
      )}
    </div>
  );
};

export default CoffeeBeans;
