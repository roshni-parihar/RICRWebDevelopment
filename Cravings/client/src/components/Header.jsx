import React from "react";
import transparentLogo from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, isLogin } = useAuth();

  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-6  bg-black border-b border-(--border-main) shadow-lg">
        <Link to="/">
          <img
            src={transparentLogo}
            alt="Logo"
            className="h-20 w-24 object-contain "
          />
        </Link>

        <nav className="flex gap-6">
          <Link
            to="/"
            className="text-gray-200 font-medium hover:text-(--color-primary) transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-200 font-medium hover:text-(--color-primary) transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-200 font-medium hover:text-(--color-primary) transition"
          >
            Contact
          </Link>
        </nav>

        <div className="flex gap-3">
          {isLogin ? (
            <span className="text-white">{user.fullName}</span> // shows the user or who login's profile view or name
          ) : (
            <>
              <button
                onClick={() => navigate("/login")} 
                className="px-5 py-2 rounded-lg font-semibold border border-(--border-main) text-(--color-primary) hover:bg-[#f59e0b] hover:text-black transition-all"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 rounded-lg font-semibold bg-[#f59e0b] text-black hover:scale-95 transition-all"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
