"use client";

import type React from "react";
import { useState } from "react";
import {
  X,
  Home,
  Mail,
  MessageSquare,
  Users,
  FileText,
  BarChart3,
  Lightbulb,
  CheckSquare,
  Zap,
  Target,
  Clock,
  MoreHorizontal,
  // ChevronDown,
  // Star,
  // Plus,
  // Search,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { requests } from "../../axios/requests";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const mainNavItems: NavItem[] = [
    { label: "Home", icon: <Home size={20} />, href: "/" },
    { label: "Inbox", icon: <Mail size={20} />, href: "/#", badge: 69 },
    { label: "Chat", icon: <MessageSquare size={20} />, href: "/#" },
    { label: "Teams", icon: <Users size={20} />, href: "/#" },
    { label: "Docs", icon: <FileText size={20} />, href: "/#" },
    { label: "Logs", icon: <BarChart3 size={20} />, href: "/logs" },
    { label: "Whiteboards", icon: <Lightbulb size={20} />, href: "/#" },
    { label: "Forms", icon: <CheckSquare size={20} />, href: "/#" },
    { label: "Clips", icon: <Zap size={20} />, href: "/#" },
    { label: "Pulse", icon: <Target size={20} />, href: "/#" },
    { label: "Goals", icon: <Target size={20} />, href: "/#" },
    { label: "Timesheets", icon: <Clock size={20} />, href: "/#" },
    { label: "More", icon: <MoreHorizontal size={20} />, href: "/#" },
  ];

  const logOut = async () => {
    try {
      // Call backend logout endpoint
      await requests.logOut();

      // Clear localStorage items (adjust keys as per your implementation)
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user"); // optional if you store user info

      // Alternatively, clear all storage
      // localStorage.clear();

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen relative bg-background">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out flex flex-col ${
          isOpen ? "w-72" : "w-18"
        } border-r border-border`}
        style={{ backgroundColor: "var(--sidebar)" }}
      >
        {/* Header */}
        <div className="border-b border-border p-4 flex items-center justify-between shrink-0">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <img
                src="/logo1.png"
                alt="LegalClutch Logo"
                className="h-10 w-auto"
              />
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              isOpen
                ? "p-2 rounded-lg transition-all duration-200 hover:opacity-80 "
                : "p-0"
            } `}
            style={{
              backgroundColor: "var(--border)",
              color: "var(--sidebar-foreground)",
            }}
          >
            {isOpen ? (
              <X size={18} />
            ) : (
              <img
                src="/logo.svg"
                alt="LegalClutch Logo"
                className="h-10 w-auto"
              />
            )}
          </button>
        </div>

        {/* Scrollable Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {mainNavItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.href)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group relative overflow-hidden"
              style={{
                backgroundColor:
                  currentPath === item.href ? "#5c52ed40" : "transparent",
                color:
                  currentPath === item.href ? "var(--primary)" : "var(--muted)",
              }}
              title={!isOpen ? item.label : ""}
            >
              <div className="relative z-10 shrink-0">{item.icon}</div>
              {isOpen && (
                <>
                  <span className="text-sm font-medium font-sans flex-1 text-left">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className="px-2 py-0.5 text-xs font-bold rounded-full"
                      style={{
                        backgroundColor: "var(--destructive)",
                        color: "var(--primary-foreground)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-border">
          <button
            onClick={logOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group overflow-hidden"
            style={{
              backgroundColor: "#5c52ed",
              color: "var(--primary-foreground)",
            }}
          >
            <LogOut size={20} />
            {isOpen && (
              <span className="text-sm font-medium font-sans flex-1 text-left">
                Log Out
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

{
  /* Favorites Section */
}
{
  /* {isOpen && (
            <>
              <div className="px-3 py-3 mt-2">
                <div style={{ borderColor: "var(--border)" }} className="border-t" />
              </div>

              <button
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold"
                style={{ color: "var(--muted)" }}
              >
                <Star size={14} />
                Favorites
                <ChevronDown size={14} />
              </button>
            </>
          )} */
}

{
  /* Spaces Section Header */
}
{
  /* {isOpen && (
            <div className="flex items-center justify-between px-3 py-3 mt-2">
              <span className="text-xs font-semibold font-heading" style={{ color: "var(--muted)" }}>
                Spaces
              </span>
              <div className="flex gap-1">
                <button className="p-1 hover:opacity-70 transition-opacity" style={{ color: "var(--muted)" }}>
                  <MoreHorizontal size={14} />
                </button>
                <button className="p-1 hover:opacity-70 transition-opacity" style={{ color: "var(--muted)" }}>
                  <Search size={14} />
                </button>
                <button className="p-1 hover:opacity-70 transition-opacity" style={{ color: "var(--muted)" }}>
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )} */
}

{
  /* Workspace Items */
}
{
  /* {workspaceItems.map((item, idx) => {
            const sectionKey = item.href
            const isExpanded = expandedSections.includes(sectionKey)

            return (
              <div key={idx}>
                <button
                  onClick={() => {
                    if (item.children) {
                      toggleSection(sectionKey)
                    }
                    setActiveItem(sectionKey)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group relative overflow-hidden"
                  style={{
                    backgroundColor: currentPath === sectionKey ? "rgba(155, 93, 229, 0.2)" : "transparent",
                    color: currentPath === sectionKey ? "var(--primary)" : "var(--muted)",
                  }}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  {isOpen && (
                    <>
                      <span className="text-sm font-medium font-sans flex-1 text-left">{item.label}</span>
                      {item.children && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      )}
                    </>
                  )}
                </button>

               
                {isOpen && item.children && isExpanded && (
                  <div className="ml-4 space-y-1 mt-1">
                    {item.children.map((child, childIdx) => (
                      <button
                        key={childIdx}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm font-sans"
                        style={{
                          color: "var(--muted)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(155, 93, 229, 0.1)"
                          e.currentTarget.style.color = "var(--sidebar-foreground)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent"
                          e.currentTarget.style.color = "var(--muted)"
                        }}
                      >
                        <div className="flex-shrink-0">{child.icon}</div>
                        <span className="flex-1 text-left">{child.label}</span>
                        {child.badge && (
                          <span
                            className="px-2 py-0.5 text-xs font-bold rounded-full"
                            style={{
                              backgroundColor: "var(--destructive)",
                              color: "var(--primary-foreground)",
                            }}
                          >
                            {child.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })} */
}
