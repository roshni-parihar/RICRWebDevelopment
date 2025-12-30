import React from "react";
import { useState } from "react";

const Contact = () => {
  const [contactData, setContactData] = useState({
    fullname: "",
    email: "",
    message: "",
    religion: "",
    gender:"",
    skill:[],
  });
  //const [fullname, setFullName] = useState("");
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
  const [isloading, setIsLoading] = useState(false);

  /* const handleClearForm = () => {
    setFullName("");
    setEmail("");
    setMessage("");
  };*/
  const handleChange = (e) => {
    /* const { name, value } = e.target;
    setContactData((previousData) => ({ ...previousData, [name]: value }));
  };*/
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let temp = contactData.skill;
      if (checked) {
        temp.push(value);
        setContactData((previousData) => ({ ...previousData, [name]: temp }));
      } else {
        temp = Object.values(temp);// convert to array
        temp = temp.filter((word) => word !== value); // remove the undersired value
        setContactData((previousData) => ({ ...previousData, [name]: temp }));
      }
    }else{
      setContactData((previousData)=>({...previousData, [name]:value}))
    }
  };
  const handleClearForm = () => {
    fullname("");
    email("");
    message("");
    gender (""),
    religion("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      /* const data = {
        fullname,
        email,
        message,
      };
      console.log(data);*/
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

    handleClearForm();
  };

  return (
    <>
      <div className="bg-blue-200 text-white text-center p-4">
        <h1>Contact Us</h1>
        <div className="container">
          <form className="" onReset={handleClearForm} onSubmit={handleSubmit}>
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
              <label htmlFor="gender">Gender</label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
                checked={contactData.gender === "male"}
              />
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
                checked={contactData.gender === "female"}
              />
              Female
              <input
                type="radio"
                name="gender"
                value="other"
                onChange={handleChange}
                checked={contactData.gender === "other"}
              />
              Other
            </div>

            <div className="p-2">
              <label htmlFor="skill">Skills</label>
              <input
                type="checkbox"
                name="skill"
                value="html"
                onChange={handleChange}
                checked={Object.values(contactData.skill).includes("html")}
                required
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
                required
              />
              CSS
              <input
                type="checkbox"
                name="skill"
                value="js"
                onChange={handleChange}
                checked={
                  Object.values(contactData.skill).find((word) => word === "js")
                    ? true
                    : false
                }
              />
              JS
              <input
                type="checkbox"
                name="skill"
                value="React"
                onChange={handleChange}
                checked={Object.values(contactData.skill).includes("react")}
              />
              React
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
            <div className="p-2">
              <label htmlFor="religion">Religion</label>
              <select name="religion" id="religion" onChange={handleChange} value={contactData.religion}>
                <option value="">--select religion--</option>
                <option value="hinduism">Hinduism</option>
                <option value="islam">Islam</option>
                <option value="Buddhism"></option>
              </select>
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
