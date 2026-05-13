import { useCallback, useEffect, useState } from "react";

import {
  Check,
  LayoutDashboard,
  PalmtreeIcon,
  PlusIcon,
  ThermometerIcon,
  UmbrellaIcon,
  X,
} from "lucide-react";
import Loading from "../components/ui/Loading";

import StatsCards from "../components/ui/StatsCards";
import LeaveHistory from "../components/leave/LeaveHistory";
import LeaveApplyModal from "../components/leave/LeaveApplyModal";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";

const LeaveDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const isADMIN = user?.role === "ADMIN";

  const fetchLeavesData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/leave");
      setLeaves(res.data.leavesData || []);
      if (res.data.employee?.isDeleted) setIsDeleted(true);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeavesData();
  }, [fetchLeavesData]);

  const approvedLeaves = leaves.filter((leave) => leave.status === "APPROVED");
  const sickCount = leaves.filter((leave) => leave.type === "SICK").length;
  const casualCount = leaves.filter((leave) => leave.type === "CASUAL").length;
  const annualCount = leaves.filter((leave) => leave.type === "ANNUAL").length;

  const leaveStats = [
    {
      label: "All Leave",
      type: "ALL",
      value: sickCount + casualCount + annualCount,
      icon: LayoutDashboard,
    },
    {
      label: "Sick Leave",
      type: "SICK",
      value: sickCount,
      icon: ThermometerIcon,
    },
    {
      label: "Casual Leave",
      type: "CASUAL",
      value: casualCount,
      icon: UmbrellaIcon,
    },
    {
      label: "Annual Leave",
      type: "ANNUAL",
      value: annualCount,
      icon: PalmtreeIcon,
    },
  ];

  const filteredLeaves = selectedType
    ? leaves.filter((leave) => leave.type === selectedType)
    : leaves;

  if (loading) return <Loading />;
  return (
    <div className="animate-fade-in p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Leave Management</h1>
          <p className="page-subtitle">
            {isADMIN
              ? "Manage leave applications"
              : "Your leave history and request"}
          </p>
        </div>

        {!isADMIN && !isDeleted && (
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <PlusIcon className="w-4 h-4" /> Add for Leave
          </button>
        )}
      </div>

      {!isADMIN && (
        <StatsCards
          cards={leaveStats}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      )}

      {/* Table */}
      <LeaveHistory
        leaves={filteredLeaves}
        isADMIN={isADMIN}
        onUpdate={fetchLeavesData}
      />

      {/* modal  */}
      {showModal && (
        <LeaveApplyModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={fetchLeavesData}
        />
      )}
    </div>
  );
};

export default LeaveDashboard;
