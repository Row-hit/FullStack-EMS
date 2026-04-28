import { useRoleContext } from "../context/useRoleContext";
import { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import Loading from "../components/ui/Loading";
import PAySlipList from "../components/payslip/PAySlipList";
import GeneratePaySlipForm from "../components/payslip/GeneratePaySlipForm";

const Payslip = ({ onGenerate }) => {
  const { role } = useRoleContext();
  const [paySlips, setPaySlips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const isAdmin = role === "admin" || false;

  const fetchPaySlipData = useCallback(() => {
    setLoading(true);
    setPaySlips(dummyPayslipData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [paySlips, role]);

  useEffect(() => {
    fetchPaySlipData();
  }, [fetchPaySlipData]);

  useEffect(() => {
    if (isAdmin) setEmployees(dummyEmployeeData);
  }, [isAdmin]);

  if (loading) return <Loading />;
  return (
    <div className="animate-fade-in bg-white rounded-xl  shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="page-title">Payslips</h2>
          <p className="page-subtitile">
            {isAdmin
              ? "Generate and manage employee payslips"
              : "Your payslip history"}
          </p>
        </div>

        {isAdmin && (
          <GeneratePaySlipForm
            employees={employees}
            onSuccess={fetchPaySlipData}
          />
        )}
      </div>

      {/* Table */}
      <PAySlipList paySlips={paySlips} isAdmin={isAdmin} />
    </div>
  );
};

export default Payslip;
