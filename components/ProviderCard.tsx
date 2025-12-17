import React, { useState } from 'react';
import { Star, Phone, ShieldCheck, Play, Pause, CalendarClock } from 'lucide-react';
import { Provider } from '../types';

interface ProviderCardProps {
  provider: Provider;
  onBook?: () => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onBook }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [adTimer, setAdTimer] = useState(0);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleCall = () => {
    // Simulate Free Tier Ad Logic (10s delay)
    if (!showNumber) {
      setAdTimer(10);
      const interval = setInterval(() => {
        setAdTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowNumber(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Photo */}
        <div className="relative">
          <img 
            src={provider.photo} 
            alt={provider.name} 
            className="w-20 h-20 rounded-lg object-cover bg-gray-200"
          />
          <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${provider.availability === 'available' ? 'bg-green-500' : 'bg-gray-400'}`} title={provider.availability}>
             {provider.availability === 'available' && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{provider.name}</h3>
              <p className="text-sm text-gray-500">{provider.experience} Experience</p>
            </div>
            <div className="flex flex-col items-end">
                <div className="bg-orange-50 text-[#FF6B35] px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                    <Star size={10} fill="currentColor" />
                    {provider.rating}
                </div>
                {provider.ward && <span className="text-[10px] text-gray-400 mt-1">{provider.ward}</span>}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            {provider.isVerified && (
              <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1 border border-green-100">
                <ShieldCheck size={10} /> Verified
              </span>
            )}
            {provider.badges.map((badge, idx) => (
              <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Audio Intro */}
      <div className="mt-4 bg-gray-50 rounded-lg p-2 flex items-center gap-3 cursor-pointer hover:bg-gray-100" onClick={handlePlayAudio}>
        <div className="w-8 h-8 bg-[#FF6B35] text-white rounded-full flex items-center justify-center shrink-0">
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </div>
        <div>
           <p className="text-xs font-medium text-gray-800">Voice Introduction</p>
           <p className="text-[10px] text-gray-500">Listen to {provider.name} (Marathi)</p>
        </div>
        <div className="ml-auto">
            {isPlaying && <div className="flex gap-0.5 h-3 items-end">
                <div className="w-0.5 bg-[#FF6B35] h-full animate-bounce" />
                <div className="w-0.5 bg-[#FF6B35] h-2/3 animate-bounce delay-75" />
                <div className="w-0.5 bg-[#FF6B35] h-full animate-bounce delay-150" />
            </div>}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
        {!showNumber ? (
            <div className="grid grid-cols-2 gap-2">
                <button 
                    onClick={handleCall}
                    disabled={adTimer > 0}
                    className="bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 text-sm"
                >
                    {adTimer > 0 ? (
                        <span>Wait {adTimer}s...</span>
                    ) : (
                        <>
                            <Phone size={16} /> Call Now
                        </>
                    )}
                </button>
                <button 
                    onClick={onBook}
                    className="bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                    <CalendarClock size={16} /> Book Slot
                </button>
            </div>
        ) : (
            <div className="bg-green-50 border border-green-200 text-green-800 py-3 rounded-lg text-center font-bold text-lg animate-in fade-in">
                {provider.phoneNumber}
            </div>
        )}
        <p className="text-[10px] text-center text-gray-400">
            {showNumber ? "Direct call connected." : "Free Tier: 10s advertisement before direct call."}
        </p>
      </div>
    </div>
  );
};

export default ProviderCard;
