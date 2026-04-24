import React, { useCallback, useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { DEPARTMENTS, dummyEmployeeData } from "../assets/assets";
import Loading from "../components/ui/Loading";
import ErrorState from "../components/ui/ErrorStats";
import EmployeeCard from "../features/employee/components/EmployeeCard";
import EmployeeModal from "../features/employee/components/EmployeeModal";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectDep, setSelectDep] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);

    const filterDeptEmp = dummyEmployeeData.filter((emp) =>
      selectDep ? emp.department === selectDep : emp,
    );
    setEmployees(filterDeptEmp);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [selectDep]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmp = employees.filter((emp) => {
    const employee =
      `${emp.firstName} ${emp.lastName} ${emp.position}`.toLowerCase();
    return employee.includes(search.toLowerCase().trim());
  });

  return (
    <div className="animate-fade-in p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Employees</h1>
          <p className="text-sm text-gray-500">Manage your team members</p>
        </div>

        <button
          onClick={() => {
            setEditEmployee(null);
            setIsModelOpen(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg cursor-pointer shadow"
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="   flex items-center gap-2 bg-white border rounded-lg px-3 py-2 w-full">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            className="outline-none w-full text-sm"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <select
          value={selectDep}
          onChange={(e) => setSelectDep(e.target.value)}
          className="w-1/3 bg-white border rounded-lg px-4 py-2 text-sm"
        >
          <option>All Departments</option>
          {DEPARTMENTS.map((deptName) => (
            <option key={deptName} value={deptName}>
              {" "}
              {deptName}
            </option>
          ))}
        </select>
      </div>

      {loading && <Loading />}
      {!loading && employees.length === 0 && <ErrorState />}
      {filteredEmp && filteredEmp.length === 0 && (
        <ErrorState retryHide={true} />
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredEmp.map((emp) => (
          <EmployeeCard
            key={emp.id}
            emp={emp}
            isOpen={setIsModelOpen}
            onEdit={(e) => {
              setEditEmployee(e);
              setIsModelOpen(true);
            }}
            onDelete={fetchEmployees}
          />
        ))}
      </div>

      {/* create or edit  employee modal */}
      {isModelOpen && (
        <EmployeeModal
          isOpen={setIsModelOpen}
          initialData={editEmployee}
          onSuccess={() => {
            setEditEmployee(null);
            fetchEmployees();
            setIsModelOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Employees;
