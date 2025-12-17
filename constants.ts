import { Category, Service, Provider, Location } from './types';

export const LOCATIONS: Location[] = [
  { id: 'shilphata', name: 'Shilphata' },
  { id: 'veena_nagar', name: 'Veena Nagar' },
  { id: 'bazzar_pet', name: 'Bazzar Pet' },
  { id: 'khopoli_stn', name: 'Khopoli Station' },
];

export const CATEGORIES: Category[] = [
  { id: 'cleaning', label: 'Maid / Cleaning', labelMarathi: 'घरकाम / सफाई', iconName: 'Sparkles', color: 'bg-orange-50 text-orange-600' },
  { id: 'plumber', label: 'Plumber', labelMarathi: 'प्लंबर', iconName: 'Droplets', color: 'bg-orange-50 text-orange-600' },
  { id: 'electrician', label: 'Electrician', labelMarathi: 'इलेक्ट्रिशियन', iconName: 'Zap', color: 'bg-orange-50 text-orange-600' },
  { id: 'driver', label: 'Driver', labelMarathi: 'ड्रायव्हर', iconName: 'CarFront', color: 'bg-orange-50 text-orange-600' },
  { id: 'carpenter', label: 'Carpenter', labelMarathi: 'सुतार', iconName: 'Hammer', color: 'bg-orange-50 text-orange-600' },
  { id: 'painter', label: 'Painter', labelMarathi: 'पेंटर', iconName: 'PaintRoller', color: 'bg-orange-50 text-orange-600' },
  { id: 'cook', label: 'Cook', labelMarathi: 'स्वयंपाकी', iconName: 'ChefHat', color: 'bg-orange-50 text-orange-600' },
  { id: 'ac_repair', label: 'AC Repair', labelMarathi: 'एसी रिपेअर', iconName: 'Snowflake', color: 'bg-orange-50 text-orange-600' },
  { id: 'pest_control', label: 'Pest Control', labelMarathi: 'कीटक नियंत्रण', iconName: 'BugOff', color: 'bg-orange-50 text-orange-600' },
  { id: 'salon', label: 'Beauty', labelMarathi: 'सौंदर्य सेवा', iconName: 'Scissors', color: 'bg-orange-50 text-orange-600' },
  { id: 'tuition', label: 'Tuition', labelMarathi: 'शिकवणी', iconName: 'BookOpen', color: 'bg-orange-50 text-orange-600' },
  { id: 'car_wash', label: 'Car Wash', labelMarathi: 'कार वॉश', iconName: 'Droplets', color: 'bg-orange-50 text-orange-600' },
];

