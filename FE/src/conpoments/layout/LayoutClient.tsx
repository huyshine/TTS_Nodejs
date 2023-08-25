import React from "react";
import Footer from "../footer";
import Header from "../header";
import Slider from "../slider";
import { Outlet } from "react-router-dom";

type Props = {};

const LayoutClient = () => {
  return (
    <main className="main-section">
      <Header />
      <Slider />
      <div className="main-section ptd100">
        <div className="container">
            <Outlet />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default LayoutClient;
