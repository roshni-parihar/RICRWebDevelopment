import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const EditProfileModal = ({ onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    mobileNumber: user.mobileNumber || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

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

  const validate = () => {
    let Error = {};

    if (formData.fullName.length < 3) {
      Error.fullName = "Name should be more than 3 characters";
    } else if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
      Error.fullName = "Only letters and space allowed";
    }

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email,
      )
    ) {
      Error.email = "Invalid email format";
    }

    if (!/^[1-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Invalid mobile number";
    }

    setValidationError(Error);
    return Object.keys(Error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      toast.error("Fill the form correctly");
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      handleClearForm();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed flex items-center justify-center  inset-0 bg-black/80 z-100">
        <div className="flex justify-center items-center  gap-3 bg-white w-5xl max-h-[85vh] overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            onReset={handleClearForm}
            className="w-full rounded-2xl shadow-2xl backdrop-blur-md"
          >
            <div className="py-4 rounded-t-2xl text-center border-b border-[#f59e0b]">
              <h1 className="text-3xl  font-extrabold text-[#f5740b]">
                Edit Profile
              </h1>
              <p className="text-sm text-gray-800">
                Update your personal information
              </p>
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
                  disabled={isLoading}
                  className="w-full h-10 px-3 rounded-lg bg-black text-white border border-[#f59e0b] outline-none"
                />
                {validationError.fullName && (
                  <p className="text-sm text-red-400">
                    {validationError.fullName}
                  </p>
                )}
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
                  disabled={isLoading}
                  className="w-full h-10 px-3 rounded-lg bg-black text-white border border-[#f59e0b] outline-none"
                />{" "}
                {validationError.email && (
                  <span className="text-xs text-red-500">
                    {validationError.email}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="mobileNumber" className="text-xl  font-sans">
                  Phone:
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  maxLength="10"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  disabled={isLoading}
                  className="w-full h-10 px-3 rounded-lg bg-black text-white border border-[#f59e0b] outline-none"
                />{" "}
                {validationError.mobileNumber && (
                  <span className="text-xs text-red-500">
                    {validationError.mobileNumber}
                  </span>
                )}
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 rounded-xl border border-amber-900 font-bold transition-all hover:scale-95"
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "#111827",
                  }}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
                <div className="">
                  <button
                    className="border-2  rounded-2xl   bg-red-700  px-6 py-2"
                    onClick={() => onClose()}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
