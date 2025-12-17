
import React from 'react';
import { Wrench, Users, ShieldCheck, Clock, IndianRupee, Star, ChevronRight, CheckCircle2, MapPin } from 'lucide-react';
import { Logo } from './ui/logo';
import Footer from './layout/footer';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 transition-all shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer h-12" onClick={onGetStarted}>
            <Logo className="h-full" />
        </div>
        
        <button 
            onClick={onGetStarted}
            className="bg-[#FF6B35] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 transform hover:-translate-y-0.5"
        >
            Get Started
        </button>
      </nav>

      <div className="flex-1">
          {/* Hero Section */}
          <section className="relative pt-16 pb-20 md:pt-32 md:pb-32 px-4 overflow-hidden bg-[#fffbf8]">
             {/* Background Decoration */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-200 rounded-full blur-[120px] mix-blend-multiply filter"></div>
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-100 rounded-full blur-[100px] mix-blend-multiply filter"></div>
             </div>

             <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center">
                 {/* Status Indicators */}
                 <div className="flex items-center gap-6 mb-12 text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-700 bg-white/50 px-6 py-2 rounded-full border border-white/50 backdrop-blur-sm shadow-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                        <span className="text-gray-700">Available Now</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                        <span className="text-gray-500">Currently Busy</span>
                    </div>
                 </div>

                 {/* Main Heading */}
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                     <span className="bg-orange-50 text-[#FF6B35] border border-orange-100 px-4 py-1.5 rounded-full text-sm font-bold mb-8 inline-block shadow-sm">Simple Process</span>
                     <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight leading-tight">
                        How Sevadhar Works
                     </h2>
                     <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
                        Your trusted local marketplace for home services. <br className="hidden md:block"/>Instant help or scheduled professionals in your neighborhood.
                     </p>
                 </div>

                 {/* Action Cards */}
                 <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 w-full justify-center">
                    <button 
                        onClick={onGetStarted}
                        className="group flex items-center justify-center gap-3 bg-[#FF6B35] text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-orange-200 hover:bg-orange-600 hover:shadow-orange-300 transition-all transform hover:-translate-y-1"
                    >
                        <Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Book Service
                    </button>
                    <button 
                         onClick={onGetStarted}
                         className="group flex items-center justify-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all shadow-lg shadow-gray-100 border border-gray-100 transform hover:-translate-y-1"
                    >
                        <Users className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        Join as Partner
                    </button>
                 </div>

                 {/* Footer Text */}
                 <div className="text-gray-500 text-sm animate-in fade-in duration-1000 delay-500 bg-white/80 px-6 py-3 rounded-full backdrop-blur-sm border border-gray-100 inline-block">
                    <strong className="text-gray-900">Popular in:</strong> Shilphata, Veena Nagar, Khopoli Station
                 </div>
             </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 bg-white border-y border-gray-100">
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="p-4">
                      <h3 className="text-4xl font-bold text-[#FF6B35] mb-2">500+</h3>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Verified Partners</p>
                  </div>
                  <div className="p-4">
                      <h3 className="text-4xl font-bold text-[#FF6B35] mb-2">10k+</h3>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Happy Customers</p>
                  </div>
                  <div className="p-4">
                      <h3 className="text-4xl font-bold text-[#FF6B35] mb-2">4.8</h3>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Average Rating</p>
                  </div>
                  <div className="p-4">
                      <h3 className="text-4xl font-bold text-[#FF6B35] mb-2">20+</h3>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Service Categories</p>
                  </div>
              </div>
          </section>

          {/* Features Section */}
          <section className="py-24 px-6 bg-white">
              <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                      <span className="text-[#FF6B35] font-bold tracking-wide uppercase text-xs bg-orange-50 px-3 py-1 rounded-full">Why Sevadhar?</span>
                      <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">Hyperlocal Services, Simplified.</h2>
                      <p className="text-gray-500 max-w-2xl mx-auto text-lg">We connect you with trusted local professionals in your ward/area instantly. No middle-men, just direct service.</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                      {/* Feature 1 */}
                      <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:border-orange-100 transition-all group duration-300">
                          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                              <ShieldCheck size={32} />
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-gray-900">100% Verified</h3>
                          <p className="text-gray-500 leading-relaxed">Every provider undergoes strict Aadhaar and Police verification. Your safety is our top priority.</p>
                      </div>

                      {/* Feature 2 */}
                      <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:border-orange-100 transition-all group duration-300">
                          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                              <IndianRupee size={32} />
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-gray-900">Transparent Pricing</h3>
                          <p className="text-gray-500 leading-relaxed">No hidden charges. View price ranges upfront and pay directly via UPI or Cash.</p>
                      </div>

                      {/* Feature 3 */}
                      <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:border-orange-100 transition-all group duration-300">
                          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                              <Clock size={32} />
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-gray-900">Instant & Scheduled</h3>
                          <p className="text-gray-500 leading-relaxed">Need help now? Get connected in 60 seconds. Or schedule for later at your convenience.</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* Popular Services Scroll - PROFESSIONAL CARD DESIGN */}
          <section className="py-24 bg-gray-50 overflow-hidden">
              <div className="max-w-6xl mx-auto px-6 mb-12 flex justify-between items-end">
                  <div>
                      <h2 className="text-3xl font-bold mb-2">Popular Services</h2>
                      <p className="text-gray-500">Most requested services in Khopoli</p>
                  </div>
                  <button onClick={onGetStarted} className="text-[#FF6B35] font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      View All <ChevronRight size={18} />
                  </button>
              </div>
              
              {/* Horizontal Scroll Container */}
              <div className="flex gap-6 overflow-x-auto pb-8 px-6 no-scrollbar snap-x max-w-6xl mx-auto">
                 {[
                     { 
                       title: 'Home Cleaning', 
                       image: 'https://images.unsplash.com/photo-1581578731117-104f2a863a30?auto=format&fit=crop&q=80&w=400',
                       desc: 'Deep cleaning, Bathroom & Kitchen',
                       rating: '4.8 (2k)',
                       price: 'Starts ₹499'
                     },
                     { 
                       title: 'AC Repair & Service', 
                       image: 'https://images.unsplash.com/photo-1621905476059-5f34604809b6?auto=format&fit=crop&q=80&w=400', 
                       desc: 'Service, Gas Refill, Installation',
                       rating: '4.7 (5k)',
                       price: 'Starts ₹599'
                     },
                     { 
                       title: 'Salon for Women', 
                       image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400',
                       desc: 'Facials, Waxing, Manicure',
                       rating: '4.9 (8k)',
                       price: 'Starts ₹299'
                     },
                     { 
                       title: 'Electrician', 
                       image: 'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?auto=format&fit=crop&q=80&w=400',
                       desc: 'Wiring, Switch, Fan repair',
                       rating: '4.6 (1.2k)',
                       price: 'Starts ₹149'
                     },
                     { 
                       title: 'Plumbers', 
                       image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=400',
                       desc: 'Leakage, Basin, Fittings',
                       rating: '4.5 (900)',
                       price: 'Starts ₹199'
                     },
                     { 
                       title: 'Men\'s Grooming', 
                       image: 'https://images.unsplash.com/photo-1599351431202-6e0c06e7afbb?auto=format&fit=crop&q=80&w=400',
                       desc: 'Haircut, Beard, Massage',
                       rating: '4.8 (3k)',
                       price: 'Starts ₹249'
                     },
                 ].map((s, i) => (
                     <div key={i} onClick={onGetStarted} className="min-w-[280px] bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl hover:translate-y-[-4px] transition-all snap-center group overflow-hidden">
                         {/* Image Header */}
                         <div className="h-40 overflow-hidden relative">
                            <img src={s.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={s.title} />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                               <Star size={12} className="text-yellow-500 fill-yellow-500" /> {s.rating}
                            </div>
                         </div>
                         
                         <div className="p-5">
                            <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#FF6B35] transition-colors">{s.title}</h3>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{s.desc}</p>
                            
                            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                <span className="text-sm font-bold text-gray-900">{s.price}</span>
                                <div className="flex items-center gap-1 text-[#FF6B35] text-xs font-bold">
                                    Book <ChevronRight size={14} />
                                </div>
                            </div>
                         </div>
                     </div>
                 ))}
              </div>
          </section>

           {/* How It Works Steps */}
           <section className="py-24 px-6 bg-white">
               <div className="max-w-4xl mx-auto">
                   <div className="text-center mb-16">
                       <h2 className="text-3xl font-bold">Simple 4-Step Process</h2>
                       <p className="text-gray-500 mt-2">Get things done without the hassle.</p>
                   </div>
                   <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                       {[
                           { step: '01', title: 'Choose Service', desc: 'Select from 20+ services like Cleaning, Repairs, or Personal Care.' },
                           { step: '02', title: 'Pick Location', desc: 'Select your specific Ward/Area to find the nearest providers.' },
                           { step: '03', title: 'Book or Call', desc: 'Directly call the provider or book a slot through the app.' },
                           { step: '04', title: 'Pay Securely', desc: 'Pay via UPI, Cash, or Wallet after the service is done.' }
                       ].map((item, idx) => (
                           <div key={idx} className="flex items-start gap-6 group">
                               <div className="text-5xl font-black text-gray-100 group-hover:text-[#FF6B35] transition-colors -mt-2">{item.step}</div>
                               <div>
                                   <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                                   <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                               </div>
                           </div>
                       ))}
                   </div>
               </div>
           </section>

          {/* CTA Footer */}
          <section className="py-24 px-6 bg-gray-900 text-white relative overflow-hidden">
              {/* Bg Decoration */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-50 pointer-events-none"></div>

              <div className="max-w-4xl mx-auto text-center relative z-10">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to simplify your life?</h2>
                  <p className="text-gray-400 mb-10 text-lg max-w-xl mx-auto">Join thousands of happy customers in Khopoli who trust Sevadhar for their daily home service needs.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={onGetStarted}
                        className="bg-[#FF6B35] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl shadow-orange-900/20"
                    >
                        Find a Service
                    </button>
                    <button 
                        onClick={onGetStarted}
                        className="bg-gray-800 text-white border border-gray-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition-all"
                    >
                        Register as Partner
                    </button>
                  </div>
              </div>
          </section>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
