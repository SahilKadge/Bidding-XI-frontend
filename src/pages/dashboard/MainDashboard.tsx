// src/pages/dashboard/Dashboard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { type RootState } from '../../redux/store';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const renderTeamOwnerContent = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Team Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="player-card rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">My Team</h3>
            <p className="text-muted-foreground">Manage your team players and strategy</p>
          </div>
          <div className="player-card rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Auction Room</h3>
            <p className="text-muted-foreground">Join live auctions and bid for players</p>
          </div>
          <div className="player-card rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Budget: $5M</h3>
            <p className="text-muted-foreground">Manage your auction budget</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderManagerContent = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Auction Control Panel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="player-card rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Player Management</h3>
            <p className="text-muted-foreground">Manage player list and base prices</p>
          </div>
          <div className="player-card rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Auction Setup</h3>
            <p className="text-muted-foreground">Configure auction rules and settings</p>
          </div>
          <div className="player-card rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Team Oversight</h3>
            <p className="text-muted-foreground">Monitor team activities and budgets</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuperAdminContent = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Super Admin Panel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="player-card rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">User Management</h3>
            <p className="text-muted-foreground">Manage all users and permissions</p>
          </div>
          <div className="player-card rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">System Settings</h3>
            <p className="text-muted-foreground">Configure system-wide settings</p>
          </div>
          <div className="player-card rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
            <p className="text-muted-foreground">View system analytics and reports</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user?.fullname}! 🎉
        </h2>
        <p className="text-muted-foreground">
          {user?.role === 'team' && 'Ready for the next cricket auction? Manage your team and strategies here.'}
          {user?.role === 'manager' && 'Manage the cricket auction process and oversee team activities.'}
          {user?.role === 'super_admin' && 'System administration and management dashboard.'}
        </p>
      </div>

      {/* Role-based content */}
      {user?.role === 'team' && renderTeamOwnerContent()}
      {user?.role === 'manager' && renderManagerContent()}
      {user?.role === 'super_admin' && renderSuperAdminContent()}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Access</h3>
          <div className="space-y-2">
            <Link to="/profile" className="block text-primary hover:text-secondary transition-colors">
              Profile Settings
            </Link>
            <button className="block text-primary hover:text-secondary transition-colors text-left">
              Help & Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;