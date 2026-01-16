import React from "react";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { AiFillProfile } from "react-icons/ai";
import { MdOutlineBorderColor } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { LuHandHelping } from "react-icons/lu";
import { RiMenuUnfoldFill } from "react-icons/ri";

const UserSideBar = ({ active, setActive }) => {
  return (
    <>
      <div className="p-3">
        <div className="text-xl font-bold flex  gap-2 items-center"><RiMenuUnfoldFill />User Dashboard</div>
        <hr />
        <div className="grid gap-3 p-6 ">
          <button
            className={`flex  gap-3  items-center  p-3 rounded-xl ${
              active === "overview"
                ? "bg-(--color-secondary) text-white"
                : "hover:bg-gray-50/60"
            }`}
            onClick={() => setActive("overview")}
          >
            <FaMagnifyingGlassChart /> Overview
          </button>

          <button
            className={`flex  gap-3  items-center  p-3 rounded-xl ${
              active === "profile"
                ? "bg-(--color-secondary) text-white"
                : "hover:bg-gray-50/60"
            }`}
            onClick={() => setActive("profile")}
          >
            <AiFillProfile />
            Profile
          </button>

          <button
            className={`flex  gap-3  items-center  p-3 rounded-xl ${
              active === "orders"
                ? "bg-(--color-secondary) text-white"
                : "hover:bg-gray-50/60"
            }`}
            onClick={() => setActive("orders")}
          >
            <MdOutlineBorderColor />
            Orders
          </button>

          <button
            className={`flex  gap-3  items-center  p-3 rounded-xl ${
              active === "transaction"
                ? "bg-(--color-secondary) text-white"
                : "hover:bg-gray-50/60"
            }`}
          >
            <GrTransaction />
            Transaction
          </button>

          <button
            className={`flex  gap-3  items-center  p-3 rounded-xl ${
              active === "helpdesk"
                ? "bg-(--color-secondary) text-white"
                : "hover:bg-gray-50/60"
            }`}
          >
            <LuHandHelping />
            Help Desk
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSideBar;
