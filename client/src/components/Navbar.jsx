import React from "react";
import { GrGraphQl } from "react-icons/gr";

const Navbar = () => {
  return (
    <nav className="border h-[70px] flex items-center px-[40px] shadow-md">
      <div className="flex gap-[7px] items-center text-pink-600 ">
        <GrGraphQl size={35} />
        <h1 className="font-semibold text-xl">MGMTProject</h1>
      </div>
    </nav>
  );
};

export default Navbar;
