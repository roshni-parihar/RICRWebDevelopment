import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
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
    });
  };

  const validate = () => {
    let Error = {};

    if (formData.fullName.length < 3) {
      Error.fullName = "Name should be More Than 3 Characters";
    } else {
      if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
        Error.fullName = "Only Contain A-Z , a-z and space";
      }
    }

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    if (!/^[1-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Only Indian Mobile Number allowed";
    }

    setValidationError(Error);

    return Object.keys(Error).length > 0 ? false : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      toast.error("Fill the Form Correctly");
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      handleClearForm();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, "Unkown Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section
        className="min-h-screen flex justify-center items-center bg-(--color-background) "
      
      >
        <div className="py-5">
          <form onSubmit={handleSubmit} onReset={handleClearForm}>
            <div
              className="rounded-2xl px-10 py-6 shadow-xl w-fit "
              style={{
                background: "white",
                border: "2px solid var(--color-primary)",
              }}
            >
              <h1
                className="text-3xl font-semibold text-center mb-4 text-(--color-primary) "
                
              >
               <span className=" underline"> Re</span><span className="text-(--color-secondary)">gister</span>
               
              </h1>

              <div className="grid gap-2.5 mt-2.5">
                <div className="flex justify-between">
                  <label htmlFor="fullName" className="text-l font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    disabled={isLoading}
                    className="rounded-lg px-3 h-10 w-72 border outline-none"
                    style={{ borderColor: "var(--color-primary)" }}
                  />
                  {validationError.fullName && (
                    <p className="text-sm text-red-500">
                      {validationError.fullName}
                    </p>
                  )}
                </div>

                <div  className="flex justify-between">
                   <label htmlFor="fullName" className="text-l font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    disabled={isLoading}
                    className="rounded-lg px-3 h-10 w-72 border outline-none"
                    style={{ borderColor: "var(--color-primary)" }}
                  />
                </div>

                <div  className="flex justify-between">
                  {" "}
                   <label htmlFor="email" className="text-l font-semibold">Contact</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    maxLength="10"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    required
                    disabled={isLoading}
                    className="rounded-lg px-3 h-10 w-72 border outline-none"
                    style={{ borderColor: "var(--color-primary)" }}
                  />
                </div>

                <div  className="flex justify-between">
                  {" "}
                   <label htmlFor="password" className="text-l font-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create Password"
                    required
                    disabled={isLoading}
                    className="rounded-lg px-3 h-10 w-72 border outline-none"
                    style={{ borderColor: "var(--color-primary)" }}
                  />
                </div>

                <div  className="flex justify-between">
                  {" "}
                   <label htmlFor="confirmPassword" className="text-l font-semibold">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                    disabled={isLoading}
                    className="rounded-lg px-3 h-10 w-72 border outline-none"
                    style={{ borderColor: "var(--color-primary)" }}
                  />
                  {validationError.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {validationError.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 justify-center mt-6">
                <button
                  type="submit"
                  style={{ background: "var(--color-primary)", color: "white" }}
                  className="px-5 py-2 rounded-xl hover:scale-95 transition-all"
                >
                  {isLoading ? "Submitting..." : "Register"}
                </button>

                <button
                  type="reset"
                  style={{
                    background: "var(--color-secondary)",
                    color: "white",
                  }}
                  className="px-5 py-2 rounded-xl hover:scale-95 transition-all"
                >
                  Clear
                </button>
              </div>

              <div className="flex mt-4 justify-center">
                <p className="text-lg">Already have an account?</p>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-lg underline ms-2 font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
