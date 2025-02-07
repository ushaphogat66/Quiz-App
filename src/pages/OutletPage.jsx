import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Nav&Footer/Navbar";
import Footer from "../Nav&Footer/Footer";

const OutletPage = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default OutletPage;
