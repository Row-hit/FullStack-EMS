import React, { useEffect, useState } from "react";

import {
  Check,
  PalmtreeIcon,
  PlusIcon,
  ThermometerIcon,
  UmbrellaIcon,
  X,
} from "lucide-react";
import Loading from "../components/ui/Loading";
import { dummyLeaveData } from "../assets/assets";
import StatsCards from "../components/ui/StatsCards";
import LeaveHistory from "../components/leave/LeaveHistory";
import LeaveApplyModal from "../components/leave/LeaveApplyModal";
import { useRoleContext } from "../context/useRoleContext";

const LeaveDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { role } = useRoleContext();
  const isAdmin = role === "admin" || false;

  const fetchLeavesData = async () => {
    setLeaves(dummyLeaveData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchLeavesData();
  }, []);

  const approvedLeaves = leaves.filter((leave) => leave.status === "APPROVED");
  const sickCount = leaves.filter((leave) => leave.type === "SICK").length;
  const casualCount = leaves.filter((leave) => leave.type === "CASUAL").length;
  const annualCount = leaves.filter((leave) => leave.type === "ANNUAL").length;

  const leaveStats = [
    { label: "Sick Leave", value: sickCount, icon: ThermometerIcon },
    { label: "Casual Leave", value: casualCount, icon: UmbrellaIcon },
    { label: "Annual Leave", value: annualCount, icon: PalmtreeIcon },
  ];

  if (loading) return <Loading />;
  return (
    <div className="animate-fade-in p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Leave Management</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Manage leave applications"
              : "Your leave history and request"}
          </p>
        </div>

        {!isAdmin && !isDeleted && (
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <PlusIcon className="w-4 h-4" /> Add for Leave
          </button>
        )}
      </div>

      {!isAdmin && <StatsCards cards={leaveStats} />}

      {/* Table */}
      <LeaveHistory
        leaves={leaves}
        isAdmin={isAdmin}
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
