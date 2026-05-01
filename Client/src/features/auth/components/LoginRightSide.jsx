import React from "react";
import { useNavigate } from "react-router-dom";

const LoginRightSide = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="md:w-1/2 bg-[var(--bg)] flex items-center justify-center p-10   ">
        <div className="w-full max-w-sm space-y-6 ">
          <div>
            <h2 className="text-2xl font-semibold  text-[var(--text-main)]">
              Welcome Back
            </h2>
            <p className="text-[var(--text-sec)] text-sm">
              Select your portal to securely access the system.
            </p>
          </div>

          {/* Admin Button */}
          <button
            className="group w-full flex justify-between items-center px-5 py-4 rounded-lg bg-[var(--bg-sec)] hover:bg-[var(--card)] shadow hover:shadow-md transition border z-50 cursor-pointer"
            onClick={() => navigate("/login/admin")}
          >
            <span className="text-[var(--text-main)] font-medium  group-hover:text-[var(--text-sec)] z-50">
              Admin Portal
            </span>
            <span className=" text-[var(--text-main)] group-hover:text-[var(--text-sec)] ">
              →
            </span>
          </button>

          {/* Employee Button */}
          <button
            className="group w-full flex justify-between items-center px-5 py-4 rounded-lg bg-[var(--bg-sec)] hover:bg-[var(--card)] shadow hover:shadow-md transition border z-50 cursor-pointer"
            onClick={() => navigate("/login/employee")}
          >
            <span className="text-[var(--text-main)] font-medium  group-hover:text-[var(--text-sec)]">
              Employee Portal
            </span>
            <span className="  text-[var(--text-main)] group-hover:text-[var(--text-sec)]">
              →
            </span>
          </button>

          <p className="text-xs text-gray-400 text-center pt-4">
            © {new Date().getFullYear()} Row-Hit. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginRightSide;
