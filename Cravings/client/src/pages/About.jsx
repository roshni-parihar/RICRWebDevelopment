import React from 'react'
import Bpic from "../assets/f7.webp";

const About = () => {
  return (
    <section
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${Bpic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></section>
  )
}

export default About