import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const Register = (props) => {
  useEffect(() => {
    props.handlePage("Register");
  }, [props]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="Register">
      <RegisterForm onSubmit={handleClick} />
    </div>
  );
};

export default Register;
