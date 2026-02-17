import React from "react";
import { useNavigate } from "react-router-dom";
import Bpic from "../assets/f7.webp";

const Home = () => {
  const navigate = useNavigate();

  const featuredRestaurants=[
    {
       id: 1,
      name: "Spice Kingdom",
      cuisine: "Indian",
      rating: 4.5,
      deliveryTime: "30-40 mins",
      image: "🏪",
    },
    {
      id: 2,
      name: "Pizza Paradise",
      cuisine: "Italian",
      rating: 4.3,
      deliveryTime: "25-35 mins",
      image: "🍕",
    },
    {
      id: 3,
      name: "Dragon Wok",
      cuisine: "Chinese",
      rating: 4.6,
      deliveryTime: "35-45 mins",
      image: "🥢",
    },
    {
      id: 4,
      name: "Burger Haven",
      cuisine: "American",
      rating: 4.4,
      deliveryTime: "20-30 mins",
      image: "🍔",
    },
  ];

  const popularDishes = [
    {
      id: 1,
      name: "Butter Chicken",
      restaurant: "Spice Kingdom",
      price: 299,
      rating: 4.7,
      image: "🍛",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      restaurant: "Pizza Paradise",
      price: 349,
      rating: 4.5,
      image: "🍕",
    },
    {
      id: 3,
      name: "Hakka Noodles",
      restaurant: "Dragon Wok",
      price: 249,
      rating: 4.6,
      image: "🍜",
    },
    {
      id: 4,
      name: "Classic Burger",
      restaurant: "Burger Haven",
      price: 199,
      rating: 4.4,
      image: "🍔",
    },
    {
      id: 5,
      name: "Tandoori Chicken",
      restaurant: "Spice Kingdom",
      price: 279,
      rating: 4.8,
      image: "🍖",
    },
    {
      id: 6,
      name: "Garlic Bread",
      restaurant: "Pizza Paradise",
      price: 99,
      rating: 4.3,
      image: "🥖",
    }
  ]

  return (
  <>
    {/* ================= HERO ================= */}
    <section
      className="min-h-[85vh] flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${Bpic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Order Food From Your <br />
          <span className="text-orange-500">Favourite Restaurants</span>
        </h1>

        <p className="text-gray-200 mt-4">
          Fast delivery. Trusted restaurants. Easy checkout.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/order-now")}
            className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
          >
            Order Now
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 border border-white text-white rounded-md hover:bg-white hover:text-black transition"
          >
            Contact
          </button>
        </div>
      </div>
    </section>

    {/* ================= FEATURED RESTAURANTS ================= */}
    <section className="py-14 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Featured Restaurants
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="h-32 flex items-center justify-center bg-orange-100 text-5xl">
                {restaurant.image}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {restaurant.cuisine}
                </p>

                <div className="flex justify-between items-center mt-3 text-sm">
                  <span className="text-yellow-500">
                    ⭐ {restaurant.rating}
                  </span>
                  <span className="text-gray-500">
                    {restaurant.deliveryTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ================= POPULAR DISHES ================= */}
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Popular Dishes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {dish.restaurant}
                  </p>
                </div>

                <div className="text-4xl">{dish.image}</div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="font-semibold text-orange-600">
                  ₹{dish.price}
                </span>

                <span className="text-yellow-500 text-sm">
                  ⭐ {dish.rating}
                </span>
              </div>

              <button className="w-full mt-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition">
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ================= WHY CHOOSE US ================= */}
    <section className="py-14 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: "⚡", title: "Fast Delivery" },
            { icon: "🔒", title: "Secure Payment" },
            { icon: "🌟", title: "Verified Restaurants" },
            { icon: "💬", title: "24/7 Support" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-sm"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-800">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ================= CTA ================= */}
    <section className="py-14 bg-orange-600 text-center text-white">
      <h2 className="text-2xl font-semibold">
        Hungry? Let’s fix that.
      </h2>

      <button
        onClick={() => navigate("/order-now")}
        className="mt-4 px-6 py-3 bg-white text-orange-600 rounded-md hover:bg-gray-100 transition"
      >
        Order Now
      </button>
    </section>
  </>
);


};

export default Home;
