import React from 'react';
import { Booking, Service, Provider } from '../../../types';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { CalendarDays, Clock, MapPin, User } from 'lucide-react';
import { SERVICES, PROVIDERS } from '../../../lib/utils/constants';

interface BookingsPageProps {
  bookings: Booking[];
}

const BookingsPage: React.FC<BookingsPageProps> = ({ bookings }) => {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <CalendarDays size={48} className="text-gray-300" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">No bookings yet</h2>
        <p className="text-gray-500 mt-2 max-w-xs">Looks like you haven't booked any services yet. Go to Home to find help.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
      <div className="space-y-4">
        {bookings.map((booking) => {
          const service = SERVICES.find(s => s.id === booking.serviceId);
          const provider = PROVIDERS.find(p => p.id === booking.providerId);
          
          return (
            <Card key={booking.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-32 h-32 bg-gray-100">
                    <img src={service?.image} alt={service?.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="flex-1 flex flex-col justify-center gap-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{service?.title}</h3>
                            <p className="text-sm text-gray-500">{service?.titleMarathi}</p>
                        </div>
                        <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>
                            {booking.status}
                        </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-[#FF6B35]" />
                            <span>{booking.date} at {booking.time}</span>
                        </div>
                        {provider && (
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-[#FF6B35]" />
                                <span>Provider: <strong>{provider.name}</strong></span>
                            </div>
                        )}
                         <div className="flex items-center gap-2 md:col-span-2">
                            <MapPin size={16} className="text-[#FF6B35]" />
                            <span className="truncate">{booking.address}</span>
                        </div>
                    </div>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BookingsPage;
