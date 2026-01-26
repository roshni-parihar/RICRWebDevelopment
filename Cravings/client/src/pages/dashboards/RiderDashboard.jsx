import React, { useState } from "react";
import RiderOverview from "../../components/RiderDashboard/RiderOverview";
import RiderSideBar from "../../components/RiderDashboard/RiderSidebar";
import RiderProfile from "../../components/RiderDashboard/RiderProfile";
import RiderRides from "../../components/RiderDashboard/RiderRides";
import RiderHelpDesk from "../../components/RiderDashboard/RiderHelpDesk";
import bg from "../dashboards/images/f7.webp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
const RiderDashboard = () => {
  const { role, isLogin } = useAuth();
  const [active, setActive] = useState("overview");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });
  if (role !== "partner") {
    return (
      <>
        <div className="p-3">
          <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-gray-100">
            <div className="text-5xl text-red-600">⊗</div>
            <div className="text-xl">
              You are not login as Rider. Please Login again.
            </div>
          </div>
        </div>
      </>
    );
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
      >
        {" "}
        <div className=" w-full  flex min-h-screen ">
          <div
            className={`bg-(--color-border) text-white   duration-100 ${isOpen ? "w-2/60}" : "w-12/60"}`}
          >
            <RiderSideBar
              active={active}
              setActive={setActive}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
          <div className={`duration-300 ${isOpen ? "w-58/60}" : "w-48/60"}`}>
            {active === "overview" && <RiderOverview />}
            {active === "profile" && <RiderProfile />}
            {active === "rides" && <RiderRides />}

            {active === "helpdesk" && <RiderHelpDesk />}
          </div>
        </div>
      </section>
    </>
  );
};

export default RiderDashboard;
