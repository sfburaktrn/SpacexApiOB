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
          <p>
            Built using the API maintained by /r/spacex on{" "}
            <a
              href="https://github.com/r-spacex/SpaceX-API"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              GitHub{" "}
            </a>
          </p>
          <br />
          <p>
            It was lovingly made by{" "}
            <a
              href="https://www.linkedin.com/in/sefaburaktorun/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Sefa Burak Torun{" "}
            </a>{" "}
            for the{" "}
            <a
              href="https://www.linkedin.com/company/%C3%B6%C4%9Frenci-baksana/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400"
            >
              Öğrenci Baksana{" "}
            </a>{" "}
            team in 2023.
          </p>
          <br />
        </div>
      </div>
    </div>
  );
}
