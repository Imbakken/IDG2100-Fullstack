import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { default as AuthContext } from "./AuthContextProvider";

const ProtectedRoute = ({ children }) => {
  let auth = useContext(AuthContext);
  let location = useLocation();
  let { pathname } = location;

  return (
    <>
      {auth.isLoading && <p>Loading...</p>}
      {auth.isAuth && (children ? children : <Outlet />)}
      {!auth.isLoading && !auth.isAuth && pathname !== "/login" && (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;
