import React, { useState } from "react";

const SignUp = () => {
  const [contactData, setContactData] = useState({
    fullname: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setContactData({
      fullname: "",
      email: "",
      password: "",
      dob: "",
      phone: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(contactData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

    handleClearForm();
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleClearForm} className="border border-white">
      <div className="border bg-sky-200 shadow-xl shadow-red-950 p-5 rounded-xl">

        <div className="flex flex-col gap-1">
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={contactData.fullname}
            onChange={handleChange}
            className="h-8 border border-blue-400 text-center"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={contactData.email}
            onChange={handleChange}
            className="h-8 border border-blue-400 text-center"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={contactData.password}
            onChange={handleChange}
            className="h-8 border border-blue-400 text-center"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>DOB</label>
          <input
            type="date"
            name="dob"
            value={contactData.dob}
            onChange={handleChange}
            className="h-8 border border-blue-400 text-center"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={contactData.phone}
            onChange={handleChange}
            className="h-8 border border-blue-400 text-center"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="reset"
            className="bg-red-800 hover:bg-red-950 text-white px-4 py-2 rounded-xl"
          >
            Reset
          </button>

          <button
            type="submit"
            className="bg-green-800 hover:bg-green-950 text-white px-4 py-2 rounded-xl"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>

      </div>
    </form>
  );
};

export default SignUp;
