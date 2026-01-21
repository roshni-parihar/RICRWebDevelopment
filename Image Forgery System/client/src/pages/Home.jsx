import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  useEffect(() => {
    document.title = "Image Forgery Detection";
  }, []);

  return (
    <>
      <Navbar title="Forgery Detector" />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">
          Image Forgery Detection System
        </h2>
        <Link
          to="/upload"
          className="px-6 py-3 bg-var(--primary) rounded-lg"
        >
          Get Started
        </Link>
      </div>
    </>
  );
};

export default Home;
