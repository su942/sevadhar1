
import React, { useState } from 'react';
import { ArrowRight, User, Briefcase, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { UserRole } from '../../types';
import { Button } from '../ui/button';
import { Logo } from '../ui/logo';

interface LoginScreenProps {
  onLogin: (phone: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      onLogin(phone);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Side - Lifestyle Image / Branding */}
      <div className="hidden md:flex md:w-1/2 lg:w-5/12 bg-gray-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1581578731117-104f2a863a30?auto=format&fit=crop&q=80&w=1000" 
            alt="Home Service" 
            className="w-full h-full object-cover"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        
        <div className="relative z-10">
           <Logo className="h-16" variant="light" />
        </div>

        <div className="relative z-10 space-y-6">
           <div>
             <div className="flex gap-1 mb-2">
               {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-[#FF6B35] text-[#FF6B35]" />)}
             </div>
             <p className="text-2xl font-bold leading-tight mb-4">"The most reliable way to manage home repairs. The professionals are truly skilled."</p>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="User" />
               </div>
               <div>
                 <p className="font-bold text-sm">Amit Sharma</p>
                 <p className="text-xs text-gray-400">Resident, Shilphata</p>
               </div>
             </div>
           </div>
           
           <div className="pt-8 border-t border-gray-700 flex gap-8">
              <div>
                <p className="text-2xl font-bold">50k+</p>
                <p className="text-sm text-gray-400">Bookings</p>
              </div>
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-gray-400">Avg Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-gray-400">Experts</p>
              </div>
           </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-white relative">
        <div className="w-full max-w-md space-y-8">
            <div className="md:hidden mb-8 text-center flex flex-col items-center">
              <Logo className="h-20 mb-4" />
              <p className="text-gray-500 text-sm">Professional Home Services</p>
            </div>

            {/* Steps Container */}
            <div className="bg-white">
                {step === 'phone' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Welcome! 👋</h2>
                      <p className="text-gray-500 mt-1">Enter your mobile number to continue</p>
                    </div>
                    
                    <form onSubmit={handlePhoneSubmit} className="space-y-6">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 font-bold border-r border-gray-300 pr-3">+91</span>
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="w-full pl-20 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:bg-white focus:border-transparent outline-none font-bold text-lg tracking-widest transition-all"
                          placeholder="00000 00000"
                          autoFocus
                        />
                      </div>
                      <Button 
                        type="submit"
                        disabled={phone.length !== 10}
                        className="w-full h-14 text-base rounded-xl font-bold shadow-lg shadow-orange-100"
                      >
                        Get Verification Code
                      </Button>
                    </form>
                  </div>
                )}

                {step === 'otp' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <button onClick={() => setStep('phone')} className="text-sm text-gray-500 hover:text-black mb-6 flex items-center gap-1">← Change Number</button>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
                      <p className="text-gray-500 mt-1">Enter the code sent to <strong>+91 {phone}</strong></p>
                    </div>
                    
                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                      <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          className="w-full text-center py-4 text-4xl font-bold tracking-[0.5em] border border-gray-200 rounded-xl focus:border-[#FF6B35] focus:ring-2 focus:ring-orange-100 outline-none text-gray-800"
                          placeholder="••••"
                          autoFocus
                        />
                      <Button 
                        type="submit"
                        disabled={otp.length !== 4}
                        className="w-full h-14 text-base rounded-xl font-bold shadow-lg shadow-orange-100"
                      >
                        Verify & Login
                      </Button>
                    </form>
                    <div className="mt-6 text-center">
                       <p className="text-sm text-gray-500">Didn't receive code? <button className="text-[#FF6B35] font-bold hover:underline">Resend in 30s</button></p>
                    </div>
                  </div>
                )}
            </div>
            
            <div className="mt-8 text-center">
               <p className="text-xs text-gray-400">By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> & <a href="#" className="underline">Privacy Policy</a>.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
