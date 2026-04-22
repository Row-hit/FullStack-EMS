import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dummyProfileData } from "../assets/assets";
import {
  CalendarIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from "lucide-react";

const Sidebar = () => {
  const { pathname, state } = useLocation();
  const [username, setUsername] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setUsername(dummyProfileData.fullName);
  }, []);

  //mobile sidebar close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const role = state?.role ?? "employee";

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutGridIcon },

    role === "admin"
      ? { name: "Employees", href: "/employees", icon: UserIcon }
      : { name: "Attendance", href: "/attendance", icon: CalendarIcon },
    { name: "Leave", href: "/leave", icon: FileTextIcon },
    { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
    { name: "Settings ", href: "/settings", icon: SettingsIcon },
  ];

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const sidebarContent = (
    <>
      {/* brand header  */}
      <div className="px-5 pt-6 pb-5 border-b border-white/6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserIcon className="text-white size-7" />

            <div>
              <p className="font-semibold text-[13px] text-white tracking-wide">
                Employee MS
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Management System
              </p>
            </div>
          </div>
          {/* close button on mobile  */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <XIcon size={20} />
          </button>
        </div>
      </div>

      {/* User profile card   */}
      {username && (
        <div className="flex gap-4 mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4">
          <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center ring-1 ring-white/10 shrink-0">
            <span className="text-slate-400 text-xs font-semibold">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-slate-200 truncate">
              {username}
            </p>
            <p className="text-[11px]   text-slate-200 truncate">
              {role === "admin" ? "Administrator" : "Employee"}
            </p>
          </div>
        </div>
      )}

      {/* Section label  */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          Navigation
        </p>
      </div>

      {/* Navigation lists  */}
      <div className="flex-1 px-3 space-y-0.5 overflow-y-auto ">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all duration-150 relative 
              ${isActive ? "bg-indigo-500/12 text-indigo-300" : "text-slate-300 hover:text-white hover:bg-white/4"} `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-indigo-500" />
              )}
              <item.icon
                className={`w-[17px] h-[17px] shrink-0 ${isActive ? "text-indigo-300" : "text-slate-400 group-hover:text-slate-300"} `}
              />
              <span className="flex-1 ">{item.name}</span>
              {isActive && (
                <ChevronRightIcon className="w-3.5 h-3.5 text-indigo-500/50" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Logout link  */}
      <div className=" p-3 border-t border-white/6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[13px] font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-150"
        >
          <LogOutIcon className="w-[17px] h-[17px]" />
          <span>Log out</span>
        </button>
      </div>
    </>
  );
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-lg 
    bg-slate-900 text-white shadow-lg border border-white/10"
      >
        <MenuIcon size={20} />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out
  ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Sidebar (shared styles) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-white/5 text-white transform-gpu transition-all duration-500 ease-in-out will-change-transform ${mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:translate-x-0 opacity-85 lg:opacity-100"}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
