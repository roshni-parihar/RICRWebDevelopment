import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen flex flex-col  items-center  text-white  px-6">
        <div className="flex flex-col gap-4 mt-5 w-full border border-gray-800 px-6 py-8 rounded-4xl bg-black/50 shadow-md shadow-orange-900 hover:shadow-md hover:shadow-orange-400 backdrop-blur-md    max-w-xl">
          <div className="text-3xl flex justify-between  items-center  font-bold text-[#f5740b] mb-4 text-shadow-lg text-shadow-black">
            <h2>User Profile </h2>
             <div className="">
            <button
              className="px-4 py-2 rounded-4xl border-2  bg-orange-400 scale-60 text-black  transition-all hover:scale-80 hover:bg-orange-500"
              onClick={() => setIsEditProfileModalOpen(true)}
            >
              Edit Profile
            </button>
          </div>
          </div>
          <div className="flex justify-between items-center border-b border-amber-500 pb-2">
            <span className="text-gray-200">Name</span>
            <span className="font-medium text-lg">{user.fullName}</span>
          </div>

          <div className="flex justify-between  items-center border-b border-amber-500 pb-2">
            <span className="text-gray-200">Email</span>
            <span className="font-medium text-lg">{user.email}</span>
          </div>

          <div className="flex justify-between items-center border-b border-amber-500 pb-2">
            <span className="text-gray-200">Phone</span>
            <span className="font-medium text-lg">{user.mobileNumber}</span>
          </div>

         
        </div>
      </div>

      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}
    </>
  );
};

export default UserProfile;
