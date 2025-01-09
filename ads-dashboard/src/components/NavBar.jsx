import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-black text-white flex flex-wrap justify-between items-center py-6">
      <h1 className="text-xl font-bold text-red-600">Ads Dashboard</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
        <Link to="/manage-ad" className="text-red-500 text-3xl px-4 mt-3 font-bold border-red-500 border-2 rounded-full   hover:bg-red-500 hover:text-white p-2 transition-colors">+</Link>
      </div>
    </nav>
  );
};

export default Navbar;
