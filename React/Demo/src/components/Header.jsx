import React from "react";
import { Link } from "react-router-dom";

//functional components
const Header = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-2 bg-info-subtle ">
        <h1>My <span>Website</span> </h1>
        <div className="d-flex gap-3">
          <Link to={"/"} className="text-decoration-none text-black fs-4">
            Home
          </Link>
           <Link to={"/about"} className="text-decoration-none text-black fs-4">
            About
          </Link>
           <Link to={"/product"} className="text-decoration-none text-black fs-4">
            Product
          </Link>
           <Link to={"/contact"} className="text-decoration-none text-black fs-4">
            Contact
          </Link>
            <Link to={"/login"} className="text-decoration-none text-black fs-4">
            Login
          </Link>
             <Link to={"/signup"} className="text-decoration-none text-black fs-4">
            SignUp
          </Link>
        </div>{" "}
      </div>
    </>
  );
};
export default Header;
