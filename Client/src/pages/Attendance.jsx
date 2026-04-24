import React from "react";

import { Search } from "lucide-react";
const Attendance = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-100">
      {/* Search Input */}
      <div className="flex items-center w-full bg-white rounded-lg border px-3 py-2 shadow-sm">
        <Search className="text-gray-400 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Department Filter */}
      <button className="px-4 py-2 bg-white border rounded-lg shadow-sm text-sm hover:bg-gray-50 w-1/3">
        All Departments
      </button>
    </div>
  );
};

export default Attendance;
