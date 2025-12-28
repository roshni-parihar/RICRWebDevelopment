import React from "react";

const Contact = () => {
  return (
    <>
      <section className=" flex flex-col justify-center items-center">
        <div className="">
          <h1 className="font-medium text-4xl text-sky-900">Contact Us</h1>
          <p>Any question or remarks? just write us a message!</p>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Enter a valid email address" className="rounded-3xl" 
             />
             <label htmlFor="Name">Name</label>
             <input type="text" name="name" id="name"  placeholder="Enter your Name"/>
          </div>
          <button className="border p-4">SUBMIT</button>
        </div>
        <div></div>
      </section>
    </>
  );
};

export default Contact;
