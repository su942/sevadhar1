
import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, Info, CreditCard, Smartphone, Banknote, Loader2, Lock, ChevronRight, Edit2 } from 'lucide-react';
import { Service, Provider } from '../../types';
import MapPicker from '../map/map-picker';
import { Button } from '../ui/button';

interface BookingModalProps {
  service: Service | null;
  provider?: Provider; // Added provider prop
  onClose: () => void;
  onConfirm: (bookingDetails: any) => void;
}

type PaymentMethod = 'upi' | 'card' | 'cash';

const BookingModal: React.FC<BookingModalProps> = ({ service, provider, onClose, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!service) return null;

  const handlePayAndBook = () => {
    setIsProcessing(true);
    
    // Simulate Payment Gateway Delay
    setTimeout(() => {
        setIsProcessing(false);
        onConfirm({ 
            serviceId: service.id,
            providerId: provider?.id, // Pass provider ID
            date, 
            time, 
            address,
            paymentMethod,
            amount: service.price + 2.50
        });
        setStep(3); // Success state
    }, 2500);
  };

  const getButtonText = () => {
      if (isProcessing) return 'Processing...';
      if (paymentMethod === 'cash') return 'Book & Pay Later';
      return `Pay ₹${service.price + 2.50}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
          <h3 className="font-semibold text-gray-900">
            {step === 3 ? 'Booking Confirmed' : `Book ${service.title}`}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <img src={service.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className="font-medium text-gray-900">{service.title}</p>
                  <p className="text-sm text-gray-500">₹{service.price} • {service.duration}</p>
                </div>
              </div>

              {/* Provider Info Block */}
              {provider && (
                  <div className="bg-orange-50 p-3 rounded-lg flex items-center gap-3 mb-2 border border-orange-100">
                      <img src={provider.photo} className="w-10 h-10 rounded-full object-cover border border-white shadow-sm" alt={provider.name} />
                      <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Professional</p>
                          <p className="font-bold text-gray-900 text-sm">{provider.name}</p>
                      </div>
                  </div>
              )}

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
                {!isMapOpen ? (
                    <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                        />
                        <button 
                            onClick={() => setIsMapOpen(true)}
                            className="absolute right-2 top-1.5 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-600 font-medium"
                        >
                            Pin on Map
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <MapPicker onConfirm={(lat, lng) => {
                            setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)} (Pinned Location)`);
                            setIsMapOpen(false);
                        }} />
                        <button onClick={() => setIsMapOpen(false)} className="text-xs text-red-500 hover:underline">Cancel Map Selection</button>
                    </div>
                )}
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={!date || !time || !address}
                className="w-full mt-4 bg-black text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Payment <ChevronRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 relative">
              {isProcessing && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-xl">
                      <Loader2 className="animate-spin text-[#FF6B35] mb-2" size={40} />
                      <p className="font-bold text-gray-900">Processing Payment...</p>
                      <p className="text-xs text-gray-500">Do not close this window</p>
                  </div>
              )}

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm border border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Service Total</span>
                  <span>₹{service.price}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Fees</span>
                  <span>₹2.50</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-base">
                  <span>To Pay</span>
                  <span>₹{service.price + 2.50}</span>
                </div>
              </div>

              <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 text-sm">Select Payment Method</h4>
                  
                  {/* UPI Option */}
                  <div onClick={() => setPaymentMethod('upi')} className={`border rounded-xl p-3 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === 'upi' ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-500'}`}>
                              <Smartphone size={20} />
                          </div>
                          <div className="flex-1">
                              <p className="font-medium text-sm">UPI</p>
                              <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-[#FF6B35]' : 'border-gray-300'}`}>
                              {paymentMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />}
                          </div>
                      </div>
                  </div>

                  {/* Card Option */}
                  <div onClick={() => setPaymentMethod('card')} className={`border rounded-xl p-3 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === 'card' ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-500'}`}>
                              <CreditCard size={20} />
                          </div>
                          <div className="flex-1">
                              <p className="font-medium text-sm">Credit / Debit Card</p>
                              <p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#FF6B35]' : 'border-gray-300'}`}>
                              {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />}
                          </div>
                      </div>
                  </div>

                  {/* Cash Option */}
                  <div onClick={() => setPaymentMethod('cash')} className={`border rounded-xl p-3 cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === 'cash' ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-500'}`}>
                              <Banknote size={20} />
                          </div>
                          <div className="flex-1">
                              <p className="font-medium text-sm">Cash after Service</p>
                              <p className="text-xs text-gray-500">Pay provider directly after work</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cash' ? 'border-[#FF6B35]' : 'border-gray-300'}`}>
                              {paymentMethod === 'cash' && <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />}
                          </div>
                      </div>
                  </div>
              </div>

              {/* Policies */}
              <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start gap-3">
                 <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
                 <div>
                    <p className="text-xs font-bold text-blue-800">Cancellation Policy</p>
                    <p className="text-xs text-blue-600 leading-relaxed">Free cancellation up to 24 hours before service. A cancellation fee of ₹50 applies thereafter.</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                 <button onClick={() => setStep(1)} className="py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50">Back</button>
                 <button 
                    onClick={handlePayAndBook} 
                    disabled={isProcessing}
                    className="py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 disabled:opacity-70 flex items-center justify-center gap-2"
                 >
                     {isProcessing && <Loader2 size={16} className="animate-spin" />}
                     {getButtonText()}
                 </button>
              </div>
              
              <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                  <Lock size={10} /> Payments are 100% secure and encrypted
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8 animate-in zoom-in-50 duration-300">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
                <CheckCircle size={40} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h4>
              <p className="text-gray-500 text-sm mb-6">
                Your professional will arrive on <br/> 
                <span className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">{date} at {time}</span>
              </p>
              
              <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-2">Payment Details</p>
                  <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Method</span>
                      <span className="font-medium capitalize">{paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Card' : 'Cash'}</span>
                  </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-medium">₹{service.price + 2.50}</span>
                  </div>
              </div>

              <button onClick={onClose} className="bg-[#FF6B35] text-white px-8 py-3 rounded-xl font-medium hover:bg-orange-600 w-full shadow-lg shadow-orange-100">
                  Track Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
