import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import GelecekFirlatma from "./components/GelecekFırlatma";
import GecmisFirlatma from "./components/GecmisFırlatma";
import "./App.css";

const SpaceXLaunches = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <Header />
          <Main />
        </Route>
        <Route exact path="/GelecekFirlatma">
          <GelecekFirlatma />
        </Route>
        <Route exact path="/GecmisFirlatma">
          <GecmisFirlatma />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default SpaceXLaunches;
