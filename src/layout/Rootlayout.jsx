import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Rootlayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar></Navbar>
      </header>
      <main className="grow">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Rootlayout;
