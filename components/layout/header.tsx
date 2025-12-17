
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Menu, User, Loader2, Mic, Briefcase, Bell, ShoppingBag, Star } from 'lucide-react';
import { LOCATIONS } from '../../lib/utils/constants';
import { Logo } from '../ui/logo';
import { cartStore } from '../../lib/store/cart-store';

interface HeaderProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  onGoHome: () => void;
  onOpenBookings: () => void;
  onOpenProfile: () => void;
  onVoiceSearch: () => void;
  isListening: boolean;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  isProvider?: boolean;
  onSwitchToProvider?: () => void;
  notificationCount?: number;
  onOpenMembership: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  isSearching, 
  onGoHome, 
  onOpenBookings, 
  onOpenProfile,
  onVoiceSearch,
  isListening,
  selectedLocation,
  onLocationChange,
  isProvider,
  onSwitchToProvider,
  notificationCount = 0,
  onOpenMembership
}) => {
  const [query, setQuery] = useState('');
  const [cartCount, setCartCount] = useState(cartStore.getItemCount());

  useEffect(() => {
    const unsubscribe = cartStore.subscribe(() => {
      setCartCount(cartStore.getItemCount());
    });
    return unsubscribe;
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col gap-4">
          
          {/* Top Row: Logo & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer h-10" onClick={onGoHome}>
              <Logo className="h-full" />
            </div>

            <div className="flex items-center gap-3">
               {/* Location (Desktop) */}
               <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                  <MapPin size={16} className="text-[#FF6B35]" />
                  <select 
                    value={selectedLocation}
                    onChange={(e) => onLocationChange(e.target.value)}
                    className="bg-transparent border-none outline-none text-gray-900 font-bold w-32 cursor-pointer"
                  >
                    <option value="">Select Ward</option>
                    {LOCATIONS.map(loc => (
                      <option key={loc.id} value={loc.name}>{loc.name}</option>
                    ))}
                  </select>
               </div>

               {/* Membership Button */}
               <button 
                  onClick={onOpenMembership}
                  className="hidden md:flex items-center gap-1 bg-gradient-to-r from-gray-900 to-black text-white px-3 py-1.5 rounded-full text-xs font-bold border border-gray-700 shadow-sm"
               >
                 <Star size={12} className="fill-yellow-400 text-yellow-400" /> Plus
               </button>

               {/* Provider Dashboard Switch */}
               {isProvider && (
                 <>
                    {/* Desktop Button */}
                    <button 
                        onClick={onSwitchToProvider}
                        className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    >
                        Partner Dashboard
                    </button>
                    {/* Mobile Button */}
                    <button 
                        onClick={onSwitchToProvider}
                        className="md:hidden flex items-center justify-center p-2 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                        title="Back to Dashboard"
                    >
                        <Briefcase size={20} />
                    </button>
                 </>
               )}
               
               <button onClick={onOpenBookings} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
                   <Bell size={20} />
                   {notificationCount > 0 && (
                     <span className="absolute top-0 right-0 min-w-[18px] h-[18px] bg-red-500 rounded-full border-2 border-white text-[10px] text-white flex items-center justify-center font-bold px-1">
                       {notificationCount > 9 ? '9+' : notificationCount}
                     </span>
                   )}
               </button>

               <button onClick={() => cartStore.toggleCart(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
                   <ShoppingBag size={20} />
                   {cartCount > 0 && (
                     <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#FF6B35] rounded-full border-2 border-white text-[10px] text-white flex items-center justify-center font-bold px-1">
                       {cartCount}
                     </span>
                   )}
               </button>

               <button 
                  onClick={onOpenProfile}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 border border-orange-100 flex items-center justify-center text-[#FF6B35] font-bold text-xs cursor-pointer hover:ring-2 hover:ring-orange-200 transition-all"
               >
                  A
               </button>
            </div>
          </div>

          {/* Bottom Row: Search & Mobile Location */}
          <div className="flex gap-2">
            {/* Mobile Location Icon Only */}
             <div className="md:hidden flex items-center justify-center w-12 bg-gray-50 rounded-xl text-[#FF6B35] shrink-0">
                 <MapPin size={20} />
             </div>

            <form onSubmit={handleSearchSubmit} className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                {isSearching ? (
                  <Loader2 className="animate-spin text-[#FF6B35]" size={18} />
                ) : (
                  <Search className="text-gray-400 group-focus-within:text-[#FF6B35] transition-colors" size={18} />
                )}
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for 'AC Repair', 'Painting'..."
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] focus:bg-white transition-all outline-none text-sm font-medium shadow-sm"
              />
              <button 
                type="button"
                onClick={onVoiceSearch}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${isListening ? 'bg-red-50 text-red-500' : 'hover:bg-gray-200 text-gray-400'}`}
              >
                <Mic size={18} className={isListening ? 'animate-pulse' : ''} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
