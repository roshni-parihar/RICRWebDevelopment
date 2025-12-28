import React from "react";
import { Link } from "react-router-dom";
import { MdFaceRetouchingNatural } from "react-icons/md";
import { MdConnectWithoutContact } from "react-icons/md";
import { BiSolidHomeSmile } from "react-icons/bi";

const Header = () => {
  return (
    <>
      <nav className="flex item-center justify-between h-20 sticky top-0 left-0 right-0  bg-white/90 border-b border-rose-100/80 shadow-sm">
        <h1
          className="flex items-center gap-2 text-3xl  text-pink-800 font-light  font-serif hover:scale-110 hover:text-4xl ms-40" >
          <MdFaceRetouchingNatural />A U R A
        </h1>
        <div className="flex items-center gap-5 me-30">
          <Link
            to={"/"}
            className="flex items-center gap-2 text-xl text-gray-700 hover:text-pink-600 hover:underline decoration-pink-600"
          >
            <BiSolidHomeSmile />Home
          </Link>
          <Link
            to={"/about"}
            className="text-xl text-gray-700 hover:text-pink-600 hover:underline decoration-pink-600"
          >
            About
          </Link>
          <Link
            to={"/product"}
            className="text-xl text-gray-700 hover:text-pink-600 hover:underline decoration-pink-600"
          >
            Product
          </Link>
          <Link
            to={"/contact"}
            className="flex items-center gap-2 text-xl text-gray-700 hover:text-pink-600 hover:underline decoration-pink-600"
          >
            <MdConnectWithoutContact />
Contact
          </Link>
        </div>{" "}
      </nav>
    </>
  );
};
export default Header;
