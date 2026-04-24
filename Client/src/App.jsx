import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./app.route";
import { Toaster } from "react-hot-toast";
import { RoleProvider } from "./context/useRoleContext";

const App = () => {
  return (
    <RoleProvider>
      <Toaster />
      <RouterProvider router={router} />
    </RoleProvider>
  );
};

export default App;
