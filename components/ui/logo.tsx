import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light'; // dark text or light text
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10", variant = 'dark' }) => {
  const [error, setError] = useState(false);

  // Fallback if image fails to load
  if (error) {
    return (
      <div className={`flex items-center gap-1.5 font-bold select-none ${variant === 'light' ? 'text-white' : 'text-gray-900'}`}>
        <div className="bg-[#FF6B35] text-white rounded-lg flex items-center justify-center font-black aspect-square" style={{ height: '80%' }}>
           S
        </div>
        <span style={{ fontSize: '1.5em', lineHeight: 1 }}>Seva<span className="text-[#FF6B35]">dhar</span></span>
      </div>
    );
  }

  return (
    <img 
      src="/logo.png" 
      alt="Sevadhar" 
      className={`${className} w-auto object-contain transition-opacity duration-300`} 
      onError={() => setError(true)}
    />
  );
};
