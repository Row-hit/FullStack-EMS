import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="   w-auto lg:w-72 md:flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto max-lg:pt-10">
        <div className="p-4 sm:pt-16 sm:p-6 lg:pt-6  lg:p-8 lg:pl-10 w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
