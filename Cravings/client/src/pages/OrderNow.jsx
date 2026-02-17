import React, { useEffect, useState } from "react";
import api from "../config/Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { FaArrowRight } from "react-icons/fa";

const OrderNow = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllRestaurant = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/allRestaurants");
      console.log(res.data.data);
      
      setRestaurants(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unkown Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRestaurant(); 
  }, []);



    if (loading) {
    return (
      <div className="h-[80vh]">
        <Loading />
      </div>
    );
  }

  const handleRestaurantClick =(restaurantinfo)=>{
    console.log("restaurant Clicked");
    console.log("OrderNow Page",restaurantinfo);

    navigate("/restaurantMenu",{state:restaurantinfo});
  }  

   const isRestaurantOpen = (openTime, closeTime) => {
    if (!openTime || !closeTime) return false;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [oh, om] = openTime.split(":");
    const [ch, cm] = closeTime.split(":");

    return (
      currentMinutes >= oh * 60 + Number(om) &&
      currentMinutes <= ch * 60 + Number(cm)
    );
  };

 return (
  <>
  <div className="bg-gray-100 min-h-screen">

    {/* ================= HERO SECTION ================= */}
    <div className="bg-black text-white py-16 px-6 text-center">
      <h1 className="text-4xl font-bold mb-3">
        Discover Restaurants Near You
      </h1>
      <p className="text-gray-300 max-w-2xl mx-auto">
        Browse top-rated restaurants and order your favorite meals instantly.
      </p>
    </div>

    {/* ================= RESTAURANT GRID ================= */}
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {restaurants.map((restaurant, idx) => {
          const isOpen = isRestaurantOpen(
            restaurant.openTime,
            restaurant.closeTime
          );

          return (
            <div
              key={idx}
              onClick={() => handleRestaurantClick(restaurant)}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 cursor-pointer overflow-hidden group"
            >
              {/* IMAGE */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={restaurant.photo?.url}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="absolute top-3 right-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      isOpen
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {isOpen ? "Open" : "Closed"}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {restaurant.restaurantName}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {restaurant.description || "Delicious food awaits you"}
                </p>

                {/* CUISINES */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.cuisine
                    ?.split(",")
                    .slice(0, 3)
                    .map((cuisine, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-200 px-3 py-1 rounded-full capitalize"
                      >
                        {cuisine.trim()}
                      </span>
                    ))}
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    ⏰ {restaurant.openTime} – {restaurant.closeTime}
                  </span>

                  <span className="text-black font-semibold group-hover:underline">
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  </div></>
);

};

export default OrderNow;
