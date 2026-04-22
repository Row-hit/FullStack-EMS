import {
  Users,
  Building2,
  CalendarDays,
  FileText,
  UsersIcon,
  Building2Icon,
  CalendarIcon,
  FileTextIcon,
} from "lucide-react";
import StatsCards from "./StatsCards";

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      title: "Total Employees",
      description: "Active Workforce",
      value: data.totalEmployees,
      icon: UsersIcon,
    },
    {
      title: "Departments",
      value: data.totalDepartments,
      icon: Building2Icon,
      description: "Organization Units",
    },
    {
      title: "Today's Attendance",
      value: data.todayAttendance,
      icon: CalendarIcon,
      description: "Checked in today",
    },
    {
      title: "Pending Leaves",
      value: data.pendingLeaves,
      icon: FileTextIcon,
      description: "Awaiting Approval",
    },
  ];
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Welcome back, Admin — here’s your overview
        </p>
      </div>

      {/* Cards */}
      <StatsCards cards={stats} />
    </div>
  );
};

export default AdminDashboard;
