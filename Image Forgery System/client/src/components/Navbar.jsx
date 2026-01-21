import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ title }) => {
  return (
    <nav className="w-full bg-(--bg-card) px-6 py-4 flex justify-between">
      <h1 className="font-bold">{title}</h1>
      <div className="flex gap-4 text-(--text-muted)">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
      </div>
    </nav>
  );
};

export default Navbar;
