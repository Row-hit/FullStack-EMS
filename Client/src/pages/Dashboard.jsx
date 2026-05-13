import React, { useEffect, useState } from "react";

import Loading from "../components/ui/Loading";
import toast from "react-hot-toast";
import EmployeeDashboard from "../features/employee/components/EmployeeDashboard";
import AdminDashboard from "../features/ADMIN/components/ADMINDashboard";
import API from "../api/axios";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => toast.error(err.response?.data?.error || err?.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (!data)
    return (
      <h1 className="text-center text-slate-500 py-12">
        Failed to load dashboard data
      </h1>
    );

  if (data.role === "ADMIN") {
    return <AdminDashboard data={data} />;
  } else {
    return <EmployeeDashboard data={data} />;
  }
};

export default Dashboard;
