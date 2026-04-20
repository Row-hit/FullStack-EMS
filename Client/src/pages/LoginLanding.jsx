import React from "react";
import LoginLeftSide from "../components/LoginLeftSide";
import LoginRightSide from "../components/LoginRightSide";
import { ShieldIcon, UserIcon } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

const LoginLanding = () => {
  const location = useLocation();

  const isFormOpen = location.pathname !== "/login";

  const portalOption = [
    {
      to: "/login/admin",
      title: "Admin Portal",
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
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE */}
      <LoginLeftSide />
      {/* RIGHT SIDE */}
      {isFormOpen ? <Outlet /> : <LoginRightSide />}
    </div>
  );
};

export default LoginLanding;
