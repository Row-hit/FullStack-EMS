import React, { useEffect, useState } from "react";
import {
  dummyAdminDashboardData,
  dummyEmployeeDashboardData,
} from "../assets/assets";
import Loading from "../components/Loading";
import EmployeeDashboard from "../components/EmployeeDashboard";
import AdminDashboard from "../components/AdminDashboard";
import { useLocation, useParams } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const role = location.state?.role;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
