
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryGrid from './components/CategoryGrid';
import ProviderCard from './components/ProviderCard';
import ServiceCard from './components/ServiceCard';
import SOSButton from './components/SOSButton';
import BookingModal from './components/BookingModal';
import LoginScreen from './components/LoginScreen';
import ProviderDashboard from './components/ProviderDashboard';
import { CATEGORIES, SERVICES, PROVIDERS } from './constants';
import { Service, Booking, Provider, UserRole } from './types';
import { getSmartRecommendations } from './services/geminiService';
import { ArrowLeft, Sparkles, MapPin, CalendarDays, Star } from 'lucide-react';

type ViewState = 'home' | 'services_list' | 'provider_selection' | 'bookings' | 'search_results';

function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  // App State
  const [view, setView] = useState<ViewState>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingProvider, setBookingProvider] = useState<Provider | null>(null); // For modal
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ services: Service[], reasoning: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Handle Login
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setView('home');
  };

  // Filter Services by Category
  const categoryServices = useMemo(() => {
    return SERVICES.filter(s => s.categoryId === selectedCategoryId);
  }, [selectedCategoryId]);

  const selectedCategory = CATEGORIES.find(c => c.id === selectedCategoryId);

  // Filter Providers
  const filteredProviders = useMemo(() => {
    let list = PROVIDERS;
    // 1. Filter by Service/Skill
    if (selectedService) {
        list = list.filter(p => p.skills.some(skill => 
            selectedService.title.toLowerCase().includes(skill.toLowerCase()) || 
            // Fallback matching for demo data
            (selectedService.categoryId === 'cleaning' && skill.toLowerCase().includes('cleaning')) ||
            (selectedService.categoryId === 'plumber' && skill.toLowerCase().includes('plumber')) ||
            (selectedService.categoryId === 'driver' && skill.toLowerCase().includes('driver'))
        ));
    }
    // 2. Filter by Location (Hyperlocal)
    if (selectedLocation) {
        list = list.filter(p => p.ward === selectedLocation);
    }
    return list;
  }, [selectedService, selectedLocation]);

  // Voice Search Logic
  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice search not supported in this browser.");
      return;
    }
    
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US'; // Could handle Marathi 'mr-IN'
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSearch(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    const { serviceIds, reasoning } = await getSmartRecommendations(query, SERVICES);
    const matchedServices = SERVICES.filter(s => serviceIds.includes(s.id));
    
    setSearchResults({ services: matchedServices, reasoning });
    setIsSearching(false);
    setView('search_results');
  };

  const handleBookingConfirm = (details: any) => {
    const newBooking: Booking = {
        id: Math.random().toString(36).substr(2, 9),
        serviceId: details.serviceId,
        serviceTitle: details.serviceTitle || 'Service',
        providerId: bookingProvider?.id,
        date: details.date,
        time: details.time,
        address: details.address,
        amount: details.amount || 0,
        status: 'confirmed'
    };
    setBookings([newBooking, ...bookings]);
    setBookingProvider(null);
  };

  // RENDER LOGIC
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (userRole === 'provider') {
    return <ProviderDashboard onLogout={handleLogout} user={null} />;
  }

  // USER ROLE RENDER
  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <>
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden mb-8 h-56 bg-gradient-to-r from-[#FF6B35] to-orange-500 text-white shadow-lg">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12">
                <h2 className="text-3xl font-bold mb-2">Namaskar! 🙏</h2>
                <h3 className="text-xl md:text-2xl font-medium mb-4">Find Trusted Local Helpers in {selectedLocation || 'Khopoli'}</h3>
                <p className="text-orange-100 max-w-md text-sm md:text-base">
                  Instant access to Maids, Plumbers, and more. Verified & Safe.
                </p>
                {/* Visual Cue for Voice */}
                <div 
                    onClick={handleVoiceSearch}
                    className="mt-4 flex items-center gap-2 text-sm bg-white/20 w-fit px-3 py-2 rounded-full backdrop-blur-sm cursor-pointer hover:bg-white/30 active:scale-95 transition-all"
                >
                   <div className={`w-2 h-2 bg-red-400 rounded-full ${isListening ? 'animate-ping' : ''}`}></div>
                   <span>Tap to Speak (Marathi/English)</span>
                </div>
              </div>
            </div>

            {/* Ward Warning if not selected */}
            {!selectedLocation && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl mb-8 flex items-center gap-3">
                    <MapPin size={20} />
                    <p className="text-sm">Please select your <strong>Ward/Area</strong> above to see available providers near you.</p>
                </div>
            )}

            {/* Categories */}
            <section className="mb-10">
              <div className="flex justify-between items-end mb-4">
                 <h2 className="text-lg font-bold text-gray-900">Services / सेवा</h2>
              </div>
              <CategoryGrid 
                categories={CATEGORIES} 
                onSelectCategory={(id) => {
                  setSelectedCategoryId(id);
                  setView('services_list');
                }} 
              />
            </section>

            {/* Popular Providers (Mock) */}
            <section className="mb-10">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Top Rated Providers Nearby</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PROVIDERS.slice(0, 3).map(p => (
                        <ProviderCard 
                            key={p.id} 
                            provider={p} 
                            onBook={() => {
                                // For generic booking without specific service selected yet, we might select a default
                                // But for now, let's just alert or handle gracefully.
                                alert("Please select a service category first to book specific slots.");
                            }}
                        />
                    ))}
                </div>
            </section>
          </>
        );

      case 'services_list':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button 
              onClick={() => setView('home')}
              className="flex items-center gap-2 text-gray-600 mb-6 hover:text-[#FF6B35] transition-colors font-medium"
            >
              <ArrowLeft size={20} /> Back
            </button>
            <div className="mb-6">
               <h2 className="text-2xl font-bold text-gray-900">{selectedCategory?.label}</h2>
               <p className="text-gray-500">{selectedCategory?.labelMarathi}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryServices.map(service => (
                <ServiceCard 
                    key={service.id} 
                    service={service}
                    onBook={(s) => {
                        setSelectedService(s);
                        setView('provider_selection');
                    }}
                />
              ))}
            </div>
          </div>
        );

      case 'provider_selection':
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <button 
                onClick={() => setView('services_list')}
                className="flex items-center gap-2 text-gray-600 mb-6 hover:text-[#FF6B35] transition-colors font-medium"
                >
                <ArrowLeft size={20} /> Back to Services
                </button>

                <div className="mb-6 bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Selected Service</p>
                    <h2 className="text-xl font-bold text-gray-900">{selectedService?.title} <span className="text-gray-400 font-normal">| {selectedService?.titleMarathi}</span></h2>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">Select a Professional</h3>
                    {selectedLocation && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">
                            Filtering for: {selectedLocation}
                        </span>
                    )}
                </div>

                {filteredProviders.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No providers found in {selectedLocation} for this service.</p>
                        <button onClick={() => setSelectedLocation('')} className="text-[#FF6B35] text-sm mt-2 underline">Show all locations</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProviders.map(provider => (
                            <ProviderCard 
                                key={provider.id} 
                                provider={provider} 
                                onBook={() => setBookingProvider(provider)}
                            />
                        ))}
                    </div>
                )}
            </div>
        );

      case 'search_results':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
             <button 
              onClick={() => setView('home')}
              className="flex items-center gap-2 text-gray-600 mb-6 hover:text-[#FF6B35] transition-colors"
            >
              <ArrowLeft size={20} /> Back to Home
            </button>

            <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl mb-8">
                <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-2 rounded-lg text-[#FF6B35]">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Results for "{searchQuery}"</h3>
                        <p className="text-gray-700">{searchResults?.reasoning}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {searchResults?.services.map(service => (
                 <ServiceCard 
                    key={service.id} 
                    service={service}
                    onBook={(s) => {
                        setSelectedService(s);
                        setView('provider_selection');
                    }}
                />
              ))}
            </div>
          </div>
        );

    case 'bookings':
        return (
            <div className="max-w-3xl mx-auto animate-in fade-in duration-300">
                <button 
                onClick={() => setView('home')}
                className="flex items-center gap-2 text-gray-600 mb-6 hover:text-black transition-colors"
                >
                <ArrowLeft size={20} /> Back to Home
                </button>
                <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
                
                <div className="space-y-4">
                {bookings.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <CalendarDays className="mx-auto text-gray-300 mb-3" size={48} />
                        <p className="text-gray-500">No bookings yet.</p>
                    </div>
                ) : (
                    bookings.map(booking => {
                        const service = SERVICES.find(s => s.id === booking.serviceId);
                        const provider = PROVIDERS.find(p => p.id === booking.providerId);
                        return (
                            <div key={booking.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-start md:items-center">
                                <img src={service?.image} className="w-20 h-20 rounded-lg object-cover bg-gray-200" alt="" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900">{service?.title}</h3>
                                    {provider && <p className="text-sm text-[#FF6B35] font-medium">Provider: {provider.name}</p>}
                                    <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                                    <p className="text-sm text-gray-500 mt-1">{booking.address}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                        {booking.status}
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="text-xs border border-gray-200 px-2 py-1 rounded hover:bg-gray-50">👎</button>
                                        <button className="text-xs border border-gray-200 px-2 py-1 rounded hover:bg-gray-50">👍</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                </div>
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-white text-gray-900 font-sans">
      <Header 
        onSearch={handleSearch} 
        isSearching={isSearching} 
        onGoHome={() => setView('home')}
        onOpenBookings={() => setView('bookings')}
        onVoiceSearch={handleVoiceSearch}
        isListening={isListening}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {renderContent()}
      </main>

      <SOSButton />

      {/* Booking Modal */}
      {bookingProvider && selectedService && (
        <BookingModal 
          service={selectedService} 
          onClose={() => setBookingProvider(null)} 
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
}

export default App;
