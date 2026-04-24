import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginLanding from "./pages/LoginLanding";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import PrintPaySlipPage from "./pages/PrintPaySlipPage";
import Attendance from "./pages/Attendance";
import ProtectedRoute from "./middleware/ProtectedRoute";
import LoginForm from "./features/auth/components/LoginForm";
import AfterLoginLanding from "./components/layout/AfterLoginLanding";

const router = createBrowserRouter([
  // attendance leave payslips setting

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AfterLoginLanding />,
      },
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
        element: <PrintPaySlipPage />,
      },
      {
        path: "/payslips",
        element: <PrintPaySlipPage />,
      },
      {
        path: "/settings",
        element: <PrintPaySlipPage />,
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
