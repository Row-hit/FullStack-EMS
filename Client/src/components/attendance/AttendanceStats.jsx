import { AlertCircle, CalendarDays, Clock } from "lucide-react";
import React from "react";

const AttendanceStats = ({ history }) => {
  console.log(history);
  const totalPresents = history.filter((h) => h.status === "PRESENT").length;
  const totalLate = history.filter((h) => h.status === "LATE").length;

  const stats = [
    {
      title: "Days Present",
      value: totalPresents,
      icon: CalendarDays,
    },
    {
      title: "Late Arrivals",
      value: totalLate,
      icon: AlertCircle,
    },
    {
      title: "Avg. Work Hrs",
      value: "8.5",
      icon: Clock,
    },
  ];
  return (
    <div className="grid lg:grid-cols-3 gap-4 mb-6">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="card card-hover p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group   bg-white  rounded-xl shadow-sm relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70" />

            <div className="p-3 bg-gray-100 rounded-lg">
              <Icon className="text-gray-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-xl font-semibold">{item.value}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceStats;
