import React from "react";
import Avatar from "../../../components/ui/Avatar";
import { PencilIcon, Trash2Icon } from "lucide-react";
import API from "../../../api/axios";
import toast from "react-hot-toast";

const EmployeeCard = ({ emp, onEdit, onDelete }) => {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    try {
      await API.delete(`/employees/${emp.id}`);
      onDelete();
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };
  return (
    <div className="group card card-hover bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition ">
      {/* Top Section */}
      <div className="bg-gray-100 p-6 pt-13 flex flex-col items-center relative ">
        <div className="absolute top-3 left-3 flex gap-x-2 ">
          <span className="  text-xs bg-white px-2 py-1 rounded-full border text-gray-600">
            {emp.department || "Remote"}
          </span>
          {emp.isDeleted && (
            <span className="bg-red-500/60 font-medium text-white px-3 py-1 text-xs rounded-full">
              DELETED{" "}
            </span>
          )}
        </div>
        {!emp.isDeleted && (
          <div className="absolute inset-0 bg-linear-to-b from-indigo-700/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-center pt-4 gap-3">
            <button
              onClick={() => onEdit(emp)}
              className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-indigo-600 rounded-xl shadow-lg transition-all hover:scale-105"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete()}
              className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-rose-600 rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50"
            >
              <Trash2Icon className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xl font-semibold ">
          <Avatar
            src={emp.image}
            firstName={emp.firstName}
            lastName={emp.lastName}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4">
        <h3 className="text-gray-800 font-medium">
          {emp.firstName} {emp.lastName}{" "}
        </h3>
        <p className="text-sm text-gray-500">{emp.position}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
