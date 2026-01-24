import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/Api";

const EditProfileModal = ({ onClose }) => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    mobileNumber: user.mobileNumber || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log(formData);

    try {
      const res = await api.put("/user/update", formData);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);
     
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <div className="fixed flex items-center justify-center  inset-0 bg-black/80 z-100">
        <div className="  rounded-4xl  flex justify-center items-center   hover:shadow-md hover:shadow-amber-800  gap-3 bg-white  w-3xl max-h-[85vh] overflow-y-auto backdrop-blur-md">
          <form
            onSubmit={handleSubmit}
            onReset={handleClearForm}
            className="w-150  backdrop-blur-md"
          >
            <div className="flex gap-20 justify-center items-center rounded-t-2xl text-center  border-b-2 border-[#f5780b]">
              <div className="py-4">
                {" "}
                <h1 className="text-3xl   font-extrabold text-black text-shadow-xs text-shadow-[#f5740b]">
                  Edit Profile ✒️
                </h1>
                <p className="text-md text-orange-800">
                  Update your personal information
                </p>
              </div>

              <div className="flex items-center  -mt-8 ">
                <button
                  className="border-2  rounded-2xl -me-128  bg-red-700  px-4 py-1"
                  onClick={() => onClose()}
                >
                  ❌
                </button>
              </div>
            </div>

            <div className="px-12 py-6 space-y-4">
              <div className="space-y-1">
                {" "}
                <label htmlFor="fullName" className="text-xl   font-sans">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full h-10 px-3 rounded-lg bg-black/60 text-white border border-[#f5900b] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-xl  font-sans">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  disabled
                  className="w-full h-10 px-3 rounded-lg bg-black/60 text-white border border-[#f59e0b] cursor-not-allowed outline-none"
                />{" "}
              </div>

              <div className="space-y-1">
                <label htmlFor="mobileNumber" className="text-xl  font-sans">
                  Phone:
                </label>
                <input
                  type="number"
                  name="mobileNumber"
                  maxLength="10"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full h-10 px-3 rounded-lg bg-black/60 text-white border border-[#f59e0b] outline-none"
                />{" "}
              </div>
            </div>
             <div className="flex justify-center gap-3 pb-4">
                <button
                  type="submit"
                 
                  className="px-6 py-2 rounded-xl border bg-(--color-secondary) border-amber-900 font-bold transition-all hover:scale-95"
                 
                >
                  Save
                </button>
               
              </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
