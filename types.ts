export type CategoryId = 'cleaning' | 'electrician' | 'plumber' | 'carpenter' | 'salon' | 'painter' | 'driver' | 'cook' | 'ac_repair' | 'pest_control' | 'tuition' | 'car_wash';

export type UserRole = 'user' | 'provider' | null;

export interface Location {
  id: string;
  name: string;
}

export type DocumentType = 'aadhaar' | 'driving_license' | 'pan' | 'certificate';

export interface ProviderNotification {
  id: string;
  type: 'lead' | 'system' | 'wallet';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  photos?: string[];
}

export interface Provider {
  id: string;
  name: string;
  photo: string;
  rating: number;
  experience: string;
  isVerified: boolean;
  badges: string[];
  audioIntroUrl?: string;
  availability: 'available' | 'busy' | 'offline';
  skills: string[];
  phoneNumber: string;
  walletBalance?: number;
  ward?: string;
  notifications?: ProviderNotification[];
  category?: CategoryId;
  reviews?: Review[];
}

export interface ServiceVariant {
  id: string;
  title: string;
  price: number;
}

export interface ServiceAddon {
  id: string;
  title: string;
  price: number;
}

export interface Service {
  id: string;
  categoryId: CategoryId;
  title: string;
  titleMarathi?: string;
  description: string;
  priceRange: string;
  price: number;
  rating: number;
  duration: string;
  image: string;
  variants?: ServiceVariant[];
  addons?: ServiceAddon[];
}

export interface CartItem {
  id: string;
  serviceId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  variant?: ServiceVariant;
  addons?: ServiceAddon[];
  selectedProvider?: {
      id: string;
      name: string;
      photo: string;
  } | null;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  minOrderValue: number;
}

export interface Category {
  id: CategoryId;
  label: string;
  labelMarathi: string;
  iconName: string;
  color: string;
}

export type JobStatus = 'pending' | 'confirmed' | 'accepted' | 'started' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string; 
  providerId?: string;
  date: string;
  time: string;
  address: string;
  lat?: number;
  lng?: number;
  status: JobStatus;
  amount: number;
  otpStart?: string; 
  otpEnd?: string;
  paymentMethod?: 'upi' | 'card' | 'cash';
  paymentStatus?: 'paid' | 'pending';
}