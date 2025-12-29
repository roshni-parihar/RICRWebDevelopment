import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="pt-10">
        <section className="flex flex-col items-center justify-between p-5">
          <div className="grid grid-cols-2 items-center gap-50">
            <div className="flex flex-col ms-25">
              {" "}
              <h1 className="text-5xl font-light text-black font-sans">
                Discover Your Inner <span className="font-medium font-serif text-red-900 text-shadow-lg text-shadow-white">AURA</span>
              </h1>
              <p className="mt-6 text-2xl text-white ">
                Beauty begins the moment you decide to be yourelf. Enhance your
                natural glow with elegance & connfidence.
              </p>{" "}
              <div className="mt-8 flex gap-4 mb-5">
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

            <div className="flex h-100">
              
               <img src='images/pw1.webp'className="object-cover object-center w-full rounded-4xl shadow-md h-96 shadow-white" alt="image" />
            </div>
          </div>
        </section>
        <section className="py-7 px-20 bg-white">
          <h2 className="text-4xl text-center text-pink-800 font-sans mb-12 ">
            Why Choose AURA
          </h2>
          <div className="grid grid-cols-3 gap-10">
            <div className="p-6 rounded-4xl shadow-cyan-900 hover:shadow-xl bg-purple-900/30">
              <h3 className="text-2xl text-pink-900 mb-3">Natural Beauty</h3>
              <p className="text-gray-600 text-lg">
                Products designed to enhance-not hide-your natural features.
              </p>
            </div>

            <div className="p-6 rounded-4xl shadow-cyan-900 hover:shadow-xl bg-purple-900/30">
              <h3 className="text-2xl text-pink-900 mb-3">Premium Care</h3>
              <p className="text-gray-600 text-lg">
                Crafted with care, inspired by elegance and simplicity.
              </p>
            </div>

            <div className="p-6 rounded-4xl shadow-cyan-900 hover:shadow-xl bg-purple-900/30">
              <h3 className="text-2xl text-pink-900 mb-3">Confidence Boost</h3>
              <p className="text-gray-600 text-lg ">
                Feel confident, radiant, and powerful every single day.
              </p>
            </div>
          </div>
        </section>
        <section className="text-center ">
          {" "}
          <div className="p-10">
            <h2 className="text-4xl text-red-900">
              Ready to Discover Your Glow?
            </h2>
            <p className="text-2xl p-5 text-gray-100">
              Join thousands of women who've simplified their beauty routine.
            </p><div className="p-3"><Link
              to="/product"
              className=" px-10 py-3 bg-white text-rose-600 hover:bg-rose-50 shadow-xl text-lg  rounded-4xl"
            >
              Shop Now
            </Link></div>
            
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
