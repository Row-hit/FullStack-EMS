import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

const Layout = () => {
  const [desktopOpen, setDesktopOpen] = useState(true);

  //
  return (
    <div className="flex flex-col md:flex-row max-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative">
      <div
        className={` w-auto lg:w-72 md:flex-shrink-0  ${desktopOpen ? "lg:w-72" : "absolute lg:w-0"}`}
      >
        <Sidebar desktopOpen={desktopOpen} setDesktopOpen={setDesktopOpen} />
      </div>
      <main className="flex-1 overflow-scroll   p-5">
        <div className="p-4 sm:pt-16 sm:p-6 lg:pt-6  lg:p-8  w-full  max-w-6xl mx-auto ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
