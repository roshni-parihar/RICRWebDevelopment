import React from "react";
import { useState } from "react";

const Contact = () => {
  const [contactData, setContactData] = useState({
    fullname: "",
    email: "",
    message: "",
    religion: "",
    gender: "",
    skill: [],
  });
  
  const [isloading, setIsLoading] = useState(false);

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let temp = contactData.skill;
      if (checked) {
        temp.push(value);
        setContactData((previousData) => ({ ...previousData, [name]: temp }));
      } else {
        temp = Object.values(temp); //Convert to Array
        temp = temp.filter((word) => word !== value); //Remove the Undersired Value
        setContactData((previousData) => ({ ...previousData, [name]: temp }));
      }
    } else {
      setContactData((previousData) => ({ ...previousData, [name]: value }));
    }
  };
  const handleClearForm = () => {
    setContactData({
      fullname: "",
      email: "",
      message: "",
      religion: "",
      gender: "",
      skill: [],
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
    <>
      <div className="  text-white text-center p-4">
        <h1>Contact Us</h1>
        <div className="container">
          <form
            className="border rounded bg-amber-500 border-white"
            onReset={handleClearForm}
            onSubmit={handleSubmit}
          >
            <div className="p-3">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                name="fullname"
                //value={fullname}
                value={contactData.fullname}
                // onChange={(event) => setFullName(event.target.value)}
                onChange={handleChange}
                placeholder="Enter FullName"
                className=" ms-2 rounded"
                required
              />
            </div>
            <div className="p-2">
              <label htmlFor="email">FullName</label>
              <input
                type="email"
                name="email"
                value={contactData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="rounded ms-2"
                required
              />
            </div>
            <div className="p-2">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                value={contactData.message}
                onChange={handleChange}
                placeholder="Write your message here.."
                className="rounded ms-2"
                required
              >
                message
              </textarea>
            </div>
            <div className=" flex p-3">
              <label htmlFor="religion " className="me-2">
                Religion
              </label>
              <select
                name="religion"
                id="religion"
                className="rounded border"
                onChange={handleChange}
                value={contactData.religion}
              >
                <option value="">--select religion--</option>
                <option value="hinduism">Hinduism</option>
                <option value="islam">Islam</option>
                <option value="buddhism">Buddhism</option>
              </select>
            </div>{" "}
            <div className="p-2 ">
              <label htmlFor="gender" className="px-2">
                Gender
              </label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
                checked={contactData.gender === "male"}
                className="mx-1 "
              />
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
                checked={contactData.gender === "female"}
                className="mx-1 "
              />
              Female
              <input
                type="radio"
                name="gender"
                value="other"
                onChange={handleChange}
                checked={contactData.gender === "other"}
                className="mx-1 "
              />
              Other
            </div>
            <div className="d-flex justify-content-center">
              <label htmlFor="skill" className="">
                Skills
              </label>
              <div>
                <input
                  type="checkbox"
                  name="skill"
                  value="html"
                  onChange={handleChange}
                  checked={Object.values(contactData.skill).includes("html")}
                  className="mx-2"
                />
                HTML
                <input
                  type="checkbox"
                  name="skill"
                  value="css"
                  onChange={handleChange}
                  checked={
                    Object.values(contactData.skill).find(
                      (word) => word === "css"
                    )
                      ? true
                      : false
                  }
                  className="mx-2 "
                />
                CSS
                <input
                  type="checkbox"
                  name="skill"
                  value="js"
                  onChange={handleChange}
                  checked={
                    Object.values(contactData.skill).find(
                      (word) => word === "js"
                    )
                      ? true
                      : false
                  }
                  className="mx-2"
                />
                JS
                <input
                  type="checkbox"
                  name="skill"
                  value="React"
                  onChange={handleChange}
                  checked={Object.values(contactData.skill).includes("react")}
                  className="mx-2"
                />
                React
              </div>
            </div>
            <div className="p-2">
              <button type="submit" className="rounded ">
                {isloading ? "Loading" : "Submit"}
              </button>
              <button type="reset" className=" rounded">
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Contact;
