import React, { useState } from "react";
import UserOverview from "../../components/userDashboard/userOverview";
import UserSideBar from "../../components/userDashboard/UserSidebar";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrders from "../../components/userDashboard/UserOrders";
import UserTransaction from "../../components/userDashboard/UserTransaction";
import UserHelpDesk from "../../components/userDashboard/UserHelpDesk";

const UserDashboard = () => {
  const [active, setActive] = useState("overview");
  return (
    <>
      <div className=" w-full h-[90vh] flex ">
        <div className="bg-(--color-background) border border-green-900 w-2/10">
          <UserSideBar active={active} setActive={setActive} />
        </div>
        <div className="border border-red-900 w-8/10">
          {active === "overview" && <UserOverview />}
          {active === "profile" && <UserProfile />}
          {active === "orders" && <UserOrders />}
          {active === "transaction" && <UserTransaction />}
          {active === "helpdesk" && <UserHelpDesk />}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
