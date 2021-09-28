import React, { useEffect } from "react";
import { Router } from "@reach/router";

import Login from "./components/Login/Login";
import Main from "./components/Main/Main";

import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.js";
//import "bootstrap-icons/font/bootstrap-icons.css";
import "antd/dist/antd.css";
import "antd-button-color/dist/css/style.css";

import "./App.scss";

const App = () => {
  useEffect(() => {}, []);
  return (
    <Router>
      <Main default />
      <Login path="/login" />
    </Router>
  );
};

export default App;
