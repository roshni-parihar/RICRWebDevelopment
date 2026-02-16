import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./pages/dashboards/UserDashboard";
import RiderDashboard from "./pages/dashboards/RiderDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import RestaurantDashboard from "./pages/dashboards/RestaurantDashboard";
import RestaurantDisplayMenu from "./pages/RestaurantDisplayMenu";
import OrderNow from "./pages/OrderNow";
import NotFound from "./pages/NotFound";
import RestaurantImages from "./components/restaurantDashboard/RestaurantImages";
import OrderNowCopy from "./pages/OrderNowCopy";
import CheckoutPage from "./pages/CheckoutPage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/rider-dashboard" element={<RiderDashboard />} />
          <Route
            path="/restaurant-dashboard"
            element={<RestaurantDashboard />}
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/order-now" element={<OrderNow />} />
          <Route
            path="/restaurantMenu"
            element={<RestaurantDisplayMenu />}
          />
          <Route path="/orderNowCopy" element={<OrderNowCopy />} />

          <Route path="restaurant-images" element={<RestaurantImages />} />

          <Route path="checkout-page" element={<CheckoutPage/>}/>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
