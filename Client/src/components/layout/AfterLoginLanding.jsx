import React from "react";
import { Link } from "react-router-dom";
import DarkThemeToggle from "../ui/DarkThemeToggle";

const AfterLoginLanding = () => {
  return (
    <div className="min-h-screen  flex flex-col  bg-theme  text-main">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 z-50">
        <h1 className="text-2xl font-bold">EMS</h1>
        <DarkThemeToggle />
      </div>

      {/* Center Content */}
      <div className="flex flex-1 items-center justify-center px-6 z-50">
        <div className="text-center max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Smarter Employee Management Starts Here
          </h2>

          <p className="text-md text-[var(--text-main)] opacity-75 mb-8">
            Manage attendance, payroll, and employee data
            <br /> — all in one powerful dashboard.
          </p>

          <Link to="/dashboard">
            <button className="px-8 py-3 bg-inv-bg text-inv-text font-semibold rounded-xl shadow-lg hover:scale-105 transition cursor-pointer ">
              Go to Dashboard →
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-sm text-[var(--text-sec)]">
        © 2026 EMS System
      </div>
    </div>
  );
};

export default AfterLoginLanding;
