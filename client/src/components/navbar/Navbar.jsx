import React from "react";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav>
      <div className="px-8 py-4 gap-4 flex flex-col items-center justify-between sm:flex-row">
        <Logo/>
        <h1>search</h1>
        <h1>Profile</h1>
      </div>
    </nav>
  );
};

export default Navbar;
