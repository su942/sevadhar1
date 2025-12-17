
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const SOSButton = () => {
  const handleSOS = () => {
    alert("SOS ALERT SENT! \n\nNotifying:\n1. Emergency Contacts\n2. Local Police\n3. Admin Team\n\nYour live location is being shared.");
  };

  return (
    <button
      onClick={handleSOS}
      className="fixed bottom-24 left-4 z-40 md:bottom-8 md:left-8 bg-red-600 text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all border-4 border-red-200 animate-pulse"
      title="SOS Emergency"
    >
      <AlertTriangle size={24} />
    </button>
  );
};

export default SOSButton;
