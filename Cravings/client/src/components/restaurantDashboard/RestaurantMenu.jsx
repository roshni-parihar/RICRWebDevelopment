import React, { useState } from "react";
import MenuModal from "./modals/MenuModal";
import { FiPlusCircle } from "react-icons/fi";

const RestaurantMenu = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  return (
    <>
      <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 ">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 ">
              Menu Management
            </h2>
            <button className="px-4 py-2 rounded-2xl bg-(--color-secondary) cursor-pointer hover:bg-(--color-primary) text-white flex gap-2 justify-center item-center   " onClick={(e)=>{e.preventDefault();setIsMenuModalOpen(true)}}> < FiPlusCircle />Add Items</button>
          </div>
          <div className="text-center text-gray-500 py-12 ">
           
          </div>
        </div>
      </div>
      {
        isMenuModalOpen && 
        < MenuModal onClose={()=>setIsMenuModalOpen(false)}/>
      }
    </>
  );
};

export default RestaurantMenu;
