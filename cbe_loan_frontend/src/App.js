import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./services/auth.service";
import NPV from "./Components/Temenos/NPV";
import EventBus from "./common/EventBus";
import CustomerComponent from "./Components/CustomerComponent";
import LoanListComponent from "./Components/LoanListComponent";
import CollateralListComponent from "./Components/CollateralListComponent";
import { NavLink } from "react-router-dom";
const App = () => {

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {

    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  return (
    <div>
      <nav className="navbar navbar-expand npv-primary-color" >
        <p className="text-white" style={{ marginLeft: "10px" }}>
          NPV Tool
        </p>
        <div className="navbar-nav mr-auto ">
          <li className="nav-item glow-on-hover">
            <NavLink to={"/customer"} className="text-center mx-5  text-white" style={{ textDecoration: 'none' }}>
              Standalone
            </NavLink>
          </li>
          <li className="nav-item glow-on-hover">
            <NavLink to={"/npv"} className="text-center mx-2 text-white" style={{ textDecoration: 'none' }}>
              Temenos
            </NavLink>
          </li>
        </div>
      </nav>

      <div className="container mt-2">
        <Routes>
          <Route exact path={""} element={<CustomerComponent />} />
          <Route exact path={"/"} element={<CustomerComponent />} />
          <Route exact path={"/customer"} element={<CustomerComponent />} />
          <Route path="/loan/:id" element={<LoanListComponent />}></Route>
          <Route path="/collaterals/:id" element={<CollateralListComponent />}></Route>
          <Route path="/npv" element={<NPV />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;