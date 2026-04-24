import React, { useEffect, useState } from "react";
import {
  dummyAdminDashboardData,
  dummyEmployeeDashboardData,
} from "../assets/assets";
import Loading from "../components/ui/Loading";
import { useRoleContext } from "../context/useRoleContext";
import AdminDashboard from "../features/admin/components/AdminDashboard";
import EmployeeDashboard from "../features/employee/components/EmployeeDashboard";

const Dashboard = () => {
  const { role } = useRoleContext();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(role);
  useEffect(() => {
    if (role === "admin") {
      setData(dummyAdminDashboardData);
    } else {
      setData(dummyEmployeeDashboardData);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loading />;
  if (!data)
    return (
      <h1 className="text-center text-slate-500 py-12">
        Failed to load dashboard data
      </h1>
    );
  if (data.role === "admin") {
    return <AdminDashboard data={data} />;
  } else {
    return <EmployeeDashboard data={data} />;
  }
};

export default Dashboard;
