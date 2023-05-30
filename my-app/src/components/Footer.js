import React from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "./spacex-logo-black-and-white.png";
import Bg from "./Bg.gif";

export default function Footer() {
  const history = useHistory();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex bg-black text-white font-extralight  p-4 rounded-lg shadow-lg mb-4">
        <div className="mx-auto text-center">
          <h3 className="text-center text-xl">INFO</h3>
          <p>
            All data and images are property of Space Exploration Technologies
            Corporation (SpaceX)
          </p>
          <br />
          <p>Built using the API maintained by /r/spacex on GitHub</p>
          <br />
          <p>
            It was lovingly made by Sefa Burak Torun for the Öğrenci Baksana
            team in 2023.
          </p>
          <br />
        </div>
      </div>
    </div>
  );
}
