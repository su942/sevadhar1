
import React from 'react';
import { MessageSquare, Phone, ChevronRight, HelpCircle, FileText } from 'lucide-react';

const HelpPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Help & Support</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:border-orange-200 transition-colors">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <MessageSquare size={24} />
              </div>
              <span className="font-bold text-gray-900">Chat with Us</span>
          </button>
          <button className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:border-orange-200 transition-colors">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                  <Phone size={24} />
              </div>
              <span className="font-bold text-gray-900">Call Support</span>
          </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 font-bold text-gray-900 flex items-center gap-2">
              <HelpCircle size={18} /> Frequently Asked Questions
          </div>
          <div className="divide-y divide-gray-100">
              {[
                  "How do I cancel a booking?",
                  "What is the safety protocol?",
                  "Payment methods accepted?",
                  "How to contact the provider?"
              ].map((faq, i) => (
                  <button key={i} className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50">
                      <span className="text-gray-700 text-sm font-medium">{faq}</span>
                      <ChevronRight size={16} className="text-gray-400" />
                  </button>
              ))}
          </div>
      </div>

       <div className="mt-8 bg-gray-50 rounded-xl p-4 flex gap-4 items-start">
           <FileText className="text-gray-400 shrink-0" />
           <div>
               <h3 className="font-bold text-gray-900 text-sm">Cancellation Policy</h3>
               <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                   Free cancellation if done 2 hours before the scheduled slot. 
                   A cancellation fee of ₹50 will be charged otherwise.
               </p>
           </div>
       </div>
    </div>
  );
};

export default HelpPage;
