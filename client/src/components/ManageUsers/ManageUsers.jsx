import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../../api/api";

import "./ManageUsers.css";

const ManageUsers = ({ editUserId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleDeleteUser = (userId) => {
    if (window.confirm("Sure you want to delete this user?")) {
      deleteUser(userId).then(() => {
        getUsers().then((res) => {
          setUsers(res.data);
        });
      });
    }
  };

  const handleEditUser = (userId) => {
    editUserId(userId);
  };

  return (
    <div className="ManageUsers">
      {users.map((user) => (
        <div className="Card" key={user.username}>
          <div className="Username">
            <p>{user.username}</p>
          </div>
          <button
            className="Edit"
            onClick={() => handleEditUser(user._id)}
          >
            Edit
          </button>
          <button
            className="Exit"
            onClick={() => handleDeleteUser(user._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
