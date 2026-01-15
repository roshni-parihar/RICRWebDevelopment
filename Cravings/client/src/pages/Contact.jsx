import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    message:"",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      message:"",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/public/new-contact", formData);
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
      <section className="min-h-screen flex justify-center items-center bg-(--color-background) ">
        <div className="py-5">
          <form onSubmit={handleSubmit} onReset={handleClearForm}>
            <div
              className="rounded-2xl px-10 py-6 shadow-xl w-fit "
              style={{
                background: "white",
                border: "2px solid var(--color-primary)",
              }}
            >
              <h1 className="text-3xl font-semibold text-center mb-4 text-(--color-primary) ">
                 Contact Us
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
                    className="rounded-lg px-3 h-10 w-72 border outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
                    style={{ borderColor: "var(--color-primary)" }}
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="fullName" className="text-l font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    disabled={isLoading}
                    className="rounded-lg px-3 h-10 w-72 border outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
                    style={{ borderColor: "var(--color-primary)" }}
                  />
                </div>

                <div className="flex justify-between">
                  {" "}
                  <label htmlFor="email" className="text-l font-semibold">
                    Contact
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    maxLength="10"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    required
                    disabled={isLoading}
                    className="rounded-lg px-3 h-10 w-72 border outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
                    style={{ borderColor: "var(--color-primary)" }}
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="message " className="text-l font-semibold">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write message here.."
                    disabled={isLoading}
                    required
                    className="rounded-lg px-3 h-30 w-72 border outline-none disabled:cursor-not-allowed disabled:bg-gray-200 "
                    style={{ borderColor: "var(--color-primary)" }}
                  >
                    Message
                  </textarea>
                </div>
              </div>

              <div className="flex gap-4 justify-center mt-6">
                <button
                  type="submit"
                  style={{ background: "var(--color-primary)", color: "white" }}
                  className="px-5 py-2 rounded-xl hover:scale-95 transition-all disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>

                <button
                  type="reset"
                  style={{
                    background: "var(--color-secondary)",
                    color: "white",
                  }}
                  className="px-5 py-2 rounded-xl hover:scale-95 transition-all disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Clear
                </button>
              </div>

              
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
