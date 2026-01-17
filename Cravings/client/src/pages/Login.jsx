import React, { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMailOutline } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";
import Bpic from "../assets/f7.webp";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setLoginData({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(loginData);
    

    try {
      const res = await api.post("/auth/login", loginData);
      toast.success(res.data.message);
      handleClearForm();
      navigate("/user-dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
        className="w-95 rounded-2xl shadow-2xl backdrop-blur-md"
        style={{
          backgroundColor: "rgba(17,24,39,0.9)",
          border: "2px solid #f59e0b",
        }}
      >
        <div className="py-4 rounded-t-2xl text-center border-b border-[#f59e0b]">
          <h1 className="text-3xl font-extrabold text-[#f59e0b]">
            Foodie Login 🍕
          </h1>
          <p className="text-sm text-gray-300">Taste starts here</p>
        </div>

        <div className="px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <MdOutlineMailOutline className="text-2xl text-[#f59e0b]" />
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Email"
              disabled={isLoading}
              className="w-full h-10 px-3 rounded-lg bg-black text-white border border-[#f59e0b] outline-none focus:ring-2 focus:ring-[#f59e0b]"
            />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <TbLockPassword className="text-2xl text-[#f59e0b]" />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              disabled={isLoading}
              className="w-full h-10 px-3 rounded-lg bg-black text-white border border-[#f59e0b] outline-none focus:ring-2 focus:ring-[#f59e0b]"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-xl font-bold transition-all hover:scale-95"
              style={{
                backgroundColor: "#f59e0b",
                color: "#111827",
              }}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            <button
              type="reset"
              disabled={isLoading}
              className="px-6 py-2 rounded-xl font-bold bg-black text-white border border-[#f59e0b]"
            >
              Reset
            </button>
          </div>

          <div className="flex justify-center mt-6 text-sm text-gray-300">
            <span>New customer?</span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="ml-2 font-semibold text-[#f59e0b] hover:underline"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
