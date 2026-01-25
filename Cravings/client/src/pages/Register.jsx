import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";
import Bpic from "../assets/f7.webp";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
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
      password: "",
      confirmPassword: "",
      role: "",
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

    if (!formData.role) {
      Error.role = "Please choose any one";
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
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${Bpic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        onReset={handleClearForm}
        className="w-130 rounded-2xl shadow-2xl backdrop-blur-md"
        style={{
          backgroundColor: "rgba(17,24,39,0.9)",
          border: "2px solid #f59e0b",
        }}
      >
        <div className="py-4 rounded-t-2xl text-center border-b border-[#f59e0b]">
          <h1 className="text-3xl font-extrabold text-[#f59e0b]">
            Create Account 🍽️
          </h1>
          <p className="text-sm text-gray-300">
            Join us for delicious experiences
          </p>
        </div>
        <div className="flex items-center">
          <div className=" flex text-md justify-evenly items-center mt-2">
            <p className="text-(--color-primary)">I AM:</p>
            <div className="flex gap-2  items-center text-white">
              <input
                type="radio"
                name="role"
                id="manager"
                checked={formData.role === "manager"}
                value={"manager"}
                onChange={handleChange}
              />
              <label htmlFor="manager">Restaurant Manager</label>
            </div>
            <div className="flex gap-2 items-center text-white">
              <input
                type="radio"
                name="role"
                id="partner"
                checked={formData.role === "partner"}
                value={"partner"}
                onChange={handleChange}
              />
              <label htmlFor="manager">Delivery Partner</label>
            </div>
            <div className="flex gap-2 items-center text-white">
              <input
                type="radio"
                name="role"
                id="customer"
                checked={formData.role === "customer"}
                value={"customer"}
                onChange={handleChange}
              />
              <label htmlFor="manager">Customer</label>
            </div>
          </div>
          {validationError.role && (
            <p className="text-sm text-red-400">{validationError.role}</p>
          )}
        </div>
        <div className="px-8 py-6 space-y-4">
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
            <p className="text-sm text-red-400">{validationError.fullName}</p>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            disabled={isLoading}
            className="w-full h-10 px-3 rounded-lg bg-black text-white border border-[#f59e0b] outline-none"
          />

          <input
            type="tel"
            name="mobileNumber"
            maxLength="10"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            disabled={isLoading}
            className="w-full h-10 px-3 rounded-lg bg-black text-white border border-[#f59e0b] outline-none"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            disabled={isLoading}
            className="w-full h-10 px-3 rounded-lg bg-black text-white border border-[#f59e0b] outline-none"
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            disabled={isLoading}
            className="w-full h-10 px-3 rounded-lg bg-black text-white border border-[#f59e0b] outline-none"
          />

          <div className="flex justify-center gap-4 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-xl font-bold transition-all hover:scale-95"
              style={{
                backgroundColor: "#f59e0b",
                color: "#111827",
              }}
            >
              {isLoading ? "Submitting..." : "Register"}
            </button>

            <button
              type="reset"
              disabled={isLoading}
              className="px-6 py-2 rounded-xl font-bold bg-black text-white border border-[#f59e0b]"
            >
              Reset
            </button>
          </div>

          <div className="flex justify-center text-sm text-gray-300 pt-2">
            <span>Already have an account?</span>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="ml-2 font-semibold text-[#f59e0b] hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </form>

      <p className="text-center text-gray-600 mt-8 text-sm">
        All fields marked are mandatory. We respect your privacy.
      </p>
    </section>
  );
};

export default Register;
