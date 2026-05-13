import { Loader2Icon, Plus, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios.js";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const GeneratePaySlipForm = ({ employees, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    employeeId: "",
    basicSalary: "",
    allowances: 0,
    deductions: 0,
  });

  const handleEmployeeId = (e) => {
    const employee = employees.find((emp) => emp.id === e.target.value);

    setForm({
      employeeId: e.target.value,
      basicSalary: employee?.basicSalary || "",
      allowances: employee?.allowances || 0,
      deductions: employee?.deductions || 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      ...form,
      month: formData.get("month"),
      year: formData.get("year"),
    };
    try {
      await API.post("/payslips", data);
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> Generate Payslip
      </button>
    );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card max-w-lg w-full p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            Generate Monthly Payslip
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* select employee  */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Employee
            </label>
            <select
              name="employeeId"
              required
              value={form.employeeId}
              onChange={(e) => handleEmployeeId(e)}
            >
              <option value="">--Select-Employee--</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.firstName} {e.lastName} ({e.position})
                </option>
              ))}
            </select>
          </div>

          {/* select month & year  */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Month
              </label>
              <select name="month">
                {months.map((month, i) => (
                  <option key={month} value={i + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                defaultValue={new Date().getFullYear()}
              />
            </div>
          </div>

          {/* Basic Salary   */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              required
              value={form.basicSalary}
              onChange={(e) =>
                setForm({
                  ...form,
                  basicSalary: e.target.value,
                })
              }
            />
          </div>

          {/* Allowance and Deducation   */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Allowances
              </label>
              <input
                type="number"
                name="allowances"
                value={form.allowances}
                onChange={(e) =>
                  setForm({
                    ...form,
                    allowances: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                value={form.deductions}
                onChange={(e) =>
                  setForm({
                    ...form,
                    deductions: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* buttons    */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="btn-secondary"
            >
              {" "}
              Cancel{" "}
            </button>
            <button
              disabled={loading}
              type="submit"
              className="btn-primary flex items-center"
            >
              {loading ? <Loader2Icon className="animate-spin" /> : "Generate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePaySlipForm;
