import React from "react";
import Logo from "./Logo";
import Profile from "./Profile";

const Navbar = () => {
  return (
    <nav>
      <div className="px-8 py-4 gap-4 flex flex-col items-center justify-between sm:flex-row">
        <Logo/>
        <h1>search</h1>
        <Profile/>
      </div>
    </nav>
  );
};

export default Navbar;
