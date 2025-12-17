
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface MapPickerProps {
    onConfirm: (lat: number, lng: number) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ onConfirm }) => {
    const [isDragging, setIsDragging] = useState(false);
    
    // Mock Coordinates
    const center = { lat: 18.78, lng: 73.35 }; 

    const handleConfirm = () => {
        onConfirm(center.lat, center.lng);
    };

    return (
        <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
            {/* Fake Map Image - using a generic map pattern or blurred image */}
            <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                alt="Map Background"
            />
            
            {/* Grid overlay to make it look techy */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            {/* Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
                <div className="relative">
                    <MapPin size={40} className="text-red-500 fill-red-500 drop-shadow-xl animate-bounce" />
                    <div className="w-2 h-1 bg-black/20 rounded-full blur-[2px] mx-auto mt-[-4px]" />
                </div>
                <div className="bg-black text-white text-[10px] px-2 py-1 rounded shadow-lg mt-2 font-bold whitespace-nowrap">
                    Move map to adjust
                </div>
            </div>

            {/* Interaction Layer */}
            <div className="absolute inset-0 cursor-move flex items-end justify-center pb-4">
                 <button 
                    onClick={handleConfirm}
                    className="bg-black text-white px-6 py-2 rounded-full font-bold shadow-xl hover:bg-gray-800 transition-colors z-20 pointer-events-auto"
                 >
                    Confirm Location
                 </button>
            </div>
        </div>
    );
};

export default MapPicker;
