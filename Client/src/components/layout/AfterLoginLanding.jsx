import React from "react";
import { Link } from "react-router-dom";

const AfterLoginLanding = () => {
  return (
    <div className="min-h-screen -mx-15 -mt-7 -mb-40  bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold">EMS</h1>
      </div>

      {/* Center Content */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome Back 👋
          </h2>

          <p className="text-lg text-white/80 mb-8">
            You're all set. Access your dashboard to manage everything in one
            place.
          </p>

          <Link to="/dashboard">
            <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:scale-105 transition">
              Go to Dashboard →
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-sm text-white/70">
        © 2026 EMS System
      </div>
    </div>
  );
};

export default AfterLoginLanding;
