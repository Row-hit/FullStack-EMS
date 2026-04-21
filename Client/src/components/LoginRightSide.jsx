import React from "react";
import { useNavigate } from "react-router-dom";

const LoginRightSide = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="md:w-1/2 bg-gray-200/50 flex items-center justify-center p-10">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm">
              Select your portal to securely access the system.
            </p>
          </div>

          {/* Admin Button */}
          <button
            className="group w-full flex justify-between items-center px-5 py-4 rounded-lg bg-slate-50 hover:bg-indigo-50 shadow hover:shadow-md transition border "
            onClick={() => navigate("/login/admin")}
          >
            <span className="text-gray-700 font-medium  group-hover:text-indigo-800">
              Admin Portal
            </span>
            <span className="  group-hover:text-indigo-800">→</span>
          </button>

          {/* Employee Button */}
          <button
            className="group w-full flex justify-between items-center px-5 py-4 rounded-lg bg-slate-50 hover:bg-indigo-50 shadow hover:shadow-md transition border"
            onClick={() => navigate("/login/employee")}
          >
            <span className="text-gray-700 font-medium  group-hover:text-indigo-700">
              Employee Portal
            </span>
            <span className=" group-hover:text-indigo-700">→</span>
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
