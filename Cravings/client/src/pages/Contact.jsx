import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaRegAddressBook } from "react-icons/fa";
import { useState } from "react";

const Contact = () => {
  const [contactData,setContactData] = useState({
    fullName:"",
    email:"",
    message:"",
  })
  const [isloading, setIsLoading] = useState(false);

  const handleResetForm = () => {
    setFullName("");
    setEmail("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      const data = {
        fullname,
        email,
        message,
      };
      console.log(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className=" ">
        <div className="px-8 py-3">
          <h1 className="font-semibold  text-4xl text-black/80 ms-30">
            Get in Touch
          </h1>
          <p className="text-white text-2xl ms-35 mt-5">
            Any question or remarks? just write us a message!
          </p>
        </div>
        <div className="flex justify-center gap-35 p-5">
          <form className="" onSubmit={handleSubmit} onReset={handleResetForm}>
            <div className="border border-white bg-white/70 shadow-md hover:shadow-red-900 rounded-2xl px-10 py-5 flex flex-col ">
              <div className="flex flex-col gap-1 mb-4">
                {" "}
                <label
                  htmlFor="fullname"
                  className="text-xl text-gray-800 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Enter your Name"
                  value={fullname}
                  onChange={(event) => setFullName(event.target.value)}
                  className="outline-rose-300 rounded-lg border border-rose-900 bg-white text-center text-red-950 text-lg w-75 h-10"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label
                  htmlFor="email"
                  className="text-xl text-gray-800 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter a valid email address"
                  required
                  className="outline-rose-300 rounded-lg border border-rose-900 bg-white text-center text-red-950 text-lg w-75 h-10"
                />
              </div>
              <div className="flex flex-col gap-1 ">
                {" "}
                <label
                  htmlFor="message"
                  className="text-xl text-gray-800 font-medium"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write here.. what you wanted to say!!"
                  required
                  className="outline-rose-300 rounded-lg border border-rose-900 bg-white text-center text-lg p-2 text-red-950 w-75 h-25"
                ></textarea>
              </div>

              <div className="flex flex-col gap-5 mt-5">
                <button
                  className="border  border-rose-900  p-4 rounded-xl bg-green-800 text-white hover:bg-green-900 "
                  type="submit"
                >
                  {isloading ? "Loading" : "Send Message"}
                </button>
                <button
                  className="border p-4  border-rose-900 rounded-xl bg-red-800 text-white hover:bg-red-900"
                  type="reset"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
          <div className="flex flex-col gap-5 mt">
            <div className="border border-white bg-white/70 shadow-md hover:shadow-red-900 rounded-2xl px-10 py-8 flex flex-col gap-4">
              <div className="flex gap-6">
                {" "}
                <div className="text-5xl">
                  <h1 className="">
                    <MdOutlineMailOutline />
                  </h1>
                </div>
                <div className="grid ">
                  <h3 className="text-xl font-medium ">Email</h3>
                  <p className="">hello@aurabeauty.com</p>
                </div>
              </div>
              <div className="flex gap-6">
                {" "}
                <div className="text-4xl">
                  {" "}
                  <h1>
                    <FiPhone />
                  </h1>
                </div>
                <div className="grid">
                  <h3 className="text-xl font-medium ">Phone</h3>
                  <p className="">=+91 12345-67890</p>
                </div>
              </div>
              <div className="flex gap-6">
                {" "}
                <div className="text-4xl ">
                  <h1>
                    <FaRegAddressBook />
                  </h1>
                </div>
                <div className="">
                  <h3 className="text-xl font-medium ">Address</h3>
                  <p className="">123 Beauty Lane New York, NY 10001</p>
                </div>
              </div>
            </div>
            <div className="border border-white bg-white/70 shadow-md hover:shadow-red-900 rounded-2xl px-10 py-8 flex flex-col gap-5">
              <h2 className="text-xl font-medium ">Hours</h2>
              <p className="">Monday - Friday:9:00 AM - 6:00 PM</p>{" "}
              <p className="">Saturday:10:00 AM - 4:00 PM</p>{" "}
              <p className="">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
