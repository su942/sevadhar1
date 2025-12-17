
import React, { useState } from 'react';
import { Star, Clock, ChevronDown, ChevronUp, User, ThumbsUp } from 'lucide-react';
import { Service, Review } from '../types';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    // Simulate network delay for realistic effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock reviews based on service type
    const mockReviews: Review[] = [
        {
            id: 'r1',
            userName: 'Priya Sharma',
            rating: 5,
            comment: `The ${service.title} service was excellent. Very professional and on time.`,
            date: '2 days ago'
        },
        {
            id: 'r2',
            userName: 'Rahul Verma',
            rating: 4,
            comment: 'Good experience, but arrived slightly late. Work quality was great though.',
            date: '1 week ago'
        },
        {
            id: 'r3',
            userName: 'Amit Patel',
            rating: 5,
            comment: 'Highly recommended! Fixed the issue quickly and cleaned up afterwards.',
            date: '3 weeks ago'
        }
    ];
    setReviews(mockReviews);
    setIsLoadingReviews(false);
  };

  const handleToggleReviews = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showReviews && reviews.length === 0) {
        fetchReviews();
    }
    setShowReviews(!showReviews);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-[#FF6B35] transition-all overflow-hidden hover:shadow-md group flex flex-col">
      {/* Main Content */}
      <div className="p-4 flex gap-4 items-start cursor-pointer" onClick={() => onBook(service)}>
        <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative">
            <img 
              src={service.image} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              alt={service.title}
            />
            {service.duration && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-2 py-0.5 text-center backdrop-blur-sm">
                    {service.duration}
                </div>
            )}
        </div>
        
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900 truncate pr-2 group-hover:text-[#FF6B35] transition-colors">{service.title}</h3>
                <div className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-600 shrink-0">
                    <Star size={8} className="fill-current text-yellow-500" /> {service.rating}
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">{service.titleMarathi}</p>
            <p className="text-xs text-gray-500 mb-2 line-clamp-2">{service.description}</p>
            
            <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-semibold text-[#FF6B35]">{service.priceRange}</span>
                
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleToggleReviews}
                        className="text-xs text-gray-400 hover:text-[#FF6B35] font-medium flex items-center gap-1 transition-colors"
                    >
                        {showReviews ? 'Hide Reviews' : 'Reviews'}
                        {showReviews ? <ChevronUp size={12}/> : <ChevronDown size={12}/>}
                    </button>
                    <button 
                        className="bg-white text-[#FF6B35] border border-[#FF6B35] hover:bg-orange-50 h-7 px-3 rounded-lg text-xs font-bold transition-colors"
                    >
                        ADD
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Reviews Section */}
      {showReviews && (
        <div className="bg-gray-50 border-t border-gray-100 p-4 animate-in slide-in-from-top-2">
            {isLoadingReviews ? (
                <div className="flex items-center justify-center py-4 text-gray-400 gap-2 text-xs">
                    <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"/>
                    Loading reviews...
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                         <h4 className="text-xs font-bold text-gray-700 uppercase">Recent Reviews</h4>
                         <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold">{service.rating} / 5.0</span>
                    </div>
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-orange-100 text-[#FF6B35] rounded-full flex items-center justify-center text-xs font-bold">
                                        {review.userName.charAt(0)}
                                    </div>
                                    <span className="text-xs font-bold text-gray-900">{review.userName}</span>
                                </div>
                                <span className="text-[10px] text-gray-400">{review.date}</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">"{review.comment}"</p>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={8} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-200"} />
                                    ))}
                                </div>
                                <div className="h-3 w-px bg-gray-200"></div>
                                <button className="text-[10px] text-gray-400 flex items-center gap-1 hover:text-gray-600">
                                    <ThumbsUp size={10} /> Helpful
                                </button>
                            </div>
                        </div>
                    ))}
                    <button className="w-full text-center text-xs text-[#FF6B35] font-bold hover:underline py-1">
                        View All Reviews
                    </button>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
