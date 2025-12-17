import React, { useState } from 'react';
import { Phone, ArrowRight, User, Briefcase, ShieldCheck } from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'role' | 'phone' | 'otp'>('role');
  const [role, setRole] = useState<UserRole>(null);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep('phone');
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      onLogin(role);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Seva<span className="text-[#FF6B35]">dhar</span></h1>
        <p className="text-gray-500">Hyperlocal Home Services</p>
      </div>

      {step === 'role' && (
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-xl font-bold mb-6">Who are you? / आपण कोण आहात?</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleRoleSelect('user')}
              className="flex flex-col items-center p-6 bg-orange-50 border-2 border-orange-100 rounded-2xl hover:border-[#FF6B35] hover:bg-orange-100 transition-all"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-[#FF6B35]">
                <User size={32} />
              </div>
              <span className="font-bold text-gray-800">Customer</span>
              <span className="text-sm text-gray-500">ग्राहक</span>
            </button>

            <button 
              onClick={() => handleRoleSelect('provider')}
              className="flex flex-col items-center p-6 bg-blue-50 border-2 border-blue-100 rounded-2xl hover:border-blue-500 hover:bg-blue-100 transition-all"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-blue-600">
                <Briefcase size={32} />
              </div>
              <span className="font-bold text-gray-800">Provider</span>
              <span className="text-sm text-gray-500">सेवा प्रदाता</span>
            </button>
          </div>
        </div>
      )}

      {step === 'phone' && (
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-right-4">
          <h2 className="text-xl font-bold mb-2">Login / लॉग इन</h2>
          <p className="text-gray-500 mb-6">Enter your mobile number</p>
          
          <form onSubmit={handlePhoneSubmit}>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 font-bold">
                +91
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full pl-12 pr-4 py-4 text-xl font-bold tracking-widest border-2 border-gray-200 rounded-xl focus:border-[#FF6B35] outline-none"
                placeholder="00000 00000"
                autoFocus
              />
            </div>
            <button 
              disabled={phone.length !== 10}
              className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
            >
              Get OTP <ArrowRight size={20} />
            </button>
          </form>
          <button onClick={() => setStep('role')} className="mt-4 text-gray-400 text-sm">Back</button>
        </div>
      )}

      {step === 'otp' && (
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-right-4">
          <h2 className="text-xl font-bold mb-2">Verification</h2>
          <p className="text-gray-500 mb-6">Enter OTP sent to +91 {phone}</p>
          
          <form onSubmit={handleOtpSubmit}>
             <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="w-full text-center py-4 text-3xl font-bold tracking-[1em] border-2 border-gray-200 rounded-xl focus:border-[#FF6B35] outline-none mb-6"
                placeholder="____"
                autoFocus
              />
            <button 
              disabled={otp.length !== 4}
              className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
            >
              Verify & Login <ShieldCheck size={20} />
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-500">
             Resend OTP in 30s
          </div>
        </div>
      )}
      
      <div className="mt-auto pt-8 text-xs text-gray-400">
         By logging in, you agree to our Terms & Conditions.
      </div>
    </div>
  );
};

export default LoginScreen;
