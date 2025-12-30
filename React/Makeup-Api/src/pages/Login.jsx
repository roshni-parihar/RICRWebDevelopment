import React, { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMailOutline } from "react-icons/md";

const Login = () => {
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

    try {
      console.log(loginData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

    handleClearForm();
  };

  return (
    <section className="flex justify-center items-center">
      <div className=" py-5 ">
        <form onSubmit={handleSubmit} onReset={handleClearForm}>
          <div className="border border-white bg-white/70 shadow-md hover:shadow-red-900 rounded-2xl px-10 py-5 flex flex-col w-fit ">
            <div className="flex gap-2 ">
              <h1 className=" mt-1 text-2xl"><MdOutlineMailOutline /></h1>
              <div className="flex   gap-1">
                <label htmlFor="email" className="text-xl   ">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  required
                  className="outline-rose-300 rounded-lg border border-rose-900 bg-white text-center text-red-950 text-lg  h-10"
                />
              </div>
            </div>

            <div className="flex gap-2"><h1 className=" mt-4 text-2xl"><TbLockPassword /></h1>
            <div className="flex  gap-1 mt-4">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                required
                className="outline-rose-300 rounded-lg border border-rose-900 bg-white text-center text-red-950 text-lg  h-10 "
              />
            </div></div>

            <div className="flex  gap-4 justify-center items-center mt-6 ">
              <button
                type="submit"
                className="bg-green-800 text-white p-3 rounded-xl hover:bg-green-900 px-4 py-2 w-25"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>

              <button
                type="reset"
                className="bg-red-800 text-white p-3  rounded-xl hover:bg-red-900  px-4 py-2 w-25"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
