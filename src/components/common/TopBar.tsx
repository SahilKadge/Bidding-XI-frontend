import React from "react";
import { User } from "lucide-react";

interface TopBarProps {
  isAuthenticated: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ isAuthenticated }) => {
  return (
    <div className="w-full flex items-center justify-between px-6 py-3 bg-cu-dark-bg text-cu-text-primary shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo1.png" // Logo in public folder
          alt="LegalClutch Logo"
          className="h-10 w-auto"
        />
        {/* <span className="font-bold text-lg">LegalClutch</span> */}
      </div>

      {/* User icon (visible only if authenticated) */}
      {isAuthenticated && (
        <div className="flex items-center space-x-2 cursor-pointer">
          <User size={24} />
        </div>
      )}
    </div>
  );
};

export default TopBar;
