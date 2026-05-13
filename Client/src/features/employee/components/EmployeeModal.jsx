import { useEffect, useState } from "react";
import { DEPARTMENTS } from "../../../assets/assets";
import EmployeeForm from "./EmployeeForm";
import API from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EmployeeModal = ({ isOpen, initialData, onSuccess }) => {
  const isEdit = Boolean(initialData);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(null);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (isEdit) {
      const pswd = formData.get("password");
      if (!pswd) formData.delete("password");
    }
    try {
      const url = isEdit ? `/employees/${initialData.id}` : "/employees";
      const method = isEdit ? "put" : "post";
      await API[method](url, formData);
      onSuccess ? onSuccess() : navigate("/employees");
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.response?.data?.error || err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => isOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 z-100"
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={() => isOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <div className=" border-b-1 mb-2">
          <h2 className="text-xl font-bold mb-4">
            {isEdit ? "Edit Employee" : "Add New Employee"}
          </h2>
          <p className="text-sm text-slate-500 mb-3">
            {isEdit
              ? "Update employee details"
              : "Create a user account and employee profile"}
          </p>
        </div>
        {/*  { Form } */}
        <EmployeeForm {...{ form, isEdit, isOpen, handleSubmit }} />
      </div>
    </div>
  );
};

export default EmployeeModal;
