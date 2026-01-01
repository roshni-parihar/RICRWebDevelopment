import React, { useState } from "react";
import CountryData from "../assets/CountryData.json";
import toast from "react-hot-toast";
import axios from "axios";

const Currency = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromAmt, setFromAmt] = useState("");
  const [toAmt, setToAmt] = useState("");
  //console.log(CountryData);

  const Convert = async () => {
    if (!from || !to || !fromAmt) {
      toast.error("Some Fields Missing");
      return;
    }
    try {
      const res = await axios.get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from
          .split(" ")[0]
          .toLowerCase()}.json`
      );

      setToAmt(
        fromAmt *
          res.data[from.split(" ")[0].toLowerCase()][
            to.split(" ")[0].toLowerCase()
          ]
      );
    } 
    catch (error) {
  toast.error("Conversion failed. Try again!");
  console.error(error);
}

  };

  return (
    <>
       <div className="bg-[#00050d] h-screen p-5 text-[#2E3A59]">
      <div className="max-w-3xl bg-gray-500 rounded-xl shadow-lg hover:shadow-cyan-700 shadow-cyan-900 border p-6 mx-auto">
          <div className="grid grid-cols-2 gap-5">
            {" "}
            <div className="flex">
              {from && (
                <img
                  src={`https://flagsapi.com/${from.split(" ")[1]}/flat/48.png`}
                  alt=""
                />
              )}

              <select
                name="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border p-3 rounded-3xl  w-75 bg-[#DCE3ED] overflow-hidden"
              >
                <option value="">--select Country--</option>
                {CountryData.map((country, idx) => (
                  <option
                    value={country.CurrencyCode + " " + country.CountryCode}
                    key={idx}
                  >
                    {country.CountryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex">
              {to && (
                <img
                  src={`https://flagsapi.com/${to.split(" ")[1]}/flat/48.png`}
                  alt=""
                />
              )}

              <select
                name="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border p-3 rounded-3xl  w-75 bg-[#DCE3ED] overflow-hidden"
              >
                <option value="">--select Country--</option>
                {CountryData.map((country, idx) => (
                  <option
                    value={country.CurrencyCode + " " + country.CountryCode}
                    key={idx}
                  >
                    {country.CountryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col  gap-5 items-center border mt-9 py-6 px-5 rounded-xl bg-[#F5F7FA]">
            {" "}
            <div className="flex gap-3 items-center">
              <label htmlFor="fromAmt">Amount</label>
              <input
                type="number"
                name="fromAmt"
                id=""
                value={fromAmt}
                onChange={(e) => setFromAmt(e.target.value)}
                placeholder="Enter the Amount to Convert"
                className="border rounded-3xl p-5 w-full  bg-[#DCE3ED]"
              />
            </div>
            <div>
              <button
                className="rounded-2xl bg-[#364051] hover:bg-[#192b57] px-10 py-3 text-white font-semibold transition" 
                onClick={Convert}
              >
                Convert
              </button>
            </div>
            <div className="flex gap-3 items-center">
              <label htmlFor="convertAmount" className="text-shadow-gray-900 font-semibold">
                Converted Amount: <span className="text-[#1F6AE1]">{toAmt ? toAmt : "XXXXXX"}{" "}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Currency;
