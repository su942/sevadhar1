import React, { useState } from 'react';
import { Power, Wallet, Bell, Mic, Camera, FileText } from 'lucide-react';
import { Provider } from '../types';

interface ProviderDashboardProps {
  onLogout: () => void;
  user?: any;
}

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ onLogout, user }) => {
  const [status, setStatus] = useState<'available' | 'busy' | 'offline'>('offline');
  const [walletBalance, setWalletBalance] = useState(150);
  const [leadsToday, setLeadsToday] = useState(2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Partner Dashboard</h1>
        <button onClick={onLogout} className="text-sm text-red-600 font-medium">Logout</button>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        
        {/* Profile Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <h2 className="font-bold text-lg">Ramesh Patil</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Verified</span>
                    <span>Plumber</span>
                </div>
            </div>
        </div>

        {/* Status Toggle (Big Buttons) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <h3 className="text-gray-500 font-medium mb-4 uppercase tracking-wide text-xs">Set Your Status</h3>
            <div className="grid grid-cols-3 gap-3">
                <button 
                    onClick={() => setStatus('available')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${status === 'available' ? 'bg-green-50 border-green-500 text-green-700' : 'border-transparent bg-gray-50 text-gray-400'}`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${status === 'available' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                        <Power size={24} />
                    </div>
                    <span className="text-sm font-bold">Online</span>
                </button>

                <button 
                    onClick={() => setStatus('busy')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${status === 'busy' ? 'bg-yellow-50 border-yellow-500 text-yellow-700' : 'border-transparent bg-gray-50 text-gray-400'}`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${status === 'busy' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>
                        <Power size={24} />
                    </div>
                    <span className="text-sm font-bold">Busy</span>
                </button>

                <button 
                    onClick={() => setStatus('offline')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${status === 'offline' ? 'bg-red-50 border-red-500 text-red-700' : 'border-transparent bg-gray-50 text-gray-400'}`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${status === 'offline' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
                        <Power size={24} />
                    </div>
                    <span className="text-sm font-bold">Offline</span>
                </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
                {status === 'available' ? "You are receiving calls." : status === 'busy' ? "Calls are paused." : "You are hidden from search."}
            </p>
        </div>

        {/* Wallet & Leads */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Wallet size={16} />
                    <span className="text-xs font-bold uppercase">Balance</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">₹{walletBalance}</div>
                <div className="text-xs text-gray-400 mt-1">₹10 deducted per lead</div>
            </div>
            
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Bell size={16} />
                    <span className="text-xs font-bold uppercase">Today's Leads</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{leadsToday}</div>
                <div className="text-xs text-green-500 mt-1 font-medium">+1 in last hour</div>
            </div>
        </div>

        {/* Quick Actions (Verification/Profile) */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
             <h3 className="text-gray-500 font-medium mb-4 uppercase tracking-wide text-xs">Profile Actions</h3>
             <div className="space-y-3">
                 <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 text-left">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Mic size={20}/></div>
                    <div className="flex-1">
                        <span className="block font-medium text-gray-900">Record Voice Intro</span>
                        <span className="text-xs text-gray-500">Introduce yourself in Marathi</span>
                    </div>
                 </button>
                 <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 text-left">
                    <div className="bg-green-100 text-green-600 p-2 rounded-lg"><Camera size={20}/></div>
                    <div className="flex-1">
                        <span className="block font-medium text-gray-900">Update Photo / Selfie</span>
                        <span className="text-xs text-gray-500">For face match verification</span>
                    </div>
                 </button>
             </div>
        </div>

      </div>
    </div>
  );
};

export default ProviderDashboard;