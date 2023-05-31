import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import FutureLaunch from "./components/FutureLaunch";
import PastLaunch from "./components/PastLaunch";
import "./App.css";

const SpaceXLaunches = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route exact path="/FutureLaunch">
          <FutureLaunch />
        </Route>
        <Route exact path="/PastLaunch">
          <PastLaunch />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default SpaceXLaunches;
