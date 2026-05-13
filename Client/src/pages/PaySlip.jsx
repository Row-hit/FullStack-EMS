import { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import Loading from "../components/ui/Loading";
import PAySlipList from "../components/payslip/PAySlipList";
import GeneratePaySlipForm from "../components/payslip/GeneratePaySlipForm";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import API from "../api/axios";

const Payslip = ({ onGenerate }) => {
  const [paySlips, setPaySlips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const isADMIN = user?.role === "ADMIN";

  const fetchPaySlipData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/payslips");
      setPaySlips(res?.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaySlipData();
  }, [fetchPaySlipData]);

  useEffect(() => {
    if (isADMIN)
      API.get("/employees")
        .then((res) => setEmployees(res.data.filter((e) => !e.isDeleted)))
        .catch(() => {});
  }, [isADMIN]);

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in bg-white rounded-xl  shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="page-title">Payslips</h2>
          <p className="page-subtitile">
            {isADMIN
              ? "Generate and manage employee payslips"
              : "Your payslip history"}
          </p>
        </div>

        {isADMIN && (
          <GeneratePaySlipForm
            employees={employees}
            onSuccess={fetchPaySlipData}
          />
        )}
      </div>

      {/* Table */}
      <PAySlipList paySlips={paySlips} isADMIN={isADMIN} />
    </div>
  );
};

export default Payslip;
