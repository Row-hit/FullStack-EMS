import { Download } from "lucide-react";
import { format } from "date-fns";

const PAySlipList = ({ paySlips = [], isAdmin }) => {
  return (
    <div className="card overflow-hidden">
      <div className=" overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              {isAdmin && <th className="p-3 text-left">Employee</th>}
              <th>Period</th>
              <th>Basic Salary</th>
              <th>Net Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!paySlips?.length ? (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="text-center py-12 text-slate-400"
                >
                  {" "}
                  No payslips found{" "}
                </td>
              </tr>
            ) : (
              paySlips.map((paySlip) => (
                <tr
                  key={paySlip._id || paySlip.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  {isAdmin && (
                    <td className="p-3 text-slate-700">
                      {paySlip.employee
                        ? `${paySlip.employee.firstName} ${paySlip.employee.lastName}`
                        : "—"}
                    </td>
                  )}

                  <td className="text-slate-500">
                    {paySlip.year && paySlip.month
                      ? format(
                          new Date(
                            Number(paySlip.year),
                            Number(paySlip.month) - 1,
                          ),
                          "MMMM yyyy",
                        )
                      : "—"}
                  </td>

                  <td className="  text-slate-500">
                    {paySlip.basicSalary.toLocaleString()}
                  </td>

                  <td className="  font-medium text-slate-800">
                    {paySlip.netSalary.toLocaleString()}
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() =>
                        window.open(
                          `/print/payslips/${paySlip._id || paySlip.id}`,
                        )
                      }
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs cursor-pointer"
                    >
                      <Download className="w-4 h-4 " />
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PAySlipList;
