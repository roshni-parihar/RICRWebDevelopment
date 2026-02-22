import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/Api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import{FaRegTrashAlt} from "react-icons/fa"

const RestaurantDisplayMenu = () => {
  const { isLogin, role } = useAuth();
  const navigate = useNavigate();
  const data = useLocation().state;
 // console.log("location", location.state);

  const [menuItems, setMenuItems] = useState();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart"))); //here the data of every itmes we stored in a localostorage is used here ..
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
  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart();
    setCartFlag([]);
  };
  const handleAddToCart = (NewItem) => {
    if (cart) {
      if (cart.restaurantID === NewItem.restaurantID) {
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
  const handleCheckout = () => {
    isLogin && role === "customer"
      ? (localStorage.setItem("cart", JSON.stringify(cart)),
        navigate("/checkout-page"))
      : (toast.error("Please Loginn as Customer"), navigate("/login"));
  };

  useEffect(() => {
    cart && localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetchRestaurantMenu();
  }, [data]);

  return (
    <>
      <div className="relative w-full h-72 mb-6">
        <img
          src={data?.photo?.url}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-8 text-white">
          <h1 className="text-4xl font-bold">{data?.restaurantName}</h1>
          <p className="mt-2 text-md text-(--color-secondary) font-semibold">
            {data?.address}
          </p>
          <p className="mt-2 text-sm opacity-90">{data?.description}</p>
          <p className="mt-2 text-sm">
            ⏰ {data?.openTime} - {data?.closeTime}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-28">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Menu
        </h2>

        <div className="space-y-6">
          {menuItems &&
            menuItems.map((EachItem, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col md:flex-row justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {EachItem.itemName}
                    </h3>
                    <span
                      className="text-xs px-2 py-1 rounded-full text-white capitalize"
                      style={{
                        backgroundColor:
                          EachItem.type === "veg" ? "#16a34a" : "#dc2626",
                      }}
                    >
                      {EachItem.type}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mt-2">
                    {EachItem.description}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-500">
                    <p>
                      <span className="font-semibold">Cuisine:</span>{" "}
                      {EachItem.cuisine}
                    </p>
                    <p>
                      <span className="font-semibold">Serving:</span>{" "}
                      {EachItem.servingSize}
                    </p>
                    <p>
                      <span className="font-semibold">Prep Time:</span>{" "}
                      {EachItem.preparationTime}
                    </p>
                    <p>
                      <span className="font-semibold">Availability:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          EachItem.availability === "available"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {EachItem.availability}
                      </span>
                    </p>
                  </div>

                  <p className="text-xl font-bold text-gray-900 mt-4">
                    ₹{EachItem.price}
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={EachItem.images[0].url}
                    alt=""
                    className="w-36 h-36 object-cover rounded-xl shadow"
                  />

                  <button
                    className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition disabled:bg-gray-400"
                    onClick={() => handleAddToCart(EachItem)}
                    disabled={cartFlag.includes(EachItem._id)}
                  >
                      {console.log(
                          "cartFlag",
                          cartFlag.includes(EachItem._id),
                        )}
                        {cartFlag.includes(EachItem._id)
                          ? "Added"
                          : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {cart && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4">
          <div className="bg-black text-white rounded-2xl shadow-2xl p-4 flex justify-between items-center">
            <div className="font-semibold">
              {cart.cartItem.length} Items | ₹ {cart.cartValue}
            </div>
            <div className="text-white font-bold flex gap-3 items-center">
              <span>Items : {cart.cartItem.length}</span>
              <button
                className=" text-white px-2 py-2 rounded hover:bg-white/30 transition disabled:bg-gray-300"
                onClick={handleClearCart}
              >
                <FaRegTrashAlt />
              </button>
            </div>
            <button
              className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantDisplayMenu;
