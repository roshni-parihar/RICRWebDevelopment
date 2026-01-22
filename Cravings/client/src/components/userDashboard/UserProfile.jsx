import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  
  return (

    <>
      <div className="flex gap-10  text-white  ">
        
        <div>
          <span>Name:</span>
          <span>{user.fullName}</span>
        </div>
        <div>
          <span>Email:</span>
          <span>{user.email}</span>
        </div>
        <div>
          <span>Phone:</span>
          <span>{user.mobileNumber}</span>
        </div>

        <button
          className="border px-5 py-2 rounded-2xl bg-cyan-700"
          onClick={() => setIsEditProfileModalOpen(true)}
        >
          Edit Profile
        </button>
      </div>

      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}
    </>
  );
};

export default UserProfile;
