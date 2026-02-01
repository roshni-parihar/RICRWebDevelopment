import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { AiFillProfile } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { LuHandHelping } from "react-icons/lu";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const RestaurantSidebar = ({ active, setActive, isOpen, setIsOpen }) => {
  const { setUser, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { key: "overview", title: "Overview", icon: <FaMagnifyingGlassChart /> },
    { key: "profile", title: "Profile", icon: <AiFillProfile /> },

    { key: "transaction", title: "Transactions", icon: <GrTransaction /> },
    { key: "helpdesk ", title: "Help Desk", icon: <LuHandHelping /> },
  ];

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setIsLogin(false);
      navigate("/");
      sessionStorage.removeItem("CravingUser");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };
  return (
    <>
      <div className="p-2 flex flex-col justify-between h-[85vh]">
        <div className="p-2">
          <div className=" h-10 text-xl font-bold flex   gap-2 items-center">
            <button
              className="hover:scale-105"
              onClick={() => setIsOpen(!isOpen)}
            >
              <RiMenuUnfoldFill className="text-4xl text-bold ps-2" />
            </button>
            {!isOpen && (
              <span className="overflow-hidden text-nowrap">
                Manager Dashboard
              </span>
            )}
          </div>
          <hr />

          <div className="py-6 space-y-5 w-full ">
            {menuItems.map((item, idx) => (
              <button
                className={`flex  gap-3  items-center  p-3 rounded-xl text-base h-12 w-full  text-nowrap overflow-hidden duration-300  text-white ${
                  active === item.key
                    ? "bg-(--color-secondary) text-white"
                    : "hover:bg-gray-50/60"
                }`}
                onClick={() => setActive(item.key)}
                key={idx}
              >
                {item.icon} {!isOpen && item.title}
              </button>
            ))}
          </div>
        </div>
        <div>
          <button
            className="flex  gap-3  items-center text-red-500  p-3 rounded-xl text-base h-12 w-full  text-nowrap overflow-hidden duration-300   hover:bg-red-200"
            onClick={handleLogout}
          >
            {" "}
            <MdLogout />
            {!isOpen && "Logout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSidebar;
