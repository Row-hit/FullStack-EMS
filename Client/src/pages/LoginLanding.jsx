import React from "react";
import { ShieldIcon, UserIcon } from "lucide-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoginLeftSide from "../features/auth/components/LoginLeftSide";
import LoginRightSide from "../features/auth/components/LoginRightSide";
import DarkThemeToggle from "../components/ui/DarkThemeToggle";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/ui/Loading";

const LoginLanding = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const isFormOpen = location.pathname !== "/login";

  const portalOption = [
    {
      to: "/login/ADMIN",
      title: "ADMIN Portal",
      description:
        "Manage employees,departments ,  payroll and system configurations.",
      icon: ShieldIcon,
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description:
        "View your profile, track attendance, request time off, and access payslips.",
      icon: UserIcon,
    },
  ];
  if (loading) return <Loading />;
  if (user) return <Navigate to={"/"} />;
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* LEFT SIDE */}
      <LoginLeftSide />
      {/* RIGHT SIDE */}
      {isFormOpen ? <Outlet /> : <LoginRightSide />}

      <div className="absolute top-4 right-4">
        <DarkThemeToggle />
      </div>
    </div>
  );
};

export default LoginLanding;
