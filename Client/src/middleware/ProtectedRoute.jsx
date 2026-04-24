import React from "react";
import { useRoleContext } from "../context/useRoleContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { role } = useRoleContext();

  if (!role) return <Navigate to={"/login"} replace />;

  return children;
};

export default ProtectedRoute;
