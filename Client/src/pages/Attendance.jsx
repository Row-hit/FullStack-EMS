import { CalendarDays, Clock, AlertCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { dummyAttendanceData } from "../assets/assets";
import Loading from "../components/ui/Loading";
import CheckInButton from "../components/attendance/CheckInButton";
import AttendanceStats from "../components/attendance/AttendanceStats";
import AttendanceActivity from "../components/attendance/AttendanceActivity";
import toast from "react-hot-toast";
import API from "../api/axios";

const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/attendance");
      setHistory(res.data.data || []);
      if (res.data.employee?.isDeleted) setIsDeleted(true);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayRecord = history.find(
    (r) => new Date(r.date).toDateString() === today.toDateString(),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen animate-fade-in">
      {/* Header */}
      <div className="mb-6 page-header">
        <h1 className="   page-title">Attendance</h1>
        <p className="text-gray-500 text-sm">
          Track your work hours and daily check-ins
        </p>
      </div>

      {isDeleted ? (
        <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
          {" "}
          <p className="text-rose-600">
            You can no longer clock in or out because your employee records have
            been marked as deleted.{" "}
          </p>{" "}
        </div>
      ) : (
        <div className="mb-8">
          <CheckInButton todayRecord={todayRecord} onAction={fetchData} />
        </div>
      )}

      {/* Stats Cards */}
      <AttendanceStats history={history} />

      {/* Recent Activity */}
      <AttendanceActivity activities={history} />
    </div>
  );
};

export default Attendance;
