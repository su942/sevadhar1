
import { Category, Service, Provider, Location, Coupon } from '../../types';

export const LOCATIONS: Location[] = [
  { id: 'shilphata', name: 'Shilphata' },
  { id: 'veena_nagar', name: 'Veena Nagar' },
  { id: 'bazzar_pet', name: 'Bazzar Pet' },
  { id: 'khopoli_stn', name: 'Khopoli Station' },
];

export const COUPONS: Coupon[] = [
  { code: 'SEVA20', discountPercent: 20, maxDiscount: 100, minOrderValue: 299 },
  { code: 'FIRST50', discountPercent: 50, maxDiscount: 150, minOrderValue: 0 },
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
  // --- Cleaning ---
  {
    id: 'c1', categoryId: 'cleaning', title: 'Full Home Deep Cleaning', titleMarathi: 'पूर्ण घर सफाई',
    description: 'Deep cleaning of floor, windows, furniture, and washrooms.',
    priceRange: '₹1499+', price: 1499, rating: 4.8, duration: '6-8 Hrs',
    image: 'https://images.unsplash.com/photo-1581578731117-104f2a863a30?auto=format&fit=crop&q=80&w=400',
    variants: [
      { id: 'v1', title: '1 BHK Occupied', price: 1499 },
      { id: 'v2', title: '2 BHK Occupied', price: 1999 },
      { id: 'v3', title: '3 BHK Occupied', price: 2499 }
    ]
  },
  {
    id: 'c2', categoryId: 'cleaning', title: 'Bathroom Cleaning', titleMarathi: 'बाथरूम सफाई',
    description: 'Stain removal, floor scrubbing, and sanitization.',
    priceRange: '₹399+', price: 399, rating: 4.7, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
    variants: [
      { id: 'v1', title: '1 Bathroom', price: 399 },
      { id: 'v2', title: '2 Bathrooms', price: 699 }
    ]
  },
  {
    id: 'c3', categoryId: 'cleaning', title: 'Kitchen Deep Cleaning', titleMarathi: 'स्वयंपाकघर सफाई',
    description: 'Oil & grease removal from tiles, slab, and cabinets.',
    priceRange: '₹999', price: 999, rating: 4.6, duration: '2-3 Hrs',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'c4', categoryId: 'cleaning', title: 'Sofa Cleaning', titleMarathi: 'सोफा सफाई',
    description: 'Shampooing and vacuuming for dust & stain removal.',
    priceRange: '₹249/seat', price: 749, rating: 4.8, duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=400',
    variants: [
        { id: 'v1', title: '3 Seater Sofa', price: 749 },
        { id: 'v2', title: '5 Seater Sofa', price: 1199 }
    ]
  },
  {
    id: 'c5', categoryId: 'cleaning', title: 'Carpet Cleaning', titleMarathi: 'कार्पेट सफाई',
    description: 'Deep vacuum and shampoo wash.',
    priceRange: '₹599', price: 599, rating: 4.5, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1528733918455-5a59687cedf0?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'c6', categoryId: 'cleaning', title: 'Full Time Maid Service', titleMarathi: 'पूर्ण वेळ मोलकरीण',
    description: 'Daily cleaning, sweeping, mopping, and dusting.',
    priceRange: '₹5000/mo', price: 5000, rating: 4.7, duration: 'Monthly',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e14806c?auto=format&fit=crop&q=80&w=400'
  },

  // --- Electrician ---
  {
    id: 'e1', categoryId: 'electrician', title: 'Fan Repair & Installation', titleMarathi: 'पंखा दुरुस्ती',
    description: 'Repair noise, speed issues or install new fan.',
    priceRange: '₹149', price: 149, rating: 4.6, duration: '30 Min',
    image: 'https://images.unsplash.com/photo-1621905476059-5f34604809b6?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'e2', categoryId: 'electrician', title: 'Switchboard Repair', titleMarathi: 'स्विचबोर्ड दुरुस्ती',
    description: 'Fix faulty switches, sockets or regulators.',
    priceRange: '₹99', price: 99, rating: 4.5, duration: '20 Min',
    image: 'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'e3', categoryId: 'electrician', title: 'MCB & Fuse Repair', titleMarathi: 'एमसीबी दुरुस्ती',
    description: 'Fix tripping MCB or blown fuse issues.',
    priceRange: '₹249', price: 249, rating: 4.8, duration: '30 Min',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'e4', categoryId: 'electrician', title: 'Chandelier Installation', titleMarathi: 'झूमर बसवणे',
    description: 'Professional installation of ceiling lights.',
    priceRange: '₹499', price: 499, rating: 4.7, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'e5', categoryId: 'electrician', title: 'Inverter Installation', titleMarathi: 'इन्व्हर्टर बसवणे',
    description: 'Battery and inverter setup.',
    priceRange: '₹599', price: 599, rating: 4.6, duration: '1.5 Hrs',
    image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'e6', categoryId: 'electrician', title: 'House Wiring', titleMarathi: 'घर वायरिंग',
    description: 'Complete or partial house wiring work.',
    priceRange: 'Visit & Quote', price: 100, rating: 4.5, duration: 'Custom',
    image: 'https://images.unsplash.com/photo-1542834368-80e92ec49154?auto=format&fit=crop&q=80&w=400'
  },

  // --- Plumber ---
  {
    id: 'p1', categoryId: 'plumber', title: 'Tap & Mixer Repair', titleMarathi: 'नळ दुरुस्ती',
    description: 'Fix dripping taps or install new ones.',
    priceRange: '₹149', price: 149, rating: 4.7, duration: '30 Min',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p2', categoryId: 'plumber', title: 'Blockage Removal', titleMarathi: 'ब्लॉकेज काढणे',
    description: 'Clear clogged basin, sink or bathroom pipes.',
    priceRange: '₹399', price: 399, rating: 4.5, duration: '45 Min',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p3', categoryId: 'plumber', title: 'Toilet Installation', titleMarathi: 'टॉयलेट बसवणे',
    description: 'Western or Indian toilet seat installation.',
    priceRange: '₹899', price: 899, rating: 4.6, duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p4', categoryId: 'plumber', title: 'Water Tank Cleaning', titleMarathi: 'टाकी सफाई',
    description: 'Mechanized cleaning of overhead water tanks.',
    priceRange: '₹999', price: 999, rating: 4.8, duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p5', categoryId: 'plumber', title: 'Wash Basin Installation', titleMarathi: 'बेसिन बसवणे',
    description: 'Fitting new wash basin and waste pipe.',
    priceRange: '₹499', price: 499, rating: 4.7, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p6', categoryId: 'plumber', title: 'Shower Installation', titleMarathi: 'शावर बसवणे',
    description: 'Installing wall mixer and overhead shower.',
    priceRange: '₹599', price: 599, rating: 4.6, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80&w=400'
  },

  // --- AC Repair ---
  {
    id: 'ac1', categoryId: 'ac_repair', title: 'AC Service (Split/Window)', titleMarathi: 'एसी सर्व्हिसिंग',
    description: 'Filter cleaning, coil checking, and pressure wash.',
    priceRange: '₹499', price: 499, rating: 4.8, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1621905476059-5f34604809b6?auto=format&fit=crop&q=80&w=400',
    variants: [{id: 'v1', title: 'Window AC', price: 499}, {id: 'v2', title: 'Split AC', price: 699}]
  },
  {
    id: 'ac2', categoryId: 'ac_repair', title: 'AC Gas Refill', titleMarathi: 'गॅस भरणे',
    description: 'Refrigerant top-up for cooling issues.',
    priceRange: '₹2499', price: 2499, rating: 4.7, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ac3', categoryId: 'ac_repair', title: 'AC Installation', titleMarathi: 'एसी बसवणे',
    description: 'Professional installation with pipe fitting.',
    priceRange: '₹1499', price: 1499, rating: 4.6, duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ac4', categoryId: 'ac_repair', title: 'AC Uninstallation', titleMarathi: 'एसी काढणे',
    description: 'Safe removal of AC unit.',
    priceRange: '₹799', price: 799, rating: 4.7, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d5?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ac5', categoryId: 'ac_repair', title: 'AC PCB Repair', titleMarathi: 'पीसीबी दुरुस्ती',
    description: 'Circuit board repair for power issues.',
    priceRange: 'Visit & Quote', price: 250, rating: 4.5, duration: 'Custom',
    image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ac6', categoryId: 'ac_repair', title: 'AC Smart Plug Setup', titleMarathi: 'स्मार्ट प्लग',
    description: 'Convert old AC to Smart AC with wifi plug.',
    priceRange: '₹299', price: 299, rating: 4.9, duration: '30 Min',
    image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=400'
  },

  // --- Salon ---
  {
    id: 's1', categoryId: 'salon', title: 'Fruit Facial', titleMarathi: 'फ्रूट फेशियल',
    description: 'Natural glow facial for all skin types.',
    priceRange: '₹699', price: 699, rating: 4.8, duration: '45 Min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 's2', categoryId: 'salon', title: 'Full Body Waxing', titleMarathi: 'वॅक्सिंग',
    description: 'Arms, legs, and underarms waxing (Honey/Rica).',
    priceRange: '₹899', price: 899, rating: 4.7, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 's3', categoryId: 'salon', title: 'Manicure & Pedicure', titleMarathi: 'मॅनिक्युअर',
    description: 'Nail cutting, filing, and massage.',
    priceRange: '₹999', price: 999, rating: 4.6, duration: '1.5 Hrs',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 's4', categoryId: 'salon', title: 'Hair Cut & Styling', titleMarathi: 'हेअर कट',
    description: 'Professional haircut for women.',
    priceRange: '₹499', price: 499, rating: 4.8, duration: '45 Min',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 's5', categoryId: 'salon', title: 'Men\'s Grooming', titleMarathi: 'पुरुषांचे ग्रूमिंग',
    description: 'Haircut, shave, and head massage.',
    priceRange: '₹399', price: 399, rating: 4.7, duration: '45 Min',
    image: 'https://images.unsplash.com/photo-1599351431202-6e0c06e7afbb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 's6', categoryId: 'salon', title: 'Head Massage', titleMarathi: 'डोके मालिश',
    description: 'Relaxing oil massage.',
    priceRange: '₹299', price: 299, rating: 4.9, duration: '30 Min',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400'
  },

  // --- Carpenter ---
  {
    id: 'ca1', categoryId: 'carpenter', title: 'Furniture Repair', titleMarathi: 'फर्निचर दुरुस्ती',
    description: 'Fixing loose joints, hinges, legs.',
    priceRange: '₹399', price: 399, rating: 4.6, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1598348341635-3bb50c2c4b69?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ca2', categoryId: 'carpenter', title: 'Door Lock Installation', titleMarathi: 'कुलूप बसवणे',
    description: 'Install main door or bedroom locks.',
    priceRange: '₹299', price: 299, rating: 4.5, duration: '45 Min',
    image: 'https://images.unsplash.com/photo-1616198814651-e71f960c3180?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ca3', categoryId: 'carpenter', title: 'Drill & Hang', titleMarathi: 'ड्रिलिंग काम',
    description: 'Hanging paintings, clocks, curtain rods.',
    priceRange: '₹149', price: 149, rating: 4.7, duration: '30 Min',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ca4', categoryId: 'carpenter', title: 'Custom Shelf Making', titleMarathi: 'शेल्फ बनवणे',
    description: 'Wooden shelf for kitchen or living room.',
    priceRange: '₹999+', price: 999, rating: 4.6, duration: 'Custom',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ca5', categoryId: 'carpenter', title: 'Bed Assembly/Dismantle', titleMarathi: 'बेड असेंब्ली',
    description: 'For moving or new furniture.',
    priceRange: '₹699', price: 699, rating: 4.5, duration: '1.5 Hrs',
    image: 'https://images.unsplash.com/photo-1505693416388-b034680970bf?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ca6', categoryId: 'carpenter', title: 'Curtain Rod Installation', titleMarathi: 'पडदा रॉड',
    description: 'Fixing brackets and rod.',
    priceRange: '₹299', price: 299, rating: 4.7, duration: '45 Min',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400'
  },

  // --- Driver ---
  {
    id: 'd1', categoryId: 'driver', title: 'Daily Driver (8 Hrs)', titleMarathi: 'डेली ड्रायव्हर',
    description: 'Local city driving for 8 hours.',
    priceRange: '₹800/day', price: 800, rating: 4.7, duration: '8 Hrs',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'd2', categoryId: 'driver', title: 'Outstation Driver', titleMarathi: 'बाहेरगाव ड्रायव्हर',
    description: 'Driver for outstation trips (24 hrs).',
    priceRange: '₹1200/day', price: 1200, rating: 4.8, duration: '24 Hrs',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'd3', categoryId: 'driver', title: 'Hourly Driver', titleMarathi: 'तासावर ड्रायव्हर',
    description: 'For short trips within city.',
    priceRange: '₹150/hr', price: 150, rating: 4.5, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'd4', categoryId: 'driver', title: 'Monthly Driver', titleMarathi: 'महिन्याचा ड्रायव्हर',
    description: 'Dedicated driver for the whole month.',
    priceRange: '₹15000/mo', price: 15000, rating: 4.8, duration: 'Monthly',
    image: 'https://images.unsplash.com/photo-1532939163844-547f958e91b4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'd5', categoryId: 'driver', title: 'Valet for Party', titleMarathi: 'व्हॅले पार्किंग',
    description: 'Drivers for parking guests cars.',
    priceRange: '₹600/driver', price: 600, rating: 4.6, duration: '4 Hrs',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ed5d6?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'd6', categoryId: 'driver', title: 'School Pickup/Drop', titleMarathi: 'शाळा पिकअप',
    description: 'Reliable monthly service for kids.',
    priceRange: '₹4000/mo', price: 4000, rating: 4.9, duration: 'Monthly',
    image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=400'
  },

  // --- Painter ---
  {
    id: 'pt1', categoryId: 'painter', title: 'Room Painting', titleMarathi: 'खोली पेंटिंग',
    description: 'Repainting walls for a single room.',
    priceRange: '₹2500+', price: 2500, rating: 4.7, duration: '1-2 Days',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pt2', categoryId: 'painter', title: 'Waterproofing', titleMarathi: 'वॉटरप्रूफिंग',
    description: 'Fix damp walls and leakage.',
    priceRange: 'Visit & Quote', price: 500, rating: 4.6, duration: 'Custom',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pt3', categoryId: 'painter', title: 'Furniture Polishing', titleMarathi: 'फर्निचर पॉलिश',
    description: 'Varnish and polish for wood furniture.',
    priceRange: '₹999+', price: 999, rating: 4.5, duration: 'Custom',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pt4', categoryId: 'painter', title: 'Wall Stencil Art', titleMarathi: 'भिंत कला',
    description: 'Designer patterns for feature walls.',
    priceRange: '₹1500/wall', price: 1500, rating: 4.8, duration: '4 Hrs',
    image: 'https://images.unsplash.com/photo-1562259920-47afc305f369?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pt5', categoryId: 'painter', title: 'Full Home Painting', titleMarathi: 'पूर्ण घर पेंटिंग',
    description: 'Interior and exterior painting package.',
    priceRange: 'Quote', price: 10000, rating: 4.7, duration: '5-7 Days',
    image: 'https://images.unsplash.com/photo-1562259949-e871cd57db80?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pt6', categoryId: 'painter', title: 'Texture Painting', titleMarathi: 'टेक्सचर पेंटिंग',
    description: 'Royal play and texture designs.',
    priceRange: '₹50/sqft', price: 2000, rating: 4.8, duration: '2 Days',
    image: 'https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&q=80&w=400'
  },

  // --- Cook ---
  {
    id: 'ck1', categoryId: 'cook', title: 'Home Cook (Monthly)', titleMarathi: 'स्वयंपाकी',
    description: 'Breakfast, Lunch and Dinner.',
    priceRange: '₹6000/mo', price: 6000, rating: 4.8, duration: 'Monthly',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ck2', categoryId: 'cook', title: 'Party Chef', titleMarathi: 'पार्टी शेफ',
    description: 'Cook for birthdays or small gatherings.',
    priceRange: '₹2000/meal', price: 2000, rating: 4.9, duration: '5 Hrs',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ck3', categoryId: 'cook', title: 'North Indian Special', titleMarathi: 'उत्तर भारतीय जेवण',
    description: 'Specialist in Roti, Sabzi, Dal Tadka.',
    priceRange: '₹500/visit', price: 500, rating: 4.7, duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ck4', categoryId: 'cook', title: 'South Indian Special', titleMarathi: 'दक्षिण भारतीय',
    description: 'Idli, Dosa, Sambar specialist.',
    priceRange: '₹400/visit', price: 400, rating: 4.8, duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e0?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ck5', categoryId: 'cook', title: 'Healthy/Diet Food', titleMarathi: 'डाएट फूड',
    description: 'Salads, boiled food, low oil cooking.',
    priceRange: '₹600/visit', price: 600, rating: 4.6, duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ck6', categoryId: 'cook', title: 'Tiffin Service', titleMarathi: 'टिफिन सेवा',
    description: 'Home cooked meals delivered.',
    priceRange: '₹3000/mo', price: 3000, rating: 4.5, duration: 'Monthly',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400'
  },

  // --- Pest Control ---
  {
    id: 'pc1', categoryId: 'pest_control', title: 'General Pest Control', titleMarathi: 'कीटक नियंत्रण',
    description: 'For ants, lizards, and spiders.',
    priceRange: '₹899', price: 899, rating: 4.6, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pc2', categoryId: 'pest_control', title: 'Cockroach Control', titleMarathi: 'झुरळ नियंत्रण',
    description: 'Gel and spray treatment for kitchen.',
    priceRange: '₹599', price: 599, rating: 4.7, duration: '45 Min',
    image: 'https://images.unsplash.com/photo-1621262657731-b84501a35567?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pc3', categoryId: 'pest_control', title: 'Termite Treatment', titleMarathi: 'वाळवी उपचार',
    description: 'Drilling and chemical filling for wood.',
    priceRange: '₹2999+', price: 2999, rating: 4.8, duration: '3 Hrs',
    image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pc4', categoryId: 'pest_control', title: 'Bed Bug Treatment', titleMarathi: 'ढेकूण नियंत्रण',
    description: 'Intense spray for beds and furniture.',
    priceRange: '₹1200', price: 1200, rating: 4.5, duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1595123550441-d377e017de6a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pc5', categoryId: 'pest_control', title: 'Rodent/Rat Control', titleMarathi: 'उंदीर नियंत्रण',
    description: 'Traps and entry point sealing.',
    priceRange: '₹799', price: 799, rating: 4.4, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea218?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pc6', categoryId: 'pest_control', title: 'Mosquito Fogging', titleMarathi: 'डास नियंत्रण',
    description: 'Thermal fogging for society or bungalow.',
    priceRange: '₹1500', price: 1500, rating: 4.6, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1596796929734-70a1132646c1?auto=format&fit=crop&q=80&w=400'
  },

  // --- Tuition ---
  {
    id: 'tu1', categoryId: 'tuition', title: 'Maths Tuition (1-10)', titleMarathi: 'गणित शिकवणी',
    description: 'Home tutor for Mathematics.',
    priceRange: '₹3000/mo', price: 3000, rating: 4.8, duration: 'Monthly',
    image: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tu2', categoryId: 'tuition', title: 'Science Tuition', titleMarathi: 'विज्ञान शिकवणी',
    description: 'Physics, Chemistry, Biology tutor.',
    priceRange: '₹3000/mo', price: 3000, rating: 4.7, duration: 'Monthly',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tu3', categoryId: 'tuition', title: 'English Speaking', titleMarathi: 'इंग्रजी संभाषण',
    description: 'Improve spoken English fluency.',
    priceRange: '₹2000/mo', price: 2000, rating: 4.6, duration: 'Monthly',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tu4', categoryId: 'tuition', title: 'Music Classes', titleMarathi: 'संगीत वर्ग',
    description: 'Guitar, Keyboard or Singing lessons.',
    priceRange: '₹1500/mo', price: 1500, rating: 4.9, duration: 'Weekly',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tu5', categoryId: 'tuition', title: 'Home Yoga Instructor', titleMarathi: 'योग वर्ग',
    description: 'Personal yoga sessions at home.',
    priceRange: '₹500/session', price: 500, rating: 4.8, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tu6', categoryId: 'tuition', title: 'Competitive Exam Prep', titleMarathi: 'स्पर्धा परीक्षा',
    description: 'MPSC/UPSC/Bank Exam coaching.',
    priceRange: '₹5000/mo', price: 5000, rating: 4.9, duration: 'Monthly',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400'
  },

  // --- Car Wash ---
  {
    id: 'cw1', categoryId: 'car_wash', title: 'Exterior Car Wash', titleMarathi: 'कार धुणे',
    description: 'Shampoo wash and tyre polishing.',
    priceRange: '₹399', price: 399, rating: 4.6, duration: '45 Min',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cw2', categoryId: 'car_wash', title: 'Interior Detailing', titleMarathi: 'इंटीरियर सफाई',
    description: 'Vacuuming and seat dry cleaning.',
    priceRange: '₹899', price: 899, rating: 4.7, duration: '1.5 Hrs',
    image: 'https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cw3', categoryId: 'car_wash', title: 'Full Car Spa', titleMarathi: 'पूर्ण कार स्पा',
    description: 'Exterior wash + Interior detailing.',
    priceRange: '₹1299', price: 1299, rating: 4.8, duration: '2 Hrs',
    image: 'https://images.unsplash.com/photo-1520340356584-7eb003f36e29?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cw4', categoryId: 'car_wash', title: 'Bike Wash', titleMarathi: 'बाईक वॉश',
    description: 'Foam wash for two-wheelers.',
    priceRange: '₹149', price: 149, rating: 4.5, duration: '30 Min',
    image: 'https://images.unsplash.com/photo-1625043484555-47841a754388?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cw5', categoryId: 'car_wash', title: 'Car Polishing', titleMarathi: 'कार पॉलिश',
    description: 'Wax polish for shine and protection.',
    priceRange: '₹599', price: 599, rating: 4.6, duration: '1 Hr',
    image: 'https://images.unsplash.com/photo-1632823471419-f41cb837d363?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cw6', categoryId: 'car_wash', title: 'Engine Steam Wash', titleMarathi: 'इंजिन वॉश',
    description: 'Degreasing engine bay safely.',
    priceRange: '₹399', price: 399, rating: 4.7, duration: '45 Min',
    image: 'https://images.unsplash.com/photo-1550523117-9c98791a27c0?auto=format&fit=crop&q=80&w=400'
  }
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
    ward: 'Shilphata',
    reviews: [
        { id: 'r1', userName: 'Vikas', rating: 5, comment: 'Very professional work. Fixed the leakage instantly.', date: '2 days ago' },
        { id: 'r2', userName: 'Neha', rating: 4, comment: 'Good but arrived a bit late. Work was perfect though.', date: '1 week ago' }
    ]
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
    skills: ['Cleaning', 'Maid', 'Full Time Maid', 'Deep Cleaning', 'Gardening'],
    phoneNumber: '+91 98765 43211',
    ward: 'Veena Nagar',
    reviews: [
        { id: 'r1', userName: 'Anjali', rating: 5, comment: 'Suman tai is very hardworking and honest.', date: '3 days ago' },
        { id: 'r2', userName: 'Rahul', rating: 5, comment: 'Spotless cleaning for my 2BHK. Highly recommended.', date: '2 weeks ago' }
    ]
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
    ward: 'Bazzar Pet',
    reviews: [
        { id: 'r1', userName: 'Sameer', rating: 4, comment: 'Safe driver, knows all the shortcuts in Khopoli.', date: '1 month ago' }
    ]
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
    skills: ['Beauty', 'Facial', 'Massage', 'Haircut', 'Salon'],
    phoneNumber: '+91 98222 33344',
    ward: 'Khopoli Station',
    reviews: [
        { id: 'r1', userName: 'Priya', rating: 5, comment: 'Very hygienic and professional service.', date: '5 days ago' },
        { id: 'r2', userName: 'Sneha', rating: 4, comment: 'Good massage, very relaxing.', date: '3 weeks ago' }
    ]
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
    ward: 'Shilphata',
    reviews: [
        { id: 'r1', userName: 'Amit', rating: 5, comment: 'Quick diagnosis of the fan issue.', date: '1 day ago' }
    ]
  },
  {
    id: 'pr6',
    name: 'Rajesh Vishwakarma',
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150',
    rating: 4.8,
    experience: '12 Years',
    isVerified: true,
    badges: ['Aadhaar Verified', 'Expert'],
    availability: 'available',
    skills: ['Carpenter', 'Furniture Repair', 'Polishing', 'Door Fix'],
    phoneNumber: '+91 98333 44455',
    ward: 'Veena Nagar',
    reviews: [
        { id: 'r1', userName: 'Karan', rating: 5, comment: 'Fixed my wardrobe door perfectly.', date: '1 week ago' },
        { id: 'r2', userName: 'Meera', rating: 5, comment: 'Very skilled carpenter.', date: '2 months ago' }
    ]
  },
  {
    id: 'pr7',
    name: 'Meena Kulkarni',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    rating: 4.9,
    experience: '6 Years',
    isVerified: true,
    badges: ['Vaccinated', 'Hygiene Expert'],
    availability: 'available',
    skills: ['Cook', 'Cooking', 'North Indian', 'Maharashtrian'],
    phoneNumber: '+91 98444 55566',
    ward: 'Bazzar Pet',
    reviews: [
        { id: 'r1', userName: 'Sunita', rating: 5, comment: 'Her Puran Poli is the best!', date: '3 days ago' },
        { id: 'r2', userName: 'Vikram', rating: 4, comment: 'Makes healthy and tasty meals.', date: '1 month ago' }
    ]
  }
];
