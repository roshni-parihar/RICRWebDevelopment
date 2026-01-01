import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

function RicrForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    dob: "",
    qualification: "",
    percentage: "",
    pin: "",
    city: "",
    address: "",
    batch: [],
    time: [],
    guardianName: "",
    guardianContact: "",
    specialRequirements: "",
    hearAboutUs: "",
  });

  const [isloading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let temp = formData.batch;
      if (checked) {
        temp.push(value);
        setFormData((pre) => ({ ...pre, [name]: temp }));
      } else {
        temp = Object.values(temp); //Convert to Array
        temp = temp.filter((word) => word !== value); //Remove the Undersired Value
        setFormData((pre) => ({ ...pre, [name]: temp }));
      }
    } else {
      setFormData((pre) => ({ ...pre, [name]: value }));
    }
  };
  const handleClearForm = () => {
    setFormData({
      fullname: "",
      email: "",
      mobile: "",
      dob: "",
      qualification: "",
      percentage: "",
      pin: "",
      city: "",
      address: "",
      batch: [],
      time: [],
      guardianName: "",
      guardianContact: "",
      specialRequirements: "",
      hearAboutUs: "",
    });
  };

  const validate = () => {
    let Error = {};
    if (formData.fullname.length < 3) {
      Error.fullname = "Name should be more than 3 characters!";
    } else {
      if (!/^[A-Za-z ]+$/.test(formData.fullname)) {
        Error.fullname = "Only Contain A-Z, a-z and space";
      }
    }
    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      Error.mobile = "Only Indian Mobile Number allowed";
    }

    if (formData.guardianName.length < 3) {
      Error.fullname = "Name should be more than 3 characters!";
    } else {
      if (!/^[A-Za-z ]+$/.test(formData.guardianName)) {
        Error.guardianName = "Only Contain A-Z, a-z and space";
      }
    }
    if (!/^[6-9]\d{9}$/.test(formData.guardianContact)) {
      Error.guardianContact = "Only Indian Mobile Number allowed";
    }
    if (!/^[1-9][0-9]{5}$/.test(formData.pin)) {
      Error.pin = "Enter valid PinCode";
    }
    if (!/^[A-Za-z\s]{2,50}$/.test(formData.city)) {
      Error.city = "Enter valid City!";
    }
    if (!/^[A-Za-z0-9\s,./-]{10,150}$/.test(formData.address)) {
      Error.address = "Please Enter Valid Address!";
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
      console.log(formData);
      toast.success("Registration Successfull");
      handleClearForm();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <nav>
          <div className="w-full bg-blue-600 px-3 py-1 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <h1 className="text-white text-2xl font-semibold">
                Registration Page
              </h1>
            </div>
            <button className="bg-cyan-400 text-black px-4 py-1 rounded">
              Student Login
            </button>
          </div>
        </nav>

        <form className="" onReset={handleClearForm} onSubmit={handleSubmit}>
          <div className="max-w-6xl mx-auto bg-white border rounded shadow p-3 mt-3">
            <div className="border border-black rounded p-3 pt-4 my-3 relative">
              <span className="absolute -top-4 bg-white px-2 text-lg text-blue-600">
                Personal Information
              </span>

              <div className=" space-y-4  ">
                <div className="flex items-center">
                  <label htmlFor="fullname" className="w-1/4 font-medium">
                    Full Name: <sup className="text-red-500">*</sup>
                  </label>
                  <div>
                    {" "}
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="w-210 h-fit border rounded px-3 py-1"
                    />{" "}
                    {validationError.fullname && (
                      <span className="text-xs text-red-500">
                        {validationError.fullname}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <label htmlFor="email" className="w-1/4 font-medium">
                    Email Address: <sup className="text-red-500">*</sup>
                  </label>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-210 h-fit border rounded px-3 py-1"
                    />
                    {validationError.email && (
                      <span className="text-xs text-red-500">
                        {validationError.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <label htmlFor="mobile" className="w-1/4 font-medium">
                    Mobile no: <sup className="text-red-500">*</sup>
                  </label>
                  <div>
                    {" "}
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-210 h-fit border rounded px-3 py-1"
                    />{" "}
                    {validationError.mobile && (
                      <span className="text-xs text-red-500">
                        {validationError.mobile}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <label htmlFor="dob" className="w-1/4 font-medium">
                    D.O.B.: <sup className="text-red-500">*</sup>
                  </label>
                  <div>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-210 h-fit border rounded px-3 py-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-black rounded p-3 pt-4 my-3 relative">
              <span className="absolute -top-4 bg-white px-2 text-lg text-blue-600">
                Academic Details
              </span>

              <div className="space-y-3">
                <div className="flex items-center">
                  <label htmlFor="qualification" className="w-1/4 font-medium">
                    Qualification: <sup className="text-red-500">*</sup>
                  </label>
                  <select
                    className="w-3/4 border rounded px-3 py-1"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                  >
                    <option value="">--Select Qualification</option>
                    <option>Secondary Schooling</option>
                    <option>Senior Secondary Schooling</option>
                    <option>Graduation</option>
                    <option>Post Graduation</option>
                    <option>P.hd</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label htmlFor="percentage" className="w-1/4 font-medium">
                    Percentage / Grade: <sup className="text-red-500">*</sup>
                  </label>
                  <div>
                    <input
                      className="w-200 h-fit border rounded px-3 py-1"
                      name="percentage"
                      value={formData.percentage}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-black rounded p-3 pt-4 my-3 relative">
              <span className="absolute -top-4 bg-white px-2 text-lg text-blue-600">
                Course Information
              </span>

              <div className="space-y-3">
                <div className="flex items-center">
                  <label htmlFor="course" className="w-1/4 font-medium">
                    Available Courses: <sup className="text-red-500">*</sup>
                  </label>
                  <select
                    className="w-3/4 border rounded px-3 py-1"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">--Select Course</option>
                    <option>Full Stack Development</option>
                    <option>Data Science</option>
                    <option>Data Analytics</option>
                    <option>Java DSA</option>
                    <option>Python DSA</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label htmlFor="batch" className="w-1/4 font-medium">
                    Preferred Batch: <sup className="text-red-500">*</sup>
                  </label>

                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      name="batch"
                      value="morning"
                      onChange={handleChange}
                      checked={Object.values(formData.batch).includes(
                        "morning"
                      )}
                    />
                    <span>Morning</span>
                    <input
                      type="checkbox"
                      name="batch"
                      value="afternoon"
                      onChange={handleChange}
                      checked={Object.values(formData.batch).includes(
                        "afternoon"
                      )}
                    />{" "}
                    <span>AfterNoon</span>
                    <input
                      type="checkbox"
                      name="batch"
                      value="evening"
                      onChange={handleChange}
                      checked={Object.values(formData.batch).includes(
                        "evening"
                      )}
                    />
                    <span>Evening</span>
                    <input
                      type="checkbox"
                      name="batch"
                      value="weekend"
                      onChange={handleChange}
                      checked={Object.values(formData.batch).includes(
                        "weekend"
                      )}
                    />
                    <span>Weekends</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <label htmlFor="time" className="w-1/4 font-medium">
                    Preferred Timing: <sup className="text-red-500">*</sup>
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="time"
                      value="6-7pm"
                      onChange={handleChange}
                      checked={formData.time === "6-7pm"}
                      className=" "
                    />
                    <span>6:00-7:30 PM</span>

                    <input
                      type="radio"
                      name="time"
                      value="7-9pm"
                      onChange={handleChange}
                      checked={formData.time === "7-9pm"}
                      className=" "
                    />
                    <span>7:00-9:00 PM</span>

                    <input
                      type="radio"
                      name="time"
                      value="7-9am"
                      onChange={handleChange}
                      checked={formData.time === "7-9am"}
                      className=" "
                    />
                    <span>7:00-9:00 AM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-black rounded p-3 pt-4 my-3 relative">
              <span className="absolute -top-4 bg-white px-2 text-lg text-blue-600">
                Address
              </span>

              <div className="space-y-3 ">
                <div className="flex items-center">
                  <label htmlFor="address" className="w-1/4 font-medium">
                    Address: <sup className="text-red-500">*</sup>
                  </label>
                  <textarea
                    className="w-210 h-fit border rounded px-3 py-1"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {validationError.address && (
                    <span className="text-xs text-red-500">
                      {validationError.address}
                    </span>
                  )}
                </div>

                <div className="flex items-center">
                  <label htmlFor="city" className="w-1/4 font-medium">
                    City: <sup className="text-red-500">*</sup>
                  </label>
                  <div>
                    {" "}
                    <input
                      className="w-210 h-fit border rounded px-3 py-1"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {validationError.city && (
                      <span className="text-xs text-red-500">
                        {validationError.city}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <label htmlFor="pin" className="w-1/4 font-medium">
                    Pin Code: <sup className="text-red-500">*</sup>
                  </label>
                  <div>
                    <input
                      className="w-210 h-fit border rounded px-3 py-1"
                      name="pin"
                      value={formData.pin}
                      onChange={handleChange}
                    />
                    {validationError.pin && (
                      <span className="text-xs text-red-500">
                        {validationError.pin}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-black rounded p-3 pt-4 my-3 relative">
              <span className="absolute -top-4 bg-white px-2 text-lg text-blue-600">
                Guardian Details
              </span>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="guardianName"
                    placeholder="Guardian's Full Name"
                    value={formData.guardianName}
                    onChange={handleChange}
                    required
                    className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                  />{" "}
                  {validationError.guardianName && (
                    <span className="text-xs text-red-500">
                      {validationError.guardianName}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="guardianContact"
                    placeholder="Guardian's Contact Number"
                    maxLength="10"
                    value={formData.guardianContact}
                    onChange={handleChange}
                    required
                    className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                  />{" "}
                  {validationError.guardianContact && (
                    <span className="text-xs text-red-500">
                      {validationError.guardianContact}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="border border-black rounded p-3 pt-4 my-3 relative">
              <span className="absolute -top-4 bg-white px-2 text-lg text-blue-600">
                Information
              </span>
              <div className="space-y-6">
                <select
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition bg-white"
                >
                  <option value="">How did you hear about us?</option>
                  <option value="Friends">Friends</option>
                  <option value="Online Ad">Online Ad</option>
                  <option value="Newspaper">Newspaper</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  name="specialRequirements"
                  placeholder="Special Requirements (optional)"
                  rows="3"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="reset"
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Clear
              </button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded">
                {isloading ? "Loading" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RicrForm;
