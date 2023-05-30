import React from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "./spacex-logo-black-and-white.png";
import Bg from "./Bg.gif";

export default function Header() {
  const history = useHistory();
  return (
    <div className="bg-black text-white p-6 flex justify-between items-center">
      <div>
        <img src={Logo} alt="SpaceX Logo" className="h-8 w-56" />
      </div>

      <div className="ml-2 space-x-2">
        <NavLink to="/GelecekFirlatma">
          <button className="text-[12px] font-bold py-2 px-4 rounded-2xl border-white border-2 hover:bg-white hover:text-black">
            Gelecek Fırlatma
          </button>
        </NavLink>
        <NavLink to="/GecmisFirlatma">
          <button className="text-[12px] font-bold py-2 px-4 rounded-2xl border-white border-2 hover:bg-white hover:text-black">
            Gecmiş Fırlatma
          </button>
        </NavLink>
      </div>
    </div>
  );
}
