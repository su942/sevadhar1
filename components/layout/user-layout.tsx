
import React from 'react';
import Header from './header';
import BottomNav from './bottom-nav';
import Footer from './footer';
import SOSButton from '../user/sos-button';

interface UserLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenProfile: () => void;
  // Header props passthrough
  onSearch: (q: string) => void;
  isSearching: boolean;
  onVoiceSearch: () => void;
  isListening: boolean;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  // Provider Switch Props
  isProvider?: boolean;
  onSwitchToProvider?: () => void;
  notificationCount?: number;
  onOpenMembership: () => void;
}

const UserLayout: React.FC<UserLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  onOpenProfile,
  onSearch,
  isSearching,
  onVoiceSearch,
  isListening,
  selectedLocation,
  onLocationChange,
  isProvider,
  onSwitchToProvider,
  notificationCount,
  onOpenMembership
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onSearch={onSearch}
        isSearching={isSearching}
        onGoHome={() => onTabChange('home')}
        onOpenBookings={() => onTabChange('bookings')}
        onOpenProfile={onOpenProfile}
        onVoiceSearch={onVoiceSearch}
        isListening={isListening}
        selectedLocation={selectedLocation}
        onLocationChange={onLocationChange}
        isProvider={isProvider}
        onSwitchToProvider={onSwitchToProvider}
        notificationCount={notificationCount}
        onOpenMembership={onOpenMembership}
      />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {children}
      </main>

      <Footer />

      <SOSButton />
      <BottomNav currentTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default UserLayout;
