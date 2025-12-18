
import React, { useState, useMemo, useEffect } from 'react';
import CategoryGrid from '../../components/user/service-grid';
import ProviderCard from '../../components/user/provider-card';
import { CATEGORIES, SERVICES, PROVIDERS } from '../../lib/utils/constants';
import { Service, Booking, Provider, ServiceVariant, ServiceAddon } from '../../types/index';
import { ArrowLeft, Sparkles, MapPin, ShieldCheck, Zap, Star, Plus, Minus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cartStore } from '../../lib/store/cart-store';
import ServiceCustomizationModal from '../../components/modals/service-customization';
import ProviderSelectionModal from '../../components/modals/provider-selection-modal';
import BookingModal from '../../components/modals/booking-modal';

interface UserHomePageProps {
    searchQuery: string;
    searchResults: { services: Service[], reasoning: string } | null;
    selectedLocation: string;
    onBookingConfirmed: (booking: Booking) => void;
}

const UserHomePage: React.FC<UserHomePageProps> = ({ searchQuery = '', searchResults = null, selectedLocation = '', onBookingConfirmed = () => { } }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState(cartStore.items);

    // Customization State
    const [customizingService, setCustomizingService] = useState<Service | null>(null);
    const [selectedServiceForProvider, setSelectedServiceForProvider] = useState<Service | null>(null);

    // Booking Modal State (Direct Booking)
    const [bookingModalConfig, setBookingModalConfig] = useState<{ service: Service, provider: Provider } | null>(null);

    // Temporary hold for variant/addons before provider selection
    const [pendingCartItem, setPendingCartItem] = useState<{ service: Service, variant?: ServiceVariant, addons?: ServiceAddon[] } | null>(null);

    useEffect(() => {
        return cartStore.subscribe(() => setCartItems([...cartStore.items]));
    }, []);

    // Filter Logic
    const categoryServices = useMemo(() => SERVICES.filter(s => s.categoryId === selectedCategoryId), [selectedCategoryId]);
    const selectedCategory = CATEGORIES.find(c => c.id === selectedCategoryId);

    // Filter Providers by Location
    const topProviders = useMemo(() => {
        let filtered = PROVIDERS;
        if (selectedLocation) {
            filtered = filtered.filter(p => p.ward === selectedLocation);
        }
        // Sort by rating desc
        return filtered.sort((a, b) => b.rating - a.rating).slice(0, 4);
    }, [selectedLocation]);

    // Helper to check if any variant of this service is in cart
    const getQuantity = (id: string) => {
        return cartItems.filter(i => i.serviceId === id).reduce((acc, curr) => acc + curr.quantity, 0);
    };

    const handleAddClick = (service: Service) => {
        // Step 1: Check variants/addons
        if ((service.variants && service.variants.length > 0) || (service.addons && service.addons.length > 0)) {
            setCustomizingService(service);
        } else {
            // Direct Add -> Go to Provider Selection
            setPendingCartItem({ service });
            setSelectedServiceForProvider(service);
        }
    };

    const handleCustomizationConfirm = (service: Service, variant?: ServiceVariant, addons?: ServiceAddon[]) => {
        // Step 2: After Customization -> Go to Provider Selection
        setPendingCartItem({ service, variant, addons });
        setCustomizingService(null);
        setSelectedServiceForProvider(service);
    };

    const handleProviderSelection = (provider?: Provider) => {
        if (pendingCartItem) {
            cartStore.addItem(pendingCartItem.service, pendingCartItem.variant, pendingCartItem.addons, provider);
            setPendingCartItem(null);
            setSelectedServiceForProvider(null);
        }
    };

    const handleBookProvider = (provider: Provider) => {
        // Attempt to find a matching service for this provider
        let service = SERVICES.find(s => {
            return provider.skills.some(skill =>
                s.title.toLowerCase().includes(skill.toLowerCase()) ||
                (s.categoryId && skill.toLowerCase().includes(s.categoryId))
            );
        });

        // Fallback: use category mapping
        if (!service) {
            const category = CATEGORIES.find(c => provider.skills.some(s => s.toLowerCase().includes(c.id)));
            if (category) service = SERVICES.find(s => s.categoryId === category.id);
        }

        if (service) {
            setBookingModalConfig({ service, provider });
        } else {
            // If we really can't find a service, redirect to category
            const category = CATEGORIES.find(c => provider.skills.some(s => s.toLowerCase().includes(c.id)));
            if (category) {
                setSelectedCategoryId(category.id);
                alert(`Viewing services for ${provider.name}. Please select a specific service.`);
            } else {
                alert(`Please select a service category to book ${provider.name}.`);
            }
        }
    };

    const handleDirectBookingConfirm = (details: any) => {
        if (!bookingModalConfig) return;

        const newBooking: Booking = {
            id: Math.random().toString(36).substr(2, 9),
            serviceId: bookingModalConfig.service.id,
            serviceTitle: bookingModalConfig.service.title,
            providerId: bookingModalConfig.provider.id,
            date: details.date,
            time: details.time,
            address: details.address,
            status: 'pending',
            amount: details.amount,
            paymentMethod: details.paymentMethod,
            paymentStatus: details.paymentMethod === 'cash' ? 'pending' : 'paid'
        };

        onBookingConfirmed(newBooking);
        setBookingModalConfig(null);
    };

    if (selectedCategoryId) {
        return (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <button onClick={() => setSelectedCategoryId(null)} className="flex items-center gap-2 text-gray-600 mb-6 hover:text-[#FF6B35] transition-colors font-medium text-sm"><ArrowLeft size={18} /> Back to Categories</button>

                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{selectedCategory?.label}</h2>
                        <p className="text-gray-500 mt-1">{selectedCategory?.labelMarathi}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-[#FF6B35]">
                        <Sparkles size={24} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryServices.map(s => {
                        const qty = getQuantity(s.id);
                        return (
                            <div key={s.id} className="group bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-orange-100 transition-all flex gap-4 items-center">
                                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                                    <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors">{s.title}</h3>
                                        <div className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-600">
                                            <Star size={8} className="fill-current" /> {s.rating}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 mb-2 line-clamp-1">{s.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#FF6B35] font-bold text-sm">₹{s.price}</span>

                                        <Button
                                            size="sm"
                                            onClick={() => handleAddClick(s)}
                                            className={`h-8 px-4 text-xs ${qty > 0 ? 'bg-orange-50 text-[#FF6B35] border-orange-200' : 'bg-white text-[#FF6B35] border-[#FF6B35] hover:bg-orange-50'} border`}
                                        >
                                            {qty > 0 ? `ADD +${qty}` : 'ADD'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Floating Cart Button if items exist */}
                {cartItems.length > 0 && (
                    <div className="fixed bottom-24 left-4 right-4 z-[60] md:bottom-8 md:left-auto md:right-8 md:w-96 animate-in slide-in-from-bottom-10 fade-in duration-300">
                        <button
                            onClick={() => cartStore.toggleCart(true)}
                            className="w-full bg-[#FF6B35] text-white p-4 rounded-xl shadow-xl flex justify-between items-center font-bold border border-orange-400/20 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 px-3 py-1 rounded-lg text-sm font-medium border border-white/10">
                                    {cartStore.getItemCount()} Items
                                </div>
                                <span className="text-lg">₹{cartStore.getTotalAmount()}</span>
                            </div>
                            <span className="flex items-center gap-2 text-sm bg-black/10 px-3 py-1.5 rounded-lg hover:bg-black/20 transition-colors">
                                View Cart <ArrowLeft className="rotate-180" size={16} />
                            </span>
                        </button>
                    </div>
                )}

                {/* Customization Modal */}
                {customizingService && (
                    <ServiceCustomizationModal
                        service={customizingService}
                        onClose={() => setCustomizingService(null)}
                        onConfirm={handleCustomizationConfirm}
                    />
                )}

                {/* Provider Selection Modal */}
                {selectedServiceForProvider && (
                    <ProviderSelectionModal
                        service={selectedServiceForProvider}
                        variant={pendingCartItem?.variant}
                        addons={pendingCartItem?.addons}
                        location={selectedLocation}
                        onClose={() => {
                            setSelectedServiceForProvider(null);
                            setPendingCartItem(null);
                        }}
                        onSelect={handleProviderSelection}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500 pb-20">
            {/* Search Overlay */}
            {searchResults && (
                <div className="mb-8 bg-orange-50 border border-orange-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex gap-3 items-start mb-6">
                        <div className="bg-white p-2 rounded-full shadow-sm text-[#FF6B35]">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">AI Recommendation</h3>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{searchResults.reasoning}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {searchResults.services.map(s => (
                            <div key={s.id} onClick={() => setSelectedCategoryId(s.categoryId)} className="bg-white p-4 rounded-xl border border-orange-200 cursor-pointer hover:bg-orange-50 hover:shadow-sm transition-all flex items-center justify-between group">
                                <span className="font-medium text-gray-800">{s.title}</span>
                                <ArrowLeft className="rotate-180 text-gray-300 group-hover:text-[#FF6B35]" size={16} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Promo Banners */}
            <div className="relative mb-10 group overflow-x-auto no-scrollbar flex gap-4 snap-x pb-4">
                {/* Banner 1: Cleaning */}
                <div className="min-w-[85%] md:min-w-[60%] snap-center relative rounded-3xl overflow-hidden h-48 md:h-64 bg-gray-900 text-white shadow-xl flex-shrink-0 cursor-pointer hover:shadow-2xl transition-all">
                    <img src="https://images.unsplash.com/photo-1581578731117-104f2a863a30?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                    <div className="relative z-10 h-full flex flex-col justify-center p-8">
                        <span className="bg-[#FF6B35] w-fit px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">Limited Offer</span>
                        <h2 className="text-2xl md:text-4xl font-bold mb-2">Home Cleaning <br />Flat 20% OFF</h2>
                        <p className="text-gray-300 mb-6 text-sm md:text-base">Get your home festive ready with our deep cleaning experts.</p>
                        <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm w-fit hover:bg-gray-100 transition-colors">Book Now</button>
                    </div>
                </div>

                {/* Banner 2: AC Repair */}
                <div className="min-w-[85%] md:min-w-[60%] snap-center relative rounded-3xl overflow-hidden h-48 md:h-64 bg-blue-900 text-white shadow-xl flex-shrink-0 cursor-pointer hover:shadow-2xl transition-all">
                    <img src="https://images.unsplash.com/photo-1621905476059-5f34604809b6?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
                    <div className="relative z-10 h-full flex flex-col justify-center p-8">
                        <span className="bg-blue-500 w-fit px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">Summer Special</span>
                        <h2 className="text-2xl md:text-4xl font-bold mb-2">AC Service <br />Starts @ ₹499</h2>
                        <p className="text-blue-200 mb-6 text-sm md:text-base">Beat the heat with our expert AC servicing & gas refill.</p>
                        <button className="bg-white text-blue-900 px-6 py-2 rounded-full font-bold text-sm w-fit hover:bg-blue-50 transition-colors">Book Now</button>
                    </div>
                </div>

                {/* Banner 3: Salon */}
                <div className="min-w-[85%] md:min-w-[60%] snap-center relative rounded-3xl overflow-hidden h-48 md:h-64 bg-pink-900 text-white shadow-xl flex-shrink-0 cursor-pointer hover:shadow-2xl transition-all">
                    <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-900/90 to-transparent"></div>
                    <div className="relative z-10 h-full flex flex-col justify-center p-8">
                        <span className="bg-pink-500 w-fit px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">Women's Special</span>
                        <h2 className="text-2xl md:text-4xl font-bold mb-2">Salon at Home <br />Upto 50% Off</h2>
                        <p className="text-pink-200 mb-6 text-sm md:text-base">Waxing, Facials, Manicure & more at your doorstep.</p>
                        <button className="bg-white text-pink-900 px-6 py-2 rounded-full font-bold text-sm w-fit hover:bg-pink-50 transition-colors">Book Now</button>
                    </div>
                </div>
            </div>

            {!selectedLocation && (
                <div className="bg-red-50 border border-red-100 text-red-800 px-4 py-3 rounded-xl mb-8 flex items-center gap-3 animate-pulse">
                    <MapPin size={20} />
                    <p className="text-sm font-medium">Please select your <strong>Ward/Area</strong> above to see providers.</p>
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">All Services</h2>
                <span className="text-sm text-[#FF6B35] font-bold cursor-pointer">View All</span>
            </div>
            <CategoryGrid categories={CATEGORIES} onSelectCategory={setSelectedCategoryId} />

            {/* Top Providers Section */}
            {topProviders.length > 0 && (
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">
                            {selectedLocation ? `Top Pros in ${selectedLocation}` : 'Top Rated Professionals'}
                        </h2>
                        {selectedLocation && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {topProviders.length} nearby
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {topProviders.map(provider => (
                            <ProviderCard
                                key={provider.id}
                                provider={provider}
                                onBook={() => handleBookProvider(provider)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Trust Markers */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-green-600">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Sevadhar Safety</h4>
                            <p className="text-xs text-gray-500">Verified Professionals</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Instant Connect</h4>
                            <p className="text-xs text-gray-500">Response in 60 secs</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-orange-600">
                            <Star size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Top Rated</h4>
                            <p className="text-xs text-gray-500">4.8 Average Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Direct Booking Modal */}
            {bookingModalConfig && (
                <BookingModal
                    service={bookingModalConfig.service}
                    provider={bookingModalConfig.provider}
                    onClose={() => setBookingModalConfig(null)}
                    onConfirm={handleDirectBookingConfirm}
                />
            )}
        </div>
    );
};

export default UserHomePage;
