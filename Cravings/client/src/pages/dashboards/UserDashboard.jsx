import React, { useState } from "react";
import UserOverview from "../../components/userDashboard/userOverview";
import UserSideBar from "../../components/userDashboard/UserSidebar";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrders from "../../components/userDashboard/UserOrders";
import UserTransaction from "../../components/userDashboard/UserTransaction";
import UserHelpDesk from "../../components/userDashboard/UserHelpDesk";
import bg from "../dashboards/images/f7.webp"
import { useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const UserDashboard = () => {

  const {role, isLogin} = useAuth();
  const location= useLocation()
  const ActiveTab = location.state?.tab || "orders";
  //console.log(useLocation.state);
  
  const [active, setActive] = useState(ActiveTab||"overview");
  const navigate = useNavigate();
 const [isOpen,setIsOpen]=useState(false);
 
  useEffect(()=>{
    if(!isLogin){
      navigate("/login");
    }
  })
  if(role !== "customer"){
    return <>
    <div className="p-3">
          <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-gray-100">
            <div className="text-5xl text-red-600">
              ⊗
            </div>
            <div className="text-xl">
              You are not login as Customer. Please Login again.
            </div>
          </div>
        </div></>
  }
  return (
    <>
      <section
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    > <div className=" w-full  flex min-h-screen ">
        <div className={`bg-(--color-border) text-white   duration-100 ${isOpen?"w-2/60}":"w-12/60"}`}>
          <UserSideBar active={active} setActive={setActive} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className={`duration-300 ${isOpen?"w-58/60}":"w-48/60"}`}>
          {active === "overview" && <UserOverview />}
          {active === "profile" && <UserProfile />}
          {active === "orders" && <UserOrders />}
          {active === "transaction" && <UserTransaction />}
          {active === "helpdesk" && <UserHelpDesk />}
        </div>
      </div></section>
    </>
  );
};

export default UserDashboard;
