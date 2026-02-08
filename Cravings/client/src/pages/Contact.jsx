import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";
import Bpic from "../assets/f7.webp";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    message: "",
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
      message: "",
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
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
              Contact Us 🍽️
            </h1>
            <p className="text-sm text-gray-300">We'd love to hear from you</p>
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

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              disabled={isLoading}
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-black text-white border border-[#f59e0b] outline-none resize-none"
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
                {isLoading ? "Submitting..." : "Submit"}
              </button>

              <button
                type="reset"
                disabled={isLoading}
                className="px-6 py-2 rounded-xl font-bold bg-black text-white border border-[#f59e0b]"
              >
                Clear
              </button>
            </div>
          </div>
        </form>
         <div>
          <iframe
            src={
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3483.9331294936896!2d77.45477337509959!3d23.268962679001856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c6967f58e0dbf%3A0x65d0724cf8368e2d!2sRICR%20-%20Raj%20Institute%20of%20Coding%20%26%20Robotics%20%7C%20Best%20Java%20Coding%20Classes%20In%20Bhopal!5e1!3m2!1sen!2sin!4v1770470878471!5m2!1sen!2sin"
            }
            width={"600"}
            height={"450"}
            allowFullScreen={""}
            loading={"lazy"}
            referrerPolicy={"no-referrer-when-downgrade"}
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Contact;
