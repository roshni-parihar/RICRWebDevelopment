import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/Api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const RestaurantDisplayMenu = () => {
  const data = useLocation().state;
  const { isLogin, role } = useAuth();
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [cartFlag, setCartFlag] = useState([]);

  const fetchRestaurantMenu = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/public/restaurant/menu/${data._id}`);
      setMenuItems(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unkown Error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (NewItem) => {
    if (cart) {
      if (cart.restaurantID === NewItem.restaurantID._id) {
        setCart((prev) => ({
          ...prev,
          cartItem: [...prev.cartItem, { ...NewItem, quantity: 1 }],
          cartValue: Number(prev.cartValue) + Number(NewItem.price),
        }));
        setCartFlag((prev) => [...prev, NewItem._id]);
      } else {
        toast.error("Clear the cart first");
      }
    } else {
      setCart({
        restaurantID: NewItem.restaurantID._id,
        cartItem: [{ ...NewItem, quantity: 1 }],
        cartValue: Number(NewItem.price),
      });
      setCartFlag((prev) => [...prev, NewItem._id]);
    }
  };
const handleCheckout =()=>{
  isLogin && role === "customer"?(localStorage.setItem("cart",JSON.stringify(cart)),
navigate("/checkout-page")):(toast.error("Please Loginn as Customer"),navigate("/login"));
}

useEffect(()=>{
  cart && localStorage.setItem("cart", JSON.stringify(cart));
},[cart]);


  useEffect(() => {
    fetchRestaurantMenu();
  }, [data]);

  return (
    <>
      <div className="w-7xl p-3 rounded shadow mx-auto mt-2 ">
        <img
          src={data.photo.url}
          alt=""
          className="w-48 h-48 object-cover rounded"
        />
      </div>
      <div className="w-7xl p-3 rounded shadow mx-auto mt-2 ">
        <div className="text-(--color-secondary) font-bold text-2xl text-center">
          Menu
        </div>

        <div className="space-y-3">
          {menuItems &&
            menuItems.map((EachItem, idx) => (
              <div
                className="border border-gray-100 hover:shadow-lg  p-4 rounded"
                key={idx}
              >
                <div className="flex gap-4">
                  <img
                    src={EachItem.images[0].url}
                    alt=""
                    className="w-40 h-40 object-cover rounded "
                  />

                  <div className="flex justify-between border-red-500 w-full">
                    <div>
                      <div className="text-(--color-primary) text-lg font-bold">
                        {EachItem.itemName}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {EachItem.description}
                      </div>
                      <div className="mt-3 space-y-1 text-sm">
                        <div>
                          <span className="font-semibold">Cuisine:</span>{" "}
                          {EachItem.cuisine}
                        </div>
                        <div>
                          <span className="font-semibold">Type:</span>{" "}
                          <span
                            className="capitalize px-2 py-1 rounded text-white"
                            style={{
                              backgroundColor:
                                EachItem.type === "veg" ? "#22c55e" : "#ef4444",
                            }}
                          >
                            {EachItem.type}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold">Serving Size:</span>{" "}
                          {EachItem.servingSize}
                        </div>
                        <div>
                          <span className="font-semibold">
                            Preparation Time:
                          </span>{" "}
                          {EachItem.preparationTime}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <span className="font-semibold">Availability:</span>{" "}
                        <span
                          className={`capitalize px-2 py-1 rounded ${EachItem.availability === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {EachItem.availability}
                        </span>
                      </div>
                      <div className="text-(--color-primary) text-2xl font-bold">
                        ₹{EachItem.price}
                      </div>
                      <button className="bg-(--color-primary) text-white px-6 py-2 rounded hover:bg-(--color-primary-hover) transition" onClick={()=>handleAddToCart(EachItem)}
                        disabled={cartFlag.includes(EachItem._id)}>
                       {console.log("cartFlag",cartFlag.includes(EachItem._id),
                       )
                       }{
                        cartFlag.includes(EachItem._id)?"Added":"Add to Cart"
                       }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantDisplayMenu;
