import React from "react";
import { HiMiniCurrencyYen } from "react-icons/hi2";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { HiCurrencyPound } from "react-icons/hi";
import { HiMiniCurrencyRupee } from "react-icons/hi2";

const Header = () => {
  return (
    <>
      <div className="text-white bg-cyan-800 px-4 py-3 text-center text-3xl flex justify-center gap-4">
        <HiMiniCurrencyYen className=" animate-bounce" />
        <HiMiniCurrencyDollar className="animate-spin" />
        <span className=" font-bold text-shadow-lg text-4xl text-shadow-black">Currency Convertor</span>
        <HiCurrencyPound className="animate-ping" />
        <HiMiniCurrencyRupee className="animate-pulse" />
      </div>
    </>
  );
};

export default Header;