export const SERVICES: Service[] = [
  { 
    id: 'c1', 
    categoryId: 'cleaning', 
    title: 'Full Time Maid', 
    titleMarathi: 'पूर्ण वेळ मोलकरीण', 
    description: 'Cleaning, washing clothes, utensils.', 
    priceRange: '₹5000/mo', 
    price: 5000,
    rating: 4.8,
    duration: 'Monthly',
    image: 'https://images.unsplash.com/photo-1581578731117-104f2a863a30?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'c2', 
    categoryId: 'cleaning', 
    title: 'Deep Cleaning', 
    titleMarathi: 'डीप क्लीनिंग', 
    description: 'Complete home cleaning.', 
    priceRange: '₹1500', 
    price: 1500,
    rating: 4.7,
    duration: '4-5 Hrs',
    image: 'https://images.unsplash.com/photo-1527512860163-549943b98e8e?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'c3', 
    categoryId: 'cleaning', 
    title: 'Gardening / Mali', 
    titleMarathi: 'बागकाम / माळी', 
    description: 'Basic garden maintenance, watering, trimming.', 
    priceRange: '₹500/visit', 
    price: 500,
    rating: 4.6,
    duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'c4', 
    categoryId: 'cleaning', 
    title: 'Sofa Cleaning', 
    titleMarathi: 'सोफा सफाई', 
    description: 'Vacuum and shampoo cleaning for 5 seater.', 
    priceRange: '₹800', 
    price: 800,
    rating: 4.5,
    duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'e1', 
    categoryId: 'electrician', 
    title: 'Fan/Switch Repair', 
    titleMarathi: 'पंखा/स्विच दुरुस्ती', 
    description: 'Fixing electrical faults.', 
    priceRange: '₹200', 
    price: 200,
    rating: 4.5,
    duration: '30 Min',
    image: 'https://images.unsplash.com/photo-1621905476059-5f34604809b6?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'e2', 
    categoryId: 'electrician', 
    title: 'Appliance Repair', 
    titleMarathi: 'उपकरणे दुरुस्ती', 
    description: 'Repair mixer, iron, toaster, etc.', 
    priceRange: '₹300+', 
    price: 300,
    rating: 4.4,
    duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'e3', 
    categoryId: 'electrician', 
    title: 'Inverter Installation', 
    titleMarathi: 'इन्व्हर्टर बसवणे', 
    description: 'Installation of battery and inverter unit.', 
    priceRange: '₹500', 
    price: 500,
    rating: 4.7,
    duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1621905476059-5f34604809b6?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'd1', 
    categoryId: 'driver', 
    title: 'Daily Driver', 
    titleMarathi: 'ड्रायव्हर', 
    description: 'For local or outstation trips.', 
    priceRange: '₹500/day', 
    price: 500,
    rating: 4.6,
    duration: '8 Hrs',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 's1', 
    categoryId: 'salon', 
    title: 'Facial & Cleanup', 
    titleMarathi: 'फेशियल', 
    description: 'Fruit facial and massage.', 
    priceRange: '₹800', 
    price: 800,
    rating: 4.9,
    duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 's2', 
    categoryId: 'salon', 
    title: 'Men\'s Haircut', 
    titleMarathi: 'पुरुषांचे हेअरकट', 
    description: 'Professional haircut and styling at home.', 
    priceRange: '₹200', 
    price: 200,
    rating: 4.8,
    duration: '45 Min',
    image: 'https://images.unsplash.com/photo-1599351431202-6e0c06e7afbb?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'p1', 
    categoryId: 'plumber', 
    title: 'Leakage Repair', 
    titleMarathi: 'गळती दुरुस्ती', 
    description: 'Fixing taps and pipes.', 
    priceRange: '₹250', 
    price: 250,
    rating: 4.2,
    duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'p2', 
    categoryId: 'plumber', 
    title: 'Water Tank Cleaning', 
    titleMarathi: 'पाण्याची टाकी सफाई', 
    description: 'Overhead tank cleaning (up to 1000L).', 
    priceRange: '₹1000', 
    price: 1000,
    rating: 4.6,
    duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'ca1', 
    categoryId: 'carpenter', 
    title: 'Furniture Repair', 
    titleMarathi: 'फर्निचर दुरुस्ती', 
    description: 'Fixing loose joints, hinges, and handles.', 
    priceRange: '₹400', 
    price: 400,
    rating: 4.3,
    duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1598348341635-3bb50c2c4b69?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'ac1', 
    categoryId: 'ac_repair', 
    title: 'AC Gas Refill', 
    titleMarathi: 'एसी गॅस भरणे', 
    description: 'Refrigerant top-up for split/window AC.', 
    priceRange: '₹2500', 
    price: 2500,
    rating: 4.7,
    duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1621905476059-5f34604809b6?auto=format&fit=crop&q=80&w=400' 
  },
];

export const PROVIDERS: Provider[] = [
  {
    id: 'pr1',
    name: 'Ramesh Patil',
    photo: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=150',
    rating: 4.8,
    experience: '7 Years',
    isVerified: true,
    badges: ['Aadhaar Verified', 'Police Verified'],
    availability: 'available',
    skills: ['Plumber', 'Pipe Fitting', 'Tap Repair', 'Leakage Repair', 'Water Tank Cleaning'],
    phoneNumber: '+91 98765 43210',
    ward: 'Shilphata'
  },
  {
    id: 'pr2',
    name: 'Suman Deshmukh',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    rating: 4.9,
    experience: '10 Years',
    isVerified: true,
    badges: ['Aadhaar Verified', 'Trusted'],
    availability: 'available',
    skills: ['Cooking', 'Cleaning', 'Maid', 'Full Time Maid', 'Deep Cleaning', 'Gardening'],
    phoneNumber: '+91 98765 43211',
    ward: 'Veena Nagar'
  },
  {
    id: 'pr3',
    name: 'Vikram Singh',
    photo: 'https://images.unsplash.com/photo-1521119989659-a83eee488058?auto=format&fit=crop&q=80&w=150',
    rating: 4.5,
    experience: '3 Years',
    isVerified: false,
    badges: ['Aadhaar Verified'],
    availability: 'busy',
    skills: ['Driver', 'Heavy Vehicle', 'Daily Driver'],
    phoneNumber: '+91 98765 43212',
    ward: 'Bazzar Pet'
  },
  {
    id: 'pr4',
    name: 'Anita Gaikwad',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    rating: 4.7,
    experience: '5 Years',
    isVerified: true,
    badges: ['Vaccinated'],
    availability: 'offline',
    skills: ['Beauty', 'Facial', 'Massage', 'Haircut'],
    phoneNumber: '+91 98222 33344',
    ward: 'Khopoli Station'
  },
  {
    id: 'pr5',
    name: 'Suresh Mhatre',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    rating: 4.6,
    experience: '8 Years',
    isVerified: true,
    badges: ['Aadhaar Verified'],
    availability: 'available',
    skills: ['Electrician', 'Fan Repair', 'Appliance Repair', 'Inverter Installation'],
    phoneNumber: '+91 98222 55566',
    ward: 'Shilphata'
  }
];