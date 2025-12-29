import React, { useState } from "react";

const Login = () => {
  const [contactData, setContactData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setContactData({
      email: "",
      password: "",
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
    <section className="">
      <div className=" py-5 text-center">
        <form onSubmit={handleSubmit} onReset={handleClearForm}>
          <div className="border border-white bg-white  rounded py-5">
            
            <div className="flex  gap-5">
              <label className="">Email</label>
              <input
                type="email"
                name="email"
                value={contactData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                required
                className="rounded border  border-blue-600 text-center"
              />
            </div>

            <div className="flex mt-4">
              <label className=" font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={contactData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                required
                className="rounded border border-rose-900 text-center h-10"
              />
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <button
                type="submit"
                className="bg-green-800 text-white p-3 rounded hover:bg-green-900"
              >
                {isLoading ? "Loading..." : "Send Message"}
              </button>

              <button
                type="reset"
                className="bg-red-800 text-white p-3 rounded hover:bg-red-900"
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
