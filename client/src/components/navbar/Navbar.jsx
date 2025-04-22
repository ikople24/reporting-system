import React from "react";
import Logo from "./Logo";
import Profile from "./Profile";


const Navbar = () => {
  return (
    <nav>
      <div className="px-8 py-4 gap-4 flex flex-col items-center justify-between sm:flex-row">
        <Logo />
        <div className="flex gap-2 text-sm font-extrabold">
          <p>Connect</p>
          <p>หน่วยงานที่เลือก</p>
        </div>
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
