import React, { useState } from 'react';
import { MapPin, Search, Menu, User, Loader2, Mic } from 'lucide-react';
import { LOCATIONS } from '../constants';

interface HeaderProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  onGoHome: () => void;
  onOpenBookings: () => void;
  onVoiceSearch: () => void;
  isListening: boolean;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  isSearching, 
  onGoHome, 
  onOpenBookings, 
  onVoiceSearch,
  isListening,
  selectedLocation,
  onLocationChange
}) => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Logo */}
            <div className="flex items-center gap-6 cursor-pointer" onClick={onGoHome}>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Seva<span className="text-[#FF6B35]">dhar</span></h1>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
               <button onClick={onOpenBookings} className="p-2 text-gray-600"><User size={20}/></button>
               <button className="p-2 text-gray-600"><Menu size={20}/></button>
            </div>
          </div>

          {/* Location & Search Container */}
          <div className="flex flex-1 flex-col md:flex-row gap-3 items-stretch md:items-center max-w-3xl">
            
            {/* Location Selector (Ward) */}
            <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg text-sm text-gray-700 min-w-[160px]">
              <MapPin size={16} className="text-[#FF6B35]" />
              <select 
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                className="bg-transparent border-none outline-none text-gray-900 font-medium w-full"
              >
                <option value="">Select Ward</option>
                {LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Search Bar with Voice */}
            <form onSubmit={handleSearchSubmit} className="flex-1 relative group flex items-center">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                {isSearching ? (
                  <Loader2 className="animate-spin text-[#FF6B35]" size={18} />
                ) : (
                  <Search className="text-gray-400 group-focus-within:text-[#FF6B35]" size={18} />
                )}
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services (e.g., 'Maid', 'Plumber')..."
                className="w-full pl-10 pr-12 py-2.5 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:bg-white transition-all outline-none text-sm"
              />
              
              {/* Voice Button */}
              <button 
                type="button"
                onClick={onVoiceSearch}
                className={`absolute right-2 p-1.5 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-gray-200 text-gray-500'}`}
              >
                <Mic size={18} />
              </button>
            </form>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={onOpenBookings}
              className="text-gray-600 hover:text-[#FF6B35] font-medium text-sm"
            >
              My Bookings
            </button>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6B35] font-bold">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
