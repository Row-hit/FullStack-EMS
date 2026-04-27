import React from "react";
import { getDayTypeDisplay, getWorkingHoursDisplay } from "../../assets/assets";
import { format } from "date-fns";

const RecentActivity = ({ activities }) => {
  return (
    <div className=" card overflow-hidden bg-white rounded-xl shadow-sm border">
      <div className="p-4   shadow-sm shadow-gray-400/60 mb-2">
        <h2 className="font-semibold">Recent Activity</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3 text-left">DATE</th>
              <th className="p-3 text-left">CHECK IN</th>
              <th className="p-3 text-left">CHECK OUT</th>
              <th className="p-3 text-left">WORKING HOURS</th>
              <th className="p-3 text-left">DAY TYPE</th>
              <th className="p-3 text-left">STATUS</th>
            </tr>
          </thead>

          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-400">
                  {" "}
                  No records found
                </td>
              </tr>
            ) : (
              activities.map((record) => {
                const dayType = getDayTypeDisplay(record);
                return (
                  <tr key={record._id || record.id} className="border-t">
                    <td className="p-3">
                      {format(new Date(record.date), "MMM dd,yyyy")}
                    </td>
                    <td className="p-3">
                      {record.checkIn
                        ? format(new Date(record.checkIn), "hh:mm a")
                        : "-"}
                    </td>
                    <td className="p-3">
                      {record.checkIn
                        ? format(new Date(record.checkOut), "hh:mm a")
                        : "-"}
                    </td>
                    <td className="p-3">{getWorkingHoursDisplay(record)}</td>
                    <td className="p-3">
                      {dayType.label !== "-" ? (
                        <span className={`badge ${dayType.className} `}>
                          {dayType.label}
                        </span>
                      ) : (
                        "="
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className={`badge ${record.status === "PRESENT" ? "badge-success" : record.status === "LATE" ? "badge-warning" : "badge-danger"}`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;
