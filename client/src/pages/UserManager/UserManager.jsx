import React, { useEffect, useState } from "react";
import ManageUsers from "../../components/ManageUsers/ManageUsers";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm";

import "./UserManager.css"

const UserManager = (props) => {
  useEffect(() => {
    props.handlePage("Manage users");
  }, [props]);

  const [editUserId, setEditUserId] = useState(null);

  const handleEditUserId = (userId) => {
    setEditUserId(userId);
  };

  return (
    <div className="UserManager">
      <div className="EditUserForm">
      <ManageUsers editUserId={handleEditUserId} />
        {editUserId && (
          <EditUserForm
            editUserId={editUserId}
            handleEditUserId={handleEditUserId}
          />
        )}
      </div> 
      <div className="CreateUserForm">
        <CreateUserForm />
      </div>
    </div>
  );
};

export default UserManager;