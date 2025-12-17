import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, History, CreditCard, Banknote, QrCode, X, ChevronRight, Store, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';

const WalletPage: React.FC = () => {
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [amount, setAmount] = useState('500');
  const [balance, setBalance] = useState(1250);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRecharge = () => {
      setIsProcessing(true);
      setTimeout(() => {
          setIsProcessing(false);
          setBalance(prev => prev + parseInt(amount));
          setShowRechargeModal(false);
          alert(`Successfully added ₹${amount} to wallet!`);
      }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-20">
        <div className="flex justify-between items-center">
             <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
             <Button size="sm" variant="outline">Help</Button>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wallet size={120} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Wallet size={20} />
                    <span className="text-sm font-medium uppercase tracking-wider">Available Balance</span>
                </div>
                <div className="text-4xl font-bold mb-6">₹{balance.toLocaleString('en-IN')}.00</div>
                <div className="grid grid-cols-2 gap-4">
                    <Button 
                        onClick={() => setShowRechargeModal(true)}
                        variant="secondary" 
                        className="w-full bg-white text-gray-900 hover:bg-gray-100 border-0 font-bold"
                    >
                        <ArrowDownLeft size={18} className="mr-2" /> Add Money
                    </Button>
                    <Button variant="secondary" className="w-full bg-[#FF6B35] text-white hover:bg-orange-600 border-0 font-bold">
                        <ArrowUpRight size={18} className="mr-2" /> Withdraw
                    </Button>
                </div>
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
            <Card>
                <CardContent className="p-4">
                    <p className="text-xs text-gray-500 uppercase font-bold">Total Earnings</p>
                    <p className="text-xl font-bold text-green-600">+₹15,400</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <p className="text-xs text-gray-500 uppercase font-bold">Platform Fees</p>
                    <p className="text-xl font-bold text-red-500">-₹1,540</p>
                </CardContent>
            </Card>
        </div>

        {/* Transactions */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4 border-b border-gray-100">
                <h3 className="font-bold flex items-center gap-2 text-gray-900">
                    <History size={18} /> Recent Transactions
                </h3>
                <span className="text-xs text-[#FF6B35] font-bold cursor-pointer hover:underline">View All</span>
            </CardHeader>
            <CardContent className="p-0">
                {[
                    { id: 1, type: 'credit', title: 'Booking Payment - Plumbing', date: 'Today, 10:30 AM', amount: '+₹500', status: 'success' },
                    { id: 2, type: 'debit', title: 'Lead Deduction - Ramesh', date: 'Today, 09:15 AM', amount: '-₹50', status: 'success' },
                    { id: 3, type: 'credit', title: 'Wallet Recharge (UPI)', date: 'Yesterday, 6:00 PM', amount: '+₹200', status: 'success' },
                    { id: 4, type: 'debit', title: 'Platform Fee (Daily)', date: 'Yesterday, 12:00 AM', amount: '-₹10', status: 'success' },
                ].map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {tx.type === 'credit' ? <ArrowDownLeft size={18}/> : <ArrowUpRight size={18}/>}
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900">{tx.title}</p>
                                <p className="text-xs text-gray-500">{tx.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className={`font-bold text-sm block ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                                {tx.amount}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase">{tx.status}</span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        {/* Recharge Modal Overlay */}
        {showRechargeModal && (
            <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white w-full max-w-md rounded-t-3xl md:rounded-2xl shadow-2xl p-6 animate-in slide-in-from-bottom-10 duration-300 relative">
                    
                    {isProcessing && (
                         <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-2xl">
                              <Loader2 className="animate-spin text-[#FF6B35] mb-2" size={40} />
                              <p className="font-bold text-gray-900">Adding Money...</p>
                         </div>
                    )}

                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Add Money</h2>
                            <p className="text-sm text-gray-500">Recharge your wallet to get leads.</p>
                        </div>
                        <button onClick={() => setShowRechargeModal(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="mb-6">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Enter Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">₹</span>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 text-2xl font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:bg-white outline-none transition-all"
                            />
                        </div>
                        <div className="flex gap-2 mt-3">
                            {['100', '200', '500', '1000'].map((amt) => (
                                <button 
                                    key={amt}
                                    onClick={() => setAmount(amt)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-colors ${amount === amt ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                                >
                                    ₹{amt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Select Payment Method</label>
                        
                        {/* UPI */}
                        <button onClick={handleRecharge} className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#FF6B35] hover:bg-orange-50 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                    <QrCode size={20} />
                                </div>
                                <div className="text-left">
                                    <span className="block font-bold text-gray-900">UPI Apps</span>
                                    <span className="block text-xs text-gray-500">Google Pay, PhonePe, Paytm</span>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-300 group-hover:text-[#FF6B35]" />
                        </button>

                        {/* Card */}
                        <button onClick={handleRecharge} className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#FF6B35] hover:bg-orange-50 transition-all group">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                                    <CreditCard size={20} />
                                </div>
                                <div className="text-left">
                                    <span className="block font-bold text-gray-900">Credit / Debit Card</span>
                                    <span className="block text-xs text-gray-500">Visa, Mastercard, RuPay</span>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-300 group-hover:text-[#FF6B35]" />
                        </button>

                        {/* Cash */}
                        <div className="p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                             <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                    <Banknote size={20} />
                                </div>
                                <div className="text-left">
                                    <span className="block font-bold text-gray-900">Cash Deposit</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed pl-[52px]">
                                Visit <span className="font-bold">Sevadhar Center, Khopoli Bazaar</span> to deposit cash and recharge instantly.
                            </p>
                            <div className="mt-3 pl-[52px]">
                                <button className="text-[#FF6B35] text-xs font-bold flex items-center gap-1 hover:underline">
                                    <Store size={12} /> Get Directions
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                            <CheckCircle2 size={12} /> Secure Payment by Sevadhar
                        </p>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default WalletPage;
