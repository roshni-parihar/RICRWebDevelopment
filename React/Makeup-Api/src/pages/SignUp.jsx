import React, { useState } from "react";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    fullname: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setSignUpData({
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
      console.log(signUpData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

    handleClearForm();
  };

  return (
    <>
      <div className=" flex justify-center py-5">
        <form onSubmit={handleSubmit} onReset={handleClearForm} className="">
          <div className="border border-white bg-white/70 shadow-md hover:shadow-red-900 rounded-2xl px-10 py-5 flex flex-col w-fit ">
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="fullname" className="text-lg">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={signUpData.fullname}
                onChange={handleChange}
                className="outline-rose-300 rounded-lg border border-rose-900 bg-white text-center text-red-950 text-lg w-75 h-10"
              />
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={signUpData.email}
                onChange={handleChange}
                className="outline-rose-300 rounded-lg border border-rose-900 bg-white text-center text-red-950 text-lg w-75 h-10"
              />
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={signUpData.password}
                onChange={handleChange}
                className="outline-rose-300 rounded-lg border border-rose-900 bg-white text-center text-red-950 text-lg w-75 h-10"
              />
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="dob" className="text-lg">
                DOB
              </label>
              <input
                type="date"
                name="dob"
                value={signUpData.dob}
                onChange={handleChange}
                className="outline-rose-300 rounded-lg border border-rose-900 bg-white text-center text-red-950 text-lg w-75 h-10"
              />
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="phone" className="text-lg">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={signUpData.phone}
                onChange={handleChange}
                className="outline-rose-300 rounded-lg border border-rose-900 bg-white text-center text-red-950 text-lg w-75 h-10"
              />
            </div>

            <div className=" flex items-center justify-center gap-4 mt-4">
              <button
                type="reset"
                className="bg-red-800 hover:bg-red-950 text-white px-4 py-2 rounded-xl w-25"
              >
                Reset
              </button>

              <button
                type="submit"
                className="bg-green-800 hover:bg-green-950 text-white px-4 py-2 rounded-xl w-25"
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
