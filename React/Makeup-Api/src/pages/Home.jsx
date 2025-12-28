import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <>
      <div className="pt-20">
        <section className="flex flex-col items-center justify-between">
          <div className="grid grid-cols-2 items-center gap-20">
            <div className="flex flex-col ms-25">
              {" "}
              <h1 className="text-5xl font-light text-pink-800">
                Discover Your Inner <span className="font-medium">AURA</span>
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                Beauty begins the moment you decide to be yourelf. Enhance your
                natural glow with elegance & connfidence.
              </p>{" "}
              <div className="mt-8 flex gap-4">
                <Link
                  to="/product"
                  className="px-6 py-3 bg-pink-700 text-white rounded-full hover:bg-pink-800 "
                >
                  Explore Products
                </Link>

                <Link
                  to="/contact"
                  className="px-6 py-3 border border-pink-700 text-pink-700 rounded-full hover:bg-pink-100 "
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div>
              <img src="" alt="image" />
            </div>
          </div>
        </section>
        <section className="py-5 px-20 bg-white">
          <h2 className="text-4xl text-center text-pink-800 font-sans mb-12 ">
            Why Choose AURA
          </h2>
          <div className="grid grid-cols-3 gap-10">
            <div className="p-6 rounded-4xl shadow-cyan-900 hover:shadow-xl bg-rose-100">
              <h3 className="text-2xl text-pink-700 mb-3">Natural Beauty</h3>
              <p className="text-gray-600">
                Products designed to enhance-not hide-your natural features.
              </p>
            </div>

            <div className="p-6 rounded-4xl shadow-cyan-900 hover:shadow-xl bg-rose-100">
              <h3 className="text-2xl text-pink-700 mb-3">Premium Care</h3>
              <p className="text-gray-600">
                Crafted with care, inspired by elegance and simplicity.
              </p>
            </div>

            <div className="p-6 rounded-4xl shadow-cyan-900 hover:shadow-xl bg-rose-100">
              <h3 className="text-2xl text-pink-700 mb-3">Confidence Boost</h3>
              <p className="text-gray-600">
                Feel confident, radiant, and powerful every single day.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
