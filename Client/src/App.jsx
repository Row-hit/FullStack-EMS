import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./app.route";
import { Toaster } from "react-hot-toast";
import DarkThemeToggle from "./components/DarkThemeToggle";

const App = () => {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
