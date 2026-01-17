import React from "react";
import { useNavigate } from "react-router-dom";
import Bpic from "../assets/f7.webp";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${Bpic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <div className="flex flex-col justify-center items-center text-center min-h-screen px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#f59e0b] tracking-wide">
          Delicious Food <br /> Delivered Fresh
        </h1>

        <p className="text-gray-200 mt-4 max-w-xl text-lg">
          Experience premium taste crafted with love. Fresh ingredients,
          mouth-watering recipes, and quick delivery at your doorstep.
        </p>

       
      </div>

     
    </section>
  );
};

export default Home;
