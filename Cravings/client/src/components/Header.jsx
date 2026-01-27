import React from "react";
import transparentLogo from "../assets/clientLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, isLogin, role } = useAuth();

  const navigate = useNavigate();

  const handleNavigate = () => {
    switch (role) {
      case "manager": {
        navigate("/restaurant-dashboard");
        break;
      }

      case "partner": {
        navigate("/rider-dashboard");
        break;
      }
      case "customer": {
        navigate("/user-dashboard");
        break;
      }
      case "admin": {
        navigate("/admin-dashboard");
        break;
      }

      default:
        break;
    }
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 border border-b-gray-600">
      <div className="flex justify-between items-center px-6  bg-black border-b border-(--border-main) shadow-lg h-20">
        <Link to="/">
          <img
            src={transparentLogo}
            alt="Logo"
            className="h-15 w-24 object-cover rounded-full  border-3 border-(--color-secondary-hover) py-1 "
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
            <div
              className="text-orange-300 cursor-pointer border p-3 rounded-2xl hover:bg-(--color-secondary-hover)/40 hover:text-(--color-text)"
             
              onClick={handleNavigate}
            >
              {user.fullName}
            </div> // shows the user or who login's profile view or name
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
