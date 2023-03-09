import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "../../api/api";

import "./EditUserForm.css";

const EditUserForm = (props) => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    getUser(props.editUserId).then((res) => {
     
      const { _id, username, email, role } = res.data.user[0];
      setUser({ _id, username, email, role });
    });
  }, [props.editUserId]);

  const handleEditUser = (e) => {
    e.preventDefault();
    updateUser(user._id, user.username, user.email, user.role);
    props.handleEditUserId(null);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="EditUser">
      <form onSubmit={handleEditUser}>
        <div className="Group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="FormControl"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="Group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="FormControl"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="Group">
          <label htmlFor="role">Role</label>
          <select
            className="FormControl"
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit" className="button">
          Edit
        </button>
      </form>
      <button id="exit" className="button" onClick={() => props.handleEditUserId(null)}>
        Exit
      </button>
    </div>
  );
};

export default EditUserForm;
