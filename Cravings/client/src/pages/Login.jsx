import React, { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMailOutline } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../config/Api";
import {useNavigate} from "react-router-dom";
import Bpic from "../assets/f7.webp"
const Login = () => {
  const navigate= useNavigate();
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
    setLoginData({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/auth/login", loginData);
      console.log(loginData);
      toast.success(res.data.message);
      handleClearForm();
      navigate("/user-dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className=" flex justify-center items-center "
      style={{backgroundImage:`url(${Bpic})`,
    backgroundSize:"cover",
    backgroundPosition:"center",
    height:"92vh",

 }}
    >
      <div className="">
        <form onSubmit={handleSubmit} onReset={handleClearForm} className="">
           <div className="bg-white rounded-t-2xl p-2 border-(--color-primary) border-2">
            <h1
              className="text-3xl font-semibold text-center"
              style={{ color: "var(--color-primary)" }}
            >
              <span className=" underline"> Lo</span>
              <span className="text-(--color-secondary)">gin</span>
            </h1> 
           </div>

          <div
            className="rounded-b-2xl px-10 py-6 shadow-xl w-fit bg-white/80"
            style={{
              border: "2px solid var(--color-primary)",
            }}
          >
           
            <div className="flex items-center gap-2 mb-4 mt-2.5">
              <MdOutlineMailOutline
                className="text-2xl"
                style={{ color: "var(--color-accent)" }}
              />
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                disabled={isLoading}
                required
                className="rounded-lg px-3 h-10 w-64 border outline-none  disabled:cursor-not-allowed disabled:bg-gray-300"
                style={{
                  borderColor: "var(--color-primary)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div className="flex items-center gap-2 mb-6">
              <TbLockPassword
                className="text-2xl"
                style={{ color: "var(--color-accent)" }}
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Enter Password"
                required
                className="rounded-lg px-3 h-10 w-64 border outline-nonedisabled:cursor-not-allowed disabled:bg-gray-300"
                style={{
                  borderColor: "var(--color-primary)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  background: "var(--color-primary)",
                  color: "white",
                }}
                className="px-5 py-2 rounded-xl hover:scale-95 transition-all disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>

              <button
                type="reset"
                disabled={isLoading}
                style={{
                  background: "var(--color-secondary)",
                  color: "white",
                }}
                className="px-5 py-2 rounded-xl hover:scale-95 transition-all disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Reset
              </button>
              
          </div>
          <div className="flex mt-4">
                <p className="text-lg">Don't have account?</p>
              <button className="text-lg underline text-(--color-text) ms-2 font-semibold font-sans" onClick={()=>navigate("/register")}>Register</button></div>
            </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
