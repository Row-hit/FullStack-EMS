import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./app.route";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
       
        <Toaster />
        <RouterProvider router={router} />
      
    </AuthProvider>
  );
};

export default App;
