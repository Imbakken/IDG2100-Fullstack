import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import ProtectedRoute from "./utils/ProtectedUserRoute";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";
import BrewStatus from "./components/BrewStatus/BrewStatus";
import UpdateBrewForm from "./components/UpdateBrewForm/UpdateBrewForm";
import CoffeeBeans from "./pages/CoffeeBeans/CoffeeBeans";
import BrewHistory from "./pages/BrewHistory/BrewHistory";
import BrewUpdate from "./pages/BrewUpdate/BrewUpdate";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import ManageUsers from "./pages/UserManager/UserManager";
import Ratings from "./pages/Ratings/Ratings";
import Register from "./pages/Register/Register";
import Main from "./HOC/Main";

const DashboardWithHOC = Main(Dashboard);
const BrewUpdateWithHOC = Main(BrewUpdate);
const UpdateBrewFormWithHOC = Main(UpdateBrewForm);
const BrewStatusWithHOC = Main(BrewStatus);
const RatingsWithHOC = Main(Ratings);
const BrewHistoryWithHOC = Main(BrewHistory);

const App = () => {
  const [Page, setPage] = useState("dashboard");
  const [UpdatedBrewStatus, setUpdatedBrewStatus] = useState({});

const handlePage = (page) => {
  setPage(page);
};

const handleUpdatedBrewStatus = (data) => {
  setUpdatedBrewStatus(data);
};

return (
    <main>
      <Navbar />
      <Header title={Page} />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path="coffeebeans"
            element={ 
            <div className="main">
              <CoffeeBeans handlePage={handlePage} />
            </div>}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="brewhistory"
            element={
            <div className="brewhistory">
              <div className="main">
                <BrewHistoryWithHOC handlePage={handlePage} />
              </div>
            </div>
            }
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="updatebrew"
            element={
              <div className="main">
                <BrewUpdateWithHOC
                  handlePage={handlePage}
                  UpdatedBrewStatus={UpdatedBrewStatus}
                />
                <UpdateBrewFormWithHOC
                  setUpdatedBrewStatus={handleUpdatedBrewStatus}
                />
              </div>
            }
          />
        </Route>
        <Route
          path=""
          element={
            <div className="dashboard">
              <div className="main">
                <DashboardWithHOC handlePage={handlePage} />
                <BrewStatusWithHOC />
              </div>
            </div>
          }
        />
        <Route path="login" 
        element={
          <div className="LoginRegister">
            <Login handlePage={handlePage} />
          </div>} />
        <Route element={<ProtectedAdminRoute />}>
          <Route
            path="manageusers"
            element={
              <div className="manageusers">
                <div className="main">
                  <ManageUsers handlePage={handlePage} />
                </div>
              </div>
            }
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="myratings"
            element={
            <div className="main">
              <RatingsWithHOC handlePage={handlePage} />
            </div>}
          />
        </Route>
        <Route path="register" 
          element={
          <div className="LoginRegister">
            <Register handlePage={handlePage} />
          </div>} />
        <Route path="*" element={<p>Nothing here...</p>} />
      </Routes>
      <Outlet />
    </main>
  );
};

export default App;
