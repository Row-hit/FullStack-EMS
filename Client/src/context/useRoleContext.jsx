import { createContext, useContext, useEffect, useState } from "react";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const storedRole = localStorage.getItem("role") || null;
  const [role, setRole] = useState(storedRole);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// custom hook
export const useRoleContext = () => {
  return useContext(RoleContext);
};
