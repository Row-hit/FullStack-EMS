import React from "react";
import { DEPARTMENTS } from "../../../assets/assets";

const EmployeeForm = ({ form, isEdit, isOpen, handleSubmit }) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 overflow-y-auto h-[80vh] pb-9 no-scrollbar shadow-md p-10"
      >
        {/* Section Title */}
        <h2 className="text-lg font-semibold text-gray-700">
          Personal Information
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <input
              required
              name="firstName"
              defaultValue={form?.firstName}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input
              name="lastName"
              defaultValue={form?.lastName}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              name="phone"
              defaultValue={form?.phone}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Join Date */}
          <div>
            <label className="block text-sm mb-1">Join Date</label>
            <input
              type="date"
              name="joinDate"
              defaultValue={form?.date || ""}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm mb-1">Bio (Optional)</label>
          <textarea
            name="bio"
            defaultValue={form?.bio}
            rows={3}
            placeholder="Brief description..."
            className="w-full border rounded-lg px-3 py-2 resize-none"
          />
        </div>

        {/* Department & Position */}
        {/* Employee Details Section */}
        <div className="space-y-4 pt-4 border-t">
          <h2 className="text-lg font-semibold text-gray-700">
            Employee Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Department */}
            <div>
              <label className="block text-sm mb-1">Department</label>
              <select
                name="department"
                defaultValue={form?.department}
                className="w-full border rounded-lg px-3 py-2 bg-white"
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>
            {/* Position */}
            <div>
              <label className="block text-sm mb-1">Position</label>
              <input
                name="position"
                defaultValue={form?.position}
                placeholder="position at department"
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            {/* Salary */}
            <div>
              <label className="block text-sm mb-1">Basic Salary</label>
              <input
                type="number"
                name="basicSalary"
                defaultValue={form?.basicSalary || ""}
                placeholder="00000"
                min={0}
                step={0.01}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Allowances</label>{" "}
              <input
                type="number"
                name="allowances"
                min="0"
                step="0.01"
                required
                defaultValue={form?.allowances || ""}
              />
            </div>
            <div>
              <label className="block mb-2">Deductions</label>{" "}
              <input
                type="number"
                name="deductions"
                min="0"
                step="0.01"
                required
                defaultValue={form?.deductions || ""}
              />
            </div>
            {isEdit && (
              <div>
                <label className="block mb-2">Status</label>
                <select
                  name="employmentStatus"
                  defaultValue={form?.employmentStatus}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Account Setup  */}
        <div className="card p-5 sm:p-6">
          <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
            Account Setup
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
            <div className="sm: col-span-2">
              <label className="block mb-2">Work Email</label>
              <input
                type="email"
                name="email"
                required
                default
                defaultValue={form?.email}
              />
            </div>

            {isEdit ? (
              <div>
                <label className="block mb-2">Change Password (Optional)</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Leave blank to keep current"
                />
              </div>
            ) : (
              <div>
                <label className="block mb-2">Temporary Password</label>
                <input type="password" name="password" required />
              </div>
            )}
            <div>
              <label className="block mb-2">System Role</label>
              <select name="role" defaultValue={form?.user?.role || "EMPLOYEE"}>
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className=" sticky bottom-0 bg-white py-4 mt-4 border-t border-gray-400/40  flex justify-end gap-3 z-10 cursor-pointer">
          <button
            type="button"
            onClick={() => isOpen(false)}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer"
          >
            {isEdit ? "Update Employee" : "Create Employee"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EmployeeForm;
