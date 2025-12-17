
import React from 'react';
import { CheckCircle2, Star, Shield, Clock } from 'lucide-react';
import { Button } from '../../../components/ui/button';

const MembershipPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 pb-20">
      <div className="relative rounded-3xl overflow-hidden bg-gray-900 text-white p-8 mb-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div>
        <div className="absolute top-0 right-0 p-8 opacity-20">
            <Star size={180} />
        </div>
        
        <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Sevadhar Plus</h1>
            <p className="text-gray-300 mb-6">Save more on every booking.</p>
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1 rounded-full text-sm font-bold mb-8">
                MEMBERSHIP
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {[
                    { title: '15% Off', desc: 'On all services, capped at ₹100' },
                    { title: 'No Platform Fee', desc: 'Save ₹19 on every order' },
                    { title: 'Top Rated Partners', desc: 'Get 4.8+ rated pros only' },
                ].map((item, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                        <CheckCircle2 className="text-yellow-400 mb-2" />
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-bold text-xl text-gray-900 mb-6">Select a Plan</h2>
          
          <div className="space-y-4">
              <div className="border-2 border-[#FF6B35] bg-orange-50 rounded-xl p-4 flex justify-between items-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">RECOMMENDED</div>
                  <div>
                      <h3 className="font-bold text-gray-900">12 Months Plan</h3>
                      <p className="text-sm text-gray-500">₹299 / year</p>
                  </div>
                  <Button size="sm" className="bg-[#FF6B35]">Buy</Button>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center">
                  <div>
                      <h3 className="font-bold text-gray-900">6 Months Plan</h3>
                      <p className="text-sm text-gray-500">₹199 / 6 months</p>
                  </div>
                  <Button size="sm" variant="outline">Buy</Button>
              </div>
          </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
          Terms and conditions apply. Membership is non-refundable.
      </div>
    </div>
  );
};

export default MembershipPage;
