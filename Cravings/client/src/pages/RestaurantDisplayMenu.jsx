import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../config/Api";
import { useEffect } from "react";
import toast from "react-hot-toast";

const RestaurantDisplayMenu = () => {
  const restaurantID = useParams().id;
  console.log("menu page", restaurantID);

  const [restaurantData, setRestaurantData] = useState();

  const fetchRestaurantMenu = async () => {
    try {
      const res = await api.get(`/public/restaurant-menu/${restaurantID / 1}`);
      setRestaurantData(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unkown Error");
    }
  };
  useEffect(() => {
    fetchRestaurantMenu();
  }, [restaurantID]);

  return <div>RestaurantDisplayMenu</div>;
};

export default RestaurantDisplayMenu;
