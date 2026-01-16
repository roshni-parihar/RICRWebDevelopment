import React from 'react'
import bg from "../assets/f5.jpg"

const Home = () => {
  return (
    <div style={{backgroundImage:`url(${bg})`,
    backgroundSize:"cover",
    backgroundPosition:"center",
  height:"92vh"}}>Home</div>
  )
}

export default Home