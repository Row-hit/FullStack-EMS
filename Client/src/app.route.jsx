import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginLanding from "./pages/LoginLanding";
import LoginForm from "./components/LoginForm";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import PrintPaySlipPage from "./pages/PrintPaySlipPage";

const router = createBrowserRouter([
  // attendance leave payslips setting

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/employees",
        element: <Employees />,
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
    element: <Navigate to={"/dashboard"} replace />,
  },
]);

export default router;
