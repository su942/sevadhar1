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
  experience: string; // e.g. "5 Years"
  isVerified: boolean; // Aadhaar/Police verified
  badges: string[]; // "Trusted", "Vaccinated"
  audioIntroUrl?: string; // Mock URL for voice intro
  availability: 'available' | 'busy' | 'offline';
  skills: string[];
  phoneNumber: string;
  walletBalance?: number; // For provider view
  ward?: string;
  notifications?: ProviderNotification[];
  category?: CategoryId; // Primary category for auth logic
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
  priceRange: string; // e.g. "₹200 - ₹500"
  price: number;
  rating: number;
  duration: string;
  image: string;
  variants?: ServiceVariant[];
  addons?: ServiceAddon[];
}

export interface CartItem {
  id: string; // Composite ID: serviceId + variantId + providerId
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
  serviceTitle?: string;
  providerId?: string;
  date: string;
  time: string;
  address: string;
  lat?: number;
  lng?: number;
  status: JobStatus;
  amount?: number;
  otpStart?: string; // OTP to start job
  otpEnd?: string; // OTP to end job
  paymentMethod?: 'upi' | 'card' | 'cash';
  paymentStatus?: 'paid' | 'pending';
}