import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowBigLeftDash,
  CalendarIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  HomeIcon,
  LayoutGridIcon,
  ListCollapse,
  ListCollapseIcon,
  Loader2,
  LogOutIcon,
  LucideListCollapse,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import DarkThemeToggle from "../ui/DarkThemeToggle";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import Loading from "../ui/Loading";

const Sidebar = ({ desktopOpen, setDesktopOpen }) => {
  const { user, setUser, loading, logout } = useAuth();
  const { pathname } = useLocation();
  const [username, setUsername] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    API.get("/profile").then(({ data }) => {
      if (data.firstName)
        setUsername(`${data.firstName} ${data.lastName || ""}`.trim());
    });
  }, []);

  //mobile sidebar close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (loading || !user) return <Loading />;

  const role = user.role;

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },

    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: UserIcon }
      : { name: "Attendance", href: "/attendance", icon: CalendarIcon },
    { name: "Leave", href: "/leave", icon: FileTextIcon },
    { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
    { name: "Settings ", href: "/settings", icon: SettingsIcon },
  ];

  const handleLogout = () => {
    logout();
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
            onClick={() => {
              setMobileOpen(false);
              setDesktopOpen(false);
            }}
            className="  text-slate-400 hover:text-white p-1"
          >
            {desktopOpen ? <ArrowBigLeftDash /> : <XIcon size={20} />}
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
              {role === "ADMIN" ? "Administrator" : "Employee"}
            </p>
          </div>
        </div>
      )}

      {/* Section label  */}
      <div className="px-5 pt-5 pb-2 text-slate-500 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em]  ">
          Navigation
        </p>
        <div className="flex justify-between items-center gap-x-2">
          <Link to={"/"}>
            <HomeIcon size={16} />
          </Link>
          <div className=" scale-80 ">
            <DarkThemeToggle />
          </div>
        </div>
      </div>

      {/* Navigation lists  */}
      <div className="flex-1 px-3 space-y-0.5 overflow-y-auto ">
        {loading ? (
          <div className="px-3 py-3 flex items-center gap-2 text-slate-500">
            <Loader2 className="animate-spin w-4 h-4" />
            <span className="text-sm">Loading...</span>
          </div>
        ) : (
          navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                to={item.href}
                state={{ role }}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-md  font-medium transition-all duration-150 relative 
              ${isActive ? "bg-indigo-500/12 text-indigo-100 text-[16px]" : "text-slate-300 hover:text-white hover:bg-white/4 text-[13px]"} `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-indigo-500" />
                )}
                <item.icon
                  className={`w-[17px] h-[17px] shrink-0 ${isActive ? "text-indigo-300" : "text-slate-400 group-hover:text-slate-300"} `}
                />
                <span className="flex-1 ">{item.name}</span>
                {isActive && (
                  <ChevronRightIcon className="w-5 h-5 text-indigo-500/50" />
                )}
              </Link>
            );
          })
        )}
      </div>

      {/* Logout link  */}
      <div className=" p-3 border-t border-white/40">
        <button
          onClick={handleLogout}
          className="flex items-center   gap-3 w-full px-3 py-2.5 rounded-md text-[14px] font-medium text-slate-300 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-150"
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
        className={`lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-lg 
    bg-slate-900 text-white shadow-lg border border-white/10 ${mobileOpen ? "opacity-0" : "opacity-100"}`}
      >
        <MenuIcon size={20} />
      </button>

      {/* desktop Menu Button */}
      <button
        onClick={() => setDesktopOpen(true)}
        className={`max-lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-lg 
    bg-slate-900 text-white shadow-lg border border-white/10 ${desktopOpen ? "opacity-0" : "opacity-100"}`}
      >
        <ListCollapseIcon />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out
  ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Sidebar (shared styles) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-white/5 text-white transform transform-gpu will-change-transform transition-transform duration-500 ease-out  ${mobileOpen ? "translate-x-0" : "-translate-x-full"} ${desktopOpen ? "lg:translate-x-0" : "lg:-translate-x-full"} `}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
