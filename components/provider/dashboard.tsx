
import React, { useState } from 'react';
import { Power, Wallet, Bell, Mic, Camera, Clock, X, Play, Pause, ChevronRight, CheckCircle2, MapPin, Phone, ShieldCheck, AlertCircle, MessageSquare } from 'lucide-react';
import { ProviderNotification, JobStatus } from '../../types';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import ChatWindow from '../chat/chat-window';

interface ProviderDashboardProps {
  onLogout: () => void;
  user: any; // Dynamic user data
}

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ onLogout, user }) => {
  const [status, setStatus] = useState<'available' | 'busy' | 'offline'>('available');
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState(150);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  // Job Lifecycle State
  const [activeJob, setActiveJob] = useState<{
    id: string;
    title: string;
    address: string;
    amount: number;
    status: JobStatus;
    customerName: string;
    customerPhone: string;
  } | null>(null);

  const [otpInput, setOtpInput] = useState('');
  
  // Mock Notifications
  const [notifications, setNotifications] = useState<ProviderNotification[]>([
      { id: '1', type: 'lead', title: `New ${user?.skills?.[0] || 'Service'} Lead`, message: `Request at Shilphata. Earn ₹250.`, timestamp: 'Just now', read: false },
      { id: '2', type: 'wallet', title: 'Daily Deduction', message: '₹10 platform fee deducted for yesterday.', timestamp: '5h ago', read: true },
  ]);

  const handleStatusChange = (newStatus: 'available' | 'busy' | 'offline') => {
      setStatus(newStatus);
      const feedback = {
          'available': 'You are now Online. Expect jobs!',
          'busy': 'Status set to Busy. Notifications paused.',
          'offline': 'You are Offline. Have a good rest!'
      }[newStatus];
      setStatusFeedback(feedback);
      setTimeout(() => setStatusFeedback(null), 3000);
  };

  const handleAudioPlay = () => {
      setIsPlayingAudio(!isPlayingAudio);
      setTimeout(() => setIsPlayingAudio(false), 5000); 
  };

  // Job Logic
  const handleAcceptLead = (notifId: string) => {
      setActiveJob({
          id: 'JOB-1234',
          title: user?.skills?.[0] ? `${user.skills[0]} Service` : 'General Service',
          address: 'Flat 402, Sai Heights, Shilphata',
          amount: 250,
          status: 'accepted',
          customerName: 'Amit Sharma',
          customerPhone: '+91 98900 12345'
      });
      setNotifications(notifications.filter(n => n.id !== notifId));
  };

  const handleStartJob = () => {
      if (otpInput === '1234') {
          setActiveJob(prev => prev ? { ...prev, status: 'started' } : null);
          setOtpInput('');
      } else {
          alert("Invalid Start OTP (Try 1234)");
      }
  };

  const handleEndJob = () => {
       if (otpInput === '5678') {
          setActiveJob(prev => prev ? { ...prev, status: 'completed' } : null);
          setWalletBalance(prev => prev + (activeJob?.amount || 0));
          setOtpInput('');
          alert("Job Completed! Payment added to wallet.");
          setTimeout(() => setActiveJob(null), 2000); // Clear job after showing success
      } else {
          alert("Invalid End OTP (Try 5678)");
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-20 rounded-xl mb-6">
        <div>
            <h1 className="text-xl font-bold text-gray-900">Partner Dashboard</h1>
            <p className="text-xs text-gray-500">{activeJob ? 'On Job' : 'Looking for leads...'}</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="relative">
                <Bell size={24} className="text-gray-600" />
                {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white">
                        {notifications.filter(n => !n.read).length}
                    </span>
                )}
            </div>
            {/* Mobile Logout (Desktop handled by sidebar) */}
            <button onClick={onLogout} className="md:hidden text-sm text-red-600 font-medium">Logout</button>
        </div>
      </header>

      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Profile Summary Card (Visible on Dashboard) */}
        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img src={user?.photo || "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=150"} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <h2 className="font-bold text-lg text-gray-900">{user?.name || 'Provider Name'}</h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-0.5">
                    {user?.isVerified && (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                            <ShieldCheck size={10} /> Verified
                        </span>
                    )}
                    <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">
                        {user?.skills?.[0] || 'Service Provider'}
                    </span>
                    <span className="text-xs">{user?.experience || '0 Years'} Exp</span>
                </div>
            </div>
        </div>

        {/* ACTIVE JOB CARD - The most important UI element */}
        {activeJob && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-100 overflow-hidden animate-in fade-in slide-in-from-top-4">
                <div className="bg-orange-500 p-4 text-white flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg">Ongoing Job</h3>
                        <p className="text-orange-100 text-xs uppercase tracking-wide font-bold">{activeJob.status}</p>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Clock size={20} className="animate-pulse" />
                    </div>
                </div>
                
                <div className="p-5 space-y-4">
                    <div>
                        <h4 className="font-bold text-xl text-gray-900">{activeJob.title}</h4>
                        <p className="text-gray-500 flex items-center gap-1 mt-1"><MapPin size={16}/> {activeJob.address}</p>
                    </div>

                    <div className="flex items-center gap-4 py-3 border-y border-gray-100">
                         <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                             {activeJob.customerName[0]}
                         </div>
                         <div className="flex-1">
                             <p className="font-bold text-gray-900">{activeJob.customerName}</p>
                             <p className="text-sm text-gray-500">{activeJob.customerPhone}</p>
                         </div>
                         <button onClick={() => setShowChat(true)} className="bg-gray-100 text-gray-700 p-2 rounded-full hover:bg-gray-200">
                             <MessageSquare size={20} />
                         </button>
                         <button className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-200">
                             <Phone size={20} />
                         </button>
                    </div>

                    {/* Job Actions based on Status */}
                    {activeJob.status === 'accepted' && (
                        <div className="space-y-3">
                            <div className="bg-blue-50 p-3 rounded-lg flex gap-2 text-sm text-blue-800">
                                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                <p>Navigate to customer location. Ask customer for Start OTP upon arrival.</p>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                                <MapPin size={18} /> Open Maps
                            </button>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="Enter Start OTP" 
                                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-center tracking-widest font-bold"
                                    value={otpInput}
                                    onChange={(e) => setOtpInput(e.target.value)}
                                    maxLength={4}
                                />
                                <button onClick={handleStartJob} className="bg-black text-white px-6 rounded-xl font-bold">Start</button>
                            </div>
                        </div>
                    )}

                    {activeJob.status === 'started' && (
                        <div className="space-y-4">
                             <div className="bg-green-50 p-3 rounded-lg flex gap-2 text-sm text-green-800 border border-green-100">
                                <Clock size={16} className="shrink-0 mt-0.5" />
                                <p>Job Timer Running. Perform the service professionally.</p>
                            </div>
                            
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                                <Camera className="mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Upload 'After Work' Photo</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Ask Customer for End OTP</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Enter End OTP" 
                                        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-center tracking-widest font-bold"
                                        value={otpInput}
                                        onChange={(e) => setOtpInput(e.target.value)}
                                        maxLength={4}
                                    />
                                    <button onClick={handleEndJob} className="bg-[#FF6B35] text-white px-6 rounded-xl font-bold">Finish</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* Daily Status Check-in */}
        {!activeJob && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden relative transition-all duration-300">
                {statusFeedback && (
                    <div className="absolute top-0 left-0 right-0 bg-gray-900/95 text-white py-2 px-4 text-xs font-bold flex items-center justify-center animate-in slide-in-from-top-full z-10">
                        <CheckCircle2 size={14} className="mr-2 text-green-400" /> {statusFeedback}
                    </div>
                )}
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                        <Clock size={16} className="text-[#FF6B35]" /> Duty Status
                    </h3>
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                        status === 'available' ? 'bg-green-100 text-green-700' :
                        status === 'busy' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                     }`}>
                        {status}
                     </span>
                </div>
                <div className="p-6">
                    <p className="text-gray-500 text-sm text-center mb-6">Change your availability status to control job flow.</p>
                    <div className="grid grid-cols-3 gap-3">
                         {/* Available */}
                         <button
                            onClick={() => handleStatusChange('available')}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 group ${
                                status === 'available' 
                                ? 'bg-green-500 text-white shadow-lg shadow-green-200 scale-105 ring-2 ring-green-500 ring-offset-2' 
                                : 'bg-white border border-gray-100 text-gray-400 hover:border-green-200 hover:bg-green-50'
                            }`}
                         >
                             <Power size={28} className={`mb-2 transition-transform group-hover:scale-110 ${status === 'available' ? 'text-white' : 'text-green-500'}`} />
                             <span className="font-bold text-xs">Online</span>
                         </button>

                         {/* Busy */}
                         <button
                            onClick={() => handleStatusChange('busy')}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 group ${
                                status === 'busy' 
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 scale-105 ring-2 ring-orange-500 ring-offset-2' 
                                : 'bg-white border border-gray-100 text-gray-400 hover:border-orange-200 hover:bg-orange-50'
                            }`}
                         >
                             <Clock size={28} className={`mb-2 transition-transform group-hover:scale-110 ${status === 'busy' ? 'text-white' : 'text-orange-500'}`} />
                             <span className="font-bold text-xs">Busy</span>
                         </button>

                         {/* Offline */}
                         <button
                            onClick={() => handleStatusChange('offline')}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 group ${
                                status === 'offline' 
                                ? 'bg-gray-800 text-white shadow-lg shadow-gray-300 scale-105 ring-2 ring-gray-800 ring-offset-2' 
                                : 'bg-white border border-gray-100 text-gray-400 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                         >
                             <Power size={28} className={`mb-2 transition-transform group-hover:scale-110 ${status === 'offline' ? 'text-white' : 'text-gray-500'}`} />
                             <span className="font-bold text-xs">Offline</span>
                         </button>
                    </div>
                </div>
            </div>
        )}

        {/* Notifications / Leads Center */}
        {!activeJob && (
            <div>
                <h3 className="text-gray-500 font-medium uppercase tracking-wide text-xs mb-3 pl-1">New Leads</h3>
                <div className="space-y-3">
                    {notifications.map((notif) => (
                        <div key={notif.id} className={`bg-white p-4 rounded-xl shadow-sm border-l-4 flex gap-3 ${notif.read ? 'border-gray-200' : 'border-[#FF6B35]'}`}>
                            <div className={`mt-1 w-2 h-2 rounded-full ${notif.read ? 'bg-gray-300' : 'bg-[#FF6B35]'}`} />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className={`text-sm ${notif.read ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}`}>{notif.title}</h4>
                                    <span className="text-[10px] text-gray-400">{notif.timestamp}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{notif.message}</p>
                                {notif.type === 'lead' && (
                                    <div className="flex gap-2 mt-3">
                                        <Button size="sm" variant="outline" className="flex-1 h-8 text-xs border-red-200 text-red-600 hover:bg-red-50">Reject</Button>
                                        <Button 
                                            size="sm" 
                                            className="flex-1 h-8 text-xs bg-[#FF6B35]"
                                            onClick={() => handleAcceptLead(notif.id)}
                                        >
                                            Accept (1m 30s)
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {notifications.length === 0 && <p className="text-center text-gray-400 text-sm py-4">No new leads currently.</p>}
                </div>
            </div>
        )}

        {/* Wallet & Stats */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Wallet size={16} />
                    <span className="text-xs font-bold uppercase">Balance</span>
                </div>
                <div className="text-2xl font-bold">₹{walletBalance}</div>
                <button className="text-[10px] text-orange-300 mt-2 flex items-center gap-1">Add Money <ChevronRight size={10} /></button>
            </div>
            
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Bell size={16} />
                    <span className="text-xs font-bold uppercase">Today's Leads</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{notifications.length > 0 ? notifications.length : 3}</div>
                <div className="text-xs text-green-500 mt-1 font-medium">High Demand Area</div>
            </div>
        </div>

        {/* Quick Actions (Verification/Profile) */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
             <h3 className="text-gray-500 font-medium mb-4 uppercase tracking-wide text-xs">Profile Actions</h3>
             <div className="space-y-3">
                 <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 text-left transition-colors">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Mic size={20}/></div>
                    <div className="flex-1">
                        <span className="block font-medium text-gray-900">Record Voice Intro</span>
                        <span className="text-xs text-gray-500">Introduce yourself in Marathi</span>
                    </div>
                 </button>
                 <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 text-left transition-colors">
                    <div className="bg-green-100 text-green-600 p-2 rounded-lg"><Camera size={20}/></div>
                    <div className="flex-1">
                        <span className="block font-medium text-gray-900">Update Photo / Selfie</span>
                        <span className="text-xs text-gray-500">For face match verification</span>
                    </div>
                 </button>
             </div>
        </div>

      </div>

      {showChat && activeJob && (
          <ChatWindow partnerName={activeJob.customerName} onClose={() => setShowChat(false)} />
      )}
    </div>
  );
};

export default ProviderDashboard;
