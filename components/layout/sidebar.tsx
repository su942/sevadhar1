
import React from 'react';
import { LayoutDashboard, Calendar, Wallet, User, ShieldCheck, LogOut, ShoppingBag } from 'lucide-react';
import { Logo } from '../ui/logo';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  onSwitchToCustomer: () => void;
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange, onLogout, onSwitchToCustomer, user }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'bookings', icon: Calendar, label: 'My Jobs' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'verification', icon: ShieldCheck, label: 'Verification' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-gray-100 flex justify-center h-20 items-center">
        <Logo className="h-10" />
      </div>

      <div className="p-4">
        {/* Dynamic User Profile */}
        <div className="flex items-center gap-3 mb-6 p-3 bg-orange-50 rounded-xl">
           <img 
              src={user?.photo || "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=150"} 
              className="w-10 h-10 rounded-full object-cover border border-orange-100" 
              alt="Profile" 
           />
           <div className="overflow-hidden">
              <p className="font-bold text-sm text-gray-900 truncate">{user?.name || 'Partner'}</p>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
                  {user?.skills?.[0] ? user.skills[0] : 'Online'}
              </p>
           </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#FF6B35] text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* Switch to Customer View */}
        <div className="mt-6 pt-6 border-t border-gray-100">
             <button 
                onClick={onSwitchToCustomer}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <ShoppingBag size={20} />
                <span className="font-medium text-sm">Book a Service</span>
              </button>
              <p className="text-[10px] text-gray-400 mt-2 px-1">Switch to customer view to book services for yourself.</p>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-gray-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
