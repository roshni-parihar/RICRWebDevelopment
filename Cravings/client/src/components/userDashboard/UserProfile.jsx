import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-linear-to-br from-black via-gray-900 to-black px-6">
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <div className="flex justify-between items-center border-b border-amber-500 pb-2">
            <span className="text-gray-400">Name</span>
            <span className="font-semibold text-lg">{user.fullName}</span>
          </div>

          <div className="flex justify-between items-center border-b border-amber-500 pb-2">
            <span className="text-gray-400">Email</span>
            <span className="font-semibold text-lg">{user.email}</span>
          </div>

          <div className="flex justify-between items-center border-b border-amber-500 pb-2">
            <span className="text-gray-400">Phone</span>
            <span className="font-semibold text-lg">{user.mobileNumber}</span>
          </div>

          <div className="flex justify-center pt-6">
            <button
              className="px-8 py-2 rounded-full bg-amber-500 text-black font-bold transition-all hover:scale-95 hover:bg-amber-400"
              onClick={() => setIsEditProfileModalOpen(true)}
            >
              Edit Profile
            </button>
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
