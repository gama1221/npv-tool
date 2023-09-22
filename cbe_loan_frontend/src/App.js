import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import AuthService from "./services/auth.service";
// import Login from "./Components/Login";

// import Register from "./Components/Register";
// import Home from "./Components/Home";
// import Profile from "./Components/Profile";
// import BoardUser from "./Components/BoardUser";
// import BoardModerator from "./Components/BoardModerator";
// import BoardAdmin from "./Components/BoardAdmin";
// import NPV from "./Components/Temenos/NPV";
import NPV from "./Components/Temenos/NPV";
// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import CustomerComponent from "./Components/CustomerComponent";
import LoanListComponent from "./Components/LoanListComponent";
import CollateralListComponent from "./Components/CollateralListComponent";
// import CBEAmortization from "./Components/CBEAmortization";
import { NavLink } from "react-router-dom";
// import SOAP from "./SOAP";
// import SoapApiComponent from "./Temenos/SoapApiComponent";
// import NumberConversion from "./Temenos/NumberConversion";
// import { C2F } from "./Temenos/Service";
// import CalculatroPage from "./Temenos/CalculatroPage";
// import Api from "./Api";
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
        {/* {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link text-white">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link text-white" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link text-white">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link text-white">
                Sign Up
              </Link>
            </li>
          </div>
        )} */}
      </nav>

      <div className="container mt-2">
        <Routes>
          {/* <Route exact path={"/"} element={<Login />} />
          <Route exact path={"/login"} element={<Login />} /> */}
          <Route exact path={""} element={<CustomerComponent />} />
          <Route exact path={"/"} element={<CustomerComponent />} />
          <Route exact path={"/customer"} element={<CustomerComponent />} />
          {/* <Route exact path="/home" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} /> */}
          <Route path="/loan/:id" element={<LoanListComponent />}></Route>
          <Route path="/collaterals/:id" element={<CollateralListComponent />}></Route>
          <Route path="/npv" element={<NPV />} />
          {/* <Route path="/test" element={<CBEAmortization />}></Route> */}
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
      {/* <SOAP /> */}
      {/* <Loan /> */}
      {/* <NumberConversion /> */}
      {/* <SoapApiComponent /> */}
      {/* <User /> */}
      {/* <Calculator /> */}
      {/* <C2F /> */}
      {/* <CalculatroPage /> */}
      {/* <CalculatorComponent /> */}
    </div>
  );
};

export default App;