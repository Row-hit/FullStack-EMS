import React from "react";
import DarkThemeToggle from "./DarkThemeToggle";

const LoginLeftSide = () => {
  return (
    <>
      <div className="md:w-1/2 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white flex items-center justify-center p-10 pl-15 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute w-[400px] h-[400px] bg-red-500/30 blur-[120px] rounded-full -top-[10px] left-[10px]" />
        <div className="absolute w-[400px] h-[400px] bg-red-500/40 blur-[120px] rounded-full -bottom-[50px] -right-[50px]" />
        <div className="absolute top-20 -left-28 w-42 h-122 bg-indigo-500/20 rounded-full"></div>

        <div
          className="absolute top-90 left-15 w-130
h-25 bg-indigo-500/20 rounded-4xl   opacity-40   "
        ></div>
        <div className="max-w-md space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Employee <br /> Management System
          </h1>

          <p className="text-indigo-200 text-md leading-relaxed">
            Streamline your workforce operations, track attendance, manage
            payroll, and empower your team securely.
          </p>
          <div className="w-full h-px bg-white my-6" />
        </div>
      </div>
    </>
  );
};

export default LoginLeftSide;
