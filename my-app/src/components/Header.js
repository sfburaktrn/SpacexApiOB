import React from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "./spacex-logo-black-and-white.png";

export default function Header() {
  const history = useHistory();

  const scrollToLatestLaunch = () => {
    const mainSection = document.getElementById("latestLaunchSection");
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black text-white p-6 flex flex-col sm:flex-row justify-between items-center hover:text-black">
      <div>
        <img src={Logo} alt="SpaceX Logo" className="h-8 w-56" />
      </div>

      <div className="mt-4 sm:mt-0 sm:ml-2 space-x-2">
        <button
          className="text-[12px] font-bold py-2 px-4 rounded-2xl border-white border-2 hover:bg-white hover:text-black"
          onClick={scrollToLatestLaunch}
        >
          Latest Launch Details
        </button>

        <NavLink to="/FutureLaunch">
          <button className="text-[12px] font-bold py-2 px-4 rounded-2xl border-white border-2 hover:bg-white hover:text-black">
            Future Launch
          </button>
        </NavLink>
        <NavLink to="/PastLaunch">
          <button className="text-[12px] font-bold py-2 px-4 rounded-2xl border-white border-2 hover:bg-white hover:text-black">
            Past Launch
          </button>
        </NavLink>
      </div>
    </div>
  );
}
