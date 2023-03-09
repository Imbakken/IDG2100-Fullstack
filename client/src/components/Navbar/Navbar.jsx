import React from "react";
import { NavLink } from "react-router-dom";
import { default as AuthContext } from "../../utils/AuthContextProvider";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

const AuthConsumer = AuthContext.Consumer;

const Navbar = (props) => {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  }; 

return (
    <div className = "Navbar">
      <AuthConsumer>
        {({ isAuth, user }) => (
          <> 
          <div className="NavbarLink">
            <ul>
              <NavLink to="/">
                <li>Homepage</li>
              </NavLink>

              {isAuth && (
                <NavLink to="/myratings">
                  <li>My ratings</li>
                </NavLink>
              )}
              {isAuth && (
                <NavLink to="/brewhistory">
                  <li>Brew history</li>
                </NavLink>
              )}
              {isAuth && (
                <NavLink to="/updatebrew">
                  <li>Update brew</li>
                </NavLink>
              )}
              {isAuth && user.role[0] === "admin" && (
                <NavLink to="/manageusers">
                  <li>Manage users</li>
                </NavLink>
              )}
              {isAuth && (
                <NavLink to="/coffeebeans">
                  <li>Coffee beans</li>
                </NavLink>
              )}  
            </ul>
            </div>
            <div className="NavbarUser">
              {user ? (
                <p>Logged in as {user.username}</p>
              ) : (
                <p>You are not logged in</p>
              )}
              {auth.isAuth ? (
                <button
                  onClick={() => {
                    handleClick();
                    auth.logoutUser();
                  }}
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </>
        )}
      </AuthConsumer>
    </div>
  );
};

export default Navbar;

