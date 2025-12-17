import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import { Service } from '../types';

interface BookingModalProps {
  service: Service | null;
  onClose: () => void;
  onConfirm: (bookingDetails: any) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ service, onClose, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');

  if (!service) return null;

  const handleConfirm = () => {
    onConfirm({ serviceId: service.id, date, time, address });
    setStep(3); // Success state
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-semibold text-gray-900">
            {step === 3 ? 'Booking Confirmed' : `Book ${service.title}`}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <img src={service.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className="font-medium text-gray-900">{service.title}</p>
                  <p className="text-sm text-gray-500">${service.price} • {service.duration}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Select Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <select 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                  >
                    <option value="">Select a slot</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                  />
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={!date || !time || !address}
                className="w-full mt-4 bg-black text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Service Total</span>
                  <span>${service.price}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Fees</span>
                  <span>$2.50</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-base">
                  <span>To Pay</span>
                  <span>${service.price + 2.50}</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                By confirming, you agree to our terms of service.
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <button onClick={() => setStep(1)} className="py-3 border border-gray-300 rounded-xl font-medium">Back</button>
                 <button onClick={handleConfirm} className="py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800">Pay & Book</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Booking Successful!</h4>
              <p className="text-gray-500 text-sm mb-6">Your professional will arrive on <br/> <span className="font-semibold text-gray-800">{date} at {time}</span>.</p>
              <button onClick={onClose} className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800">Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
