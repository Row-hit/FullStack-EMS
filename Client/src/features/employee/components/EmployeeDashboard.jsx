import {
  Users,
  Building2,
  CalendarDays,
  FileText,
  CalendarIcon,
  Subtitles,
  FileTextIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatsCards from "../../../components/ui/StatsCards";

const EmployeeDashboard = ({ data }) => {
  const emp = data.employee;

  const cards = [
    {
      title: "Days Present",
      Subtitles: "This month",
      icon: CalendarIcon,
      value: data.currentMonthAttendance,
    },

    {
      title: "Pending Leaves",
      Subtitles: "Awaiting Approval",
      icon: FileTextIcon,
      value: data.pendingLeaves,
    },
    {
      title: "Latest Payslip",
      Subtitles: "Most Recent Payout",
      icon: CalendarIcon,
      value: data.latestPaySlip
        ? `$${data.latestPaySlip.netSalary?.toLocaleString()}`
        : "N/A",
    },
  ];
  return (
    <div className="animate-fade-in  min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Welcome {emp?.firstName}
        </h1>
        <p className="text-sm text-slate-500">
          {emp?.position} - {emp?.department || "NO Department"}
        </p>
      </div>
      {/* Cards */}
      <StatsCards cards={cards} />
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/attendance"
          className="btn-primary text-center inline-flex items-center justify-center gap-2"
        >
          {" "}
          Mark Attendance <ArrowRightIcon className="w-4 h-4" />
        </Link>
        <Link to="/leave" className="btn-secondary text-center">
          Apply for Leave
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
