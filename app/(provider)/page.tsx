
import React, { useState, useEffect } from 'react';
import { LogOut, ShoppingBag } from 'lucide-react';
import Sidebar from '../../components/layout/sidebar';
import ProviderDashboard from '../../components/provider/dashboard';
import OnboardingWizard from '../../components/provider/onboarding-wizard';
import { authStore } from '../../lib/store/auth-store';
import { Logo } from '../../components/ui/logo';
import Footer from '../../components/layout/footer';
import { CATEGORIES } from '../../lib/utils/constants';

const ProviderPage = () => {
  // Use state to track auth store values
  const [currentUser, setCurrentUser] = useState(authStore.currentUser);
  const [isOnboarded, setIsOnboarded] = useState(authStore.currentUser?.isOnboarded || false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Subscribe to store updates to handle state changes (like finishing onboarding)
    const unsubscribe = authStore.subscribe(() => {
        const user = authStore.currentUser;
        setCurrentUser(user);
        setIsOnboarded(user?.isOnboarded || false);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    authStore.logout();
  };

  const handleSwitchToCustomer = () => {
      authStore.switchRole('user');
  };

  const handleOnboardingComplete = (data: any) => {
      // 1. Map the Category ID to a readable label for the profile
      const categoryObj = CATEGORIES.find(c => c.id === data.category);
      const skillName = categoryObj ? categoryObj.label : 'General Service';

      // 2. Create a robust provider profile object
      // Note: In a real app, we would upload the 'audio' blob and 'photo' file to a server here.
      // For this demo, we generate a mock URL or keep existing photo if available.
      const updatedProfile = {
          ...currentUser,
          name: data.name || currentUser.name,
          experience: data.experience + " Years",
          skills: [skillName], // Store as array
          category: data.category,
          isOnboarded: true,
          isProvider: true,
          rating: 5.0, // New providers start with 5 stars
          // Use a placeholder if they took a photo (since we can't persist blob URLs easily in localStorage)
          photo: data.photo ? URL.createObjectURL(data.photo) : currentUser.photo, 
          isVerified: false // Requires admin approval in real life
      };

      // 3. Update Store
      authStore.updateUser(updatedProfile);
      
      // Local state update happens via subscription, but we set it here for immediate feedback
      setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex flex-col animate-in fade-in">
        <header className="flex justify-between items-center mb-8">
           <div className="h-10"><Logo className="h-full" /></div>
           <button onClick={handleLogout} className="text-sm text-gray-500">Logout</button>
        </header>
        <div className="max-w-md mx-auto text-center mb-8 flex-1">
            <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>
            <p className="text-gray-500">To start receiving jobs, we need to verify your identity.</p>
            <OnboardingWizard onComplete={handleOnboardingComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex animate-in fade-in">
       <Sidebar 
          currentTab={activeTab} 
          onTabChange={setActiveTab} 
          onLogout={handleLogout}
          onSwitchToCustomer={handleSwitchToCustomer}
          user={currentUser}
       />
       
       <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
           {/* Mobile Header (Hidden on Desktop) */}
           <div className="md:hidden bg-white p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-30 shadow-sm">
               <div className="flex items-center gap-2">
                   <Logo className="h-8" />
               </div>
               <div className="flex items-center gap-3">
                    <button 
                        onClick={handleSwitchToCustomer} 
                        className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-100 hover:bg-blue-100 transition-colors"
                    >
                        <ShoppingBag size={14} /> Book Service
                    </button>
                    <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                        <LogOut size={20} />
                    </button>
               </div>
           </div>

           <div className="p-4 md:p-8 flex-1">
              {activeTab === 'dashboard' && <ProviderDashboard onLogout={handleLogout} user={currentUser} />}
              {activeTab === 'bookings' && <div className="p-4 bg-white rounded-xl shadow-sm h-64 flex items-center justify-center text-gray-400">No Jobs Yet</div>}
              {activeTab === 'wallet' && <div className="p-4 bg-white rounded-xl shadow-sm h-64 flex items-center justify-center text-gray-400">Wallet Details</div>}
              {activeTab === 'verification' && <div className="p-4 bg-white rounded-xl shadow-sm h-64 flex items-center justify-center text-green-500 font-bold">Verified ✅</div>}
              {activeTab === 'profile' && <div className="p-4 bg-white rounded-xl shadow-sm h-64 flex items-center justify-center text-gray-400">Profile Settings</div>}
           </div>

           <Footer />
       </div>
    </div>
  );
};

export default ProviderPage;
