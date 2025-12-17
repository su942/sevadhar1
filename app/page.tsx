
import React, { useState, useEffect } from 'react';
import LoginScreen from '../components/auth/login-screen';
import UserLayout from '../components/layout/user-layout';
import ProviderPage from './(provider)/page';
import LandingPage from '../components/landing-page';

// Pages
import UserHomePage from './(user)/page';
import BookingsPage from './(user)/bookings/page';
import ProfilePage from './(user)/profile/page';
import MembershipPage from './(user)/membership/page';
import HelpPage from './(user)/help/page';

// Components
import CartDrawer from '../components/cart/cart-drawer';
import CheckoutModal from '../components/modals/checkout-modal';

import { authStore } from '../lib/store/auth-store';
import { cartStore } from '../lib/store/cart-store';
import { UserRole, Booking, Service, CartItem } from '../types';
import { SERVICES, PROVIDERS } from '../lib/utils/constants';
import { getSmartRecommendations } from '../lib/services/gemini';

export default function Page() {
  const [showLanding, setShowLanding] = useState(true);
  
  // Initialize state from the store which might already have data from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(authStore.isAuthenticated);
  const [role, setRole] = useState<UserRole>(authStore.userRole);
  
  const [activeTab, setActiveTab] = useState('home');

  // Global App State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ services: Service[], reasoning: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  
  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  useEffect(() => {
    // Initial Sync on mount (handles hydration mismatch if any)
    setIsAuthenticated(authStore.isAuthenticated);
    setRole(authStore.userRole);
    // If authenticated on load, skip landing
    if (authStore.isAuthenticated) {
        setShowLanding(false);
    }

    const unsubscribe = authStore.subscribe(() => {
        setIsAuthenticated(authStore.isAuthenticated);
        
        // Update role and handle side effects
        setRole((prevRole) => {
            const newRole = authStore.userRole;
            // Only reset tabs if role actually changes
            if (prevRole !== newRole) {
                if (newRole === 'provider') {
                    setActiveTab('dashboard');
                } else if (newRole === 'user') {
                    setActiveTab('home');
                }
            }
            return newRole;
        });
    });
    return unsubscribe;
  }, []);

  const handleLogin = (phone: string) => {
    // Mock Logic: Check if phone matches a known provider
    const existingProvider = PROVIDERS.find(p => p.phoneNumber.replace(/\s/g, '').includes(phone));
    const isKnownProvider = !!existingProvider;
    
    authStore.login('user', { 
        name: existingProvider ? existingProvider.name : '', 
        phone: `+91 ${phone}`,
        photo: existingProvider ? existingProvider.photo : '', // Empty photo for new users (shows initials)
        email: existingProvider ? 'provider@sevadhar.com' : '', // Empty email for new users
        isProvider: isKnownProvider,
        // If they are a known provider in our "database", they are already onboarded.
        isOnboarded: isKnownProvider 
    });
    
    setShowLanding(false);
    setActiveTab('home');
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    const { serviceIds, reasoning } = await getSmartRecommendations(query, SERVICES);
    setSearchResults({ services: SERVICES.filter(s => serviceIds.includes(s.id)), reasoning });
    setIsSearching(false);
    setActiveTab('home');
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Browser does not support voice search");
        return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);
    recognition.onresult = (e: any) => {
        handleSearch(e.results[0][0].transcript);
        setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
  };

  const handleCheckoutStart = () => {
    const total = cartStore.getTotalAmount();
    const discount = cartStore.getDiscountAmount();
    const platformFee = 19;
    const taxes = Math.round((total - discount) * 0.18);
    const finalTotal = total - discount + platformFee + taxes;

    setCheckoutItems([...cartStore.items]);
    setCheckoutTotal(finalTotal);
    cartStore.toggleCart(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutComplete = (details: any) => {
    const newBookings: Booking[] = checkoutItems.map(item => ({
        id: Math.random().toString(36).substr(2, 9),
        serviceId: item.serviceId,
        serviceTitle: item.title + (item.quantity > 1 ? ` (x${item.quantity})` : ''),
        date: details.date,
        time: details.time,
        address: details.address,
        status: 'pending',
        amount: item.price * item.quantity,
        paymentMethod: details.paymentMethod,
        paymentStatus: details.paymentMethod === 'cash' ? 'pending' : 'paid'
    }));
    
    setBookings(prev => [...newBookings, ...prev]);
    cartStore.clearCart();
  };

  const handleCheckoutClose = () => {
      setIsCheckoutOpen(false);
      // If we just completed a booking, switch to bookings tab
      if (cartStore.items.length === 0 && bookings.length > 0) {
          setActiveTab('bookings');
      }
  };

  const handleDirectBooking = (booking: Booking) => {
      setBookings(prev => [booking, ...prev]);
      setActiveTab('bookings');
  };

  // ----- RENDER -----
  
  if (!isAuthenticated && showLanding) {
      return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (role === 'provider') {
    return <ProviderPage />;
  }

  return (
    <UserLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenProfile={() => setActiveTab('profile')}
        onSearch={handleSearch}
        isSearching={isSearching}
        onVoiceSearch={handleVoiceSearch}
        isListening={isListening}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        isProvider={authStore.currentUser?.isProvider}
        onSwitchToProvider={() => authStore.switchRole('provider')}
        notificationCount={3}
        onOpenMembership={() => setActiveTab('membership')}
    >
        {activeTab === 'home' && (
            <UserHomePage 
                searchQuery={searchQuery}
                searchResults={searchResults}
                selectedLocation={selectedLocation}
                onBookingConfirmed={handleDirectBooking}
            />
        )}
        {activeTab === 'bookings' && (
            <BookingsPage bookings={bookings} />
        )}
        {activeTab === 'services' && (
            <div className="text-center py-20 text-gray-500">Service Catalog coming soon</div>
        )}
        {activeTab === 'profile' && (
            <ProfilePage />
        )}
        {activeTab === 'membership' && (
            <MembershipPage />
        )}
        {activeTab === 'help' && (
            <HelpPage />
        )}
        
        {/* Overlays */}
        <CartDrawer onCheckout={handleCheckoutStart} />
        
        {isCheckoutOpen && (
            <CheckoutModal 
                items={checkoutItems}
                totalAmount={checkoutTotal}
                onClose={handleCheckoutClose}
                onConfirm={handleCheckoutComplete}
            />
        )}
    </UserLayout>
  );
}
