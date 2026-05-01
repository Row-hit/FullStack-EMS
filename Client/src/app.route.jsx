import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import LoginLanding from "./pages/LoginLanding";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import PrintPaySlipPage from "./pages/PrintPaySlipPage";
import Attendance from "./pages/Attendance";
import ProtectedRoute from "./middleware/ProtectedRoute";
import LoginForm from "./features/auth/components/LoginForm";
import AfterLoginLanding from "./components/layout/AfterLoginLanding";
import LeaveDashboard from "./pages/LeaveDashboard";
import Payslip from "./pages/PaySlip";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AfterLoginLanding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "/leave",
        element: <LeaveDashboard />,
      },
      {
        path: "/payslips",
        element: <Payslip />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginLanding />,
    children: [
      {
        path: ":role",
        element: <LoginForm />,
      },
    ],
  },
  {
    path: "/print/payslips/:id",
    element: <PrintPaySlipPage />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace />,
  },
]);

export default router;
