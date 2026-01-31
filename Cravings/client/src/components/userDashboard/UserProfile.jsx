import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";
import ResetPasswordModal from "./modals/ResetPasswordModal";
import UserImage from "../../assets/userImage.jpg";
import { FaCamera } from "react-icons/fa";
import api from "../../config/Api";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { user, setUser } = useAuth();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const [preview, setPreview] = useState("");

  const changePhoto = async (photo) => {
    const form_Data = new FormData();

    form_Data.append("image", photo);
    // form_Data.append("imageURL", preview);

    try {
      const res = await api.patch("/user/changePhoto", form_Data);

      toast.success(res.data.message);

      setUser(res.data.data);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const newPhotoURL = URL.createObjectURL(file);
    console.log(newPhotoURL);
    setPreview(newPhotoURL);
    setTimeout(() => {
      changePhoto(file);
    }, 5000);
  };

  return (
    <>
      <div className=" flex justify-center rounded-lg shadow-md p-6  ">
        <div className="flex justify-center border p-3 rounded-3xl items-center w-120 border-gray-300 bg-white">
          <div>
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className=" border rounded-full w-36 h-36 overflow-hidden">
                  <img
                    src={preview || user.photo.url || UserImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-2 left-[75%] border bg-white p-2 rounded-full group flex gap-3">
                  <label
                    htmlFor="imageUpload"
                    className="text-(--color-primary) group-hover:text-(--color-secondary)"
                  >
                    <FaCamera />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>
              <div className=" ms-30  flex flex-col gap-2">
                <button
                  className="px-2 py-2 rounded-2xl bg-(--color-secondary) text-white"
                  onClick={() => setIsEditProfileModalOpen(true)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-2 rounded-2xl bg-(--color-secondary) text-white"
                  onClick={() => setResetPasswordModalOpen(true)}
                >
                  Reset password
                </button>
              </div>
            </div>
            <br />
            <hr />
            <div>
              <div className="text-3xl text-(--color-primary) font-bold text-shadow-2xs text-shadow-black">
                {user.fullName || "User Name"}
              </div>
              <div className="text-gray-600 text-lg font-semibold">
                {user.email || "email@example.com"}
              </div>
              <div className="text-gray-600 text-lg font-semibold">
                {user.mobileNumber || "XXXXXXXXXX"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}

      {isResetPasswordModalOpen && (
        <ResetPasswordModal onClose={() => setResetPasswordModalOpen(false)} />
      )}
    </>
  );
};

export default UserProfile;
