import React, { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMailOutline } from "react-icons/md";
import toast from "react-hot-toast";

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

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      console.log(loginData);
      toast.success("Login successful");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }

    handleClearForm();
  };

  return (
    <section
      className="min-h-screen flex justify-center items-center"
      style={{ background: "var(--color-background)" }}
    >
    

      <div className="py-5">
        <form onSubmit={handleSubmit} onReset={handleClearForm}>
          <div
            className="rounded-2xl px-10 py-6 shadow-xl w-fit"
            style={{
              background: "white",
              border: "2px solid var(--color-primary)",
            }}
          >
            <h1
              className="text-2xl font-semibold text-center mb-4"
              style={{ color: "var(--color-primary)" }}
            >
              Login
            </h1>

            {/* Email */}
            <div className="flex items-center gap-2 mb-4">
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
                required
                className="rounded-lg px-3 h-10 w-64 border outline-none"
                style={{
                  borderColor: "var(--color-primary)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            {/* Password */}
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
                placeholder="Enter Password"
                required
                className="rounded-lg px-3 h-10 w-64 border outline-none"
                style={{
                  borderColor: "var(--color-primary)",
                  color: "var(--color-text)",
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                style={{
                  background: "var(--color-primary)",
                  color: "white",
                }}
                className="px-5 py-2 rounded-xl hover:scale-95 transition-all"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>

              <button
                type="reset"
                style={{
                  background: "var(--color-secondary)",
                  color: "white",
                }}
                className="px-5 py-2 rounded-xl hover:scale-95 transition-all"
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
