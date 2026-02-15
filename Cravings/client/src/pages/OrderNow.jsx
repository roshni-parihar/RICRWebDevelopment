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
  console.log(restaurants);
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
    <div className="bg-gray-100 min-h-screen p-6">
    
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Order Now</h1>
        <p className="text-gray-600 mt-2">
          Browse restaurants and place your order instantly
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant,idx) => {
          const isOpen = isRestaurantOpen(
            restaurant.openTime,
            restaurant.closeTime
          );

          return (
            <div
              key={idx}
              onClick={() => handleRestaurantClick(restaurant)}
              className="bg-white rounded-xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden"
            >
            
               <div className="flex overflow-x-auto gap-2 h-40 w-full p-1">
                 <img
                src={restaurant.photo.url}
                alt=""
                className="w-full h-[50%] object-cover rounded-t-xl"
              />
              
              </div>

            
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    {restaurant.restaurantName}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isOpen ? "Open" : "Closed"}
                  </span>
              

                </div>

                <div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {restaurant.description || "Delicious food awaits you"}
                </p>
                  <div className="flex float-end items-center text-(--color-secondary) gap-2 underline group-hover:border-b-2 w-fit">
                Explore Menu <FaArrowRight />
              </div>
                </div>

              
                <div className="flex gap-2 flex-wrap mt-3">
                  {restaurant.cuisine
                    ?.split(",")
                    .slice(0, 3)
                    .map((cuisine, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-amber-200 px-2 py-1 rounded-full capitalize"
                      >
                        {cuisine.trim()}
                      </span>
                    ))}
                </div>

                
                <p className="text-xs text-gray-500 mt-3">
                  ⏰ {restaurant.openTime} – {restaurant.closeTime}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderNow;
