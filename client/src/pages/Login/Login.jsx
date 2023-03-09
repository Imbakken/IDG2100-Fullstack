import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { default as AuthContext } from "../../utils/AuthContextProvider";
import LoginForm from "../../components/LoginForm/LoginForm";

import "./Login.css";

const Login = (props) => {
  let navigate = useNavigate();
  let location = useLocation();

  let form = location.state?.form?.pathname || "/";

  useEffect(() => {
    props.handlePage("Login");
  }, [props]);

  const [errors, setErrors] = useState(null);

  const auth = React.useContext(AuthContext);

  const handleClick = async (username, password) => {
    try {
      
      const response = await auth.loginUser({ username, password });
      if (response) {
        setErrors(response);
      } else {
        navigate(form);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Login">
      {
        auth.user && auth.user.username ? navigate("/") : null
      }
      <LoginForm onSubmit={handleClick} form={form} />
      {errors && <p>Error 400: username or password incorrect</p>}
    </div>
  );
};

export default Login;