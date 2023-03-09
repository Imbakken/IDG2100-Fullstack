import React from "react";
import { useState } from "react";
import { createUser } from "../../api/api";

import "./CreateUserForm.css";

const CreateUserForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState(null);
    const [messages, setMessages] = useState(null);

const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
};
 
const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrors("Passwords do not match");
    } else {
      try {
        const response = await createUser(username, email, password);
        if (response.status !== 200) {
          setErrors(response.status);
        } else {
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          setMessages("User created successfully!");

        }
       
      } catch (err) {
        setErrors("Error 400: Bad request, please enter valid credentials");
        console.log(err);
      }
    }
  };

  return (
    <div className="CreateUser">
      <form onSubmit={handleSubmit}>
      <h2>Create a new user</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" value="Create a new user" />
      </form>
      {errors !== undefined && <p>{errors}</p>}
      {messages !== undefined && <p>{messages}</p>}
    </div>
  );
};

export default CreateUserForm;