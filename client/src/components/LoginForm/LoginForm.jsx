import React from "react";
import { NavLink } from "react-router-dom";

import "./LoginForm.css";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.onSubmit(username, password);
    this.setState({
      username: "",
      password: "",
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form className="LoginForm" onSubmit={this.handleSubmit}>
        <label>
          Username
          <br />
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Password
          <br />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Login" id="submit" />
        <div className="registerLink">
          <p>Don't have an account?</p>
          <div className="Link"><NavLink to="/register">Register here</NavLink></div>
        </div>
      </form>
    );
  }
}
