
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '../ui/logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
             <div className="h-8 mb-4">
                <Logo variant="light" className="h-full" />
             </div>
             <p className="text-gray-400 text-sm leading-relaxed">
               Sevadhar is Khopoli's most trusted hyperlocal service marketplace. We connect you with verified professionals for all your home service needs.
             </p>
             <div className="flex gap-4 pt-2">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors"><Facebook size={16} /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors"><Twitter size={16} /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors"><Instagram size={16} /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors"><Linkedin size={16} /></a>
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#FF6B35] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#FF6B35] shrink-0 mt-0.5" />
                <span>Shop No. 4, Sevadhar Center, Khopoli Bazaar, Maharashtra 410203</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#FF6B35] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#FF6B35] shrink-0" />
                <span>support@sevadhar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 text-center md:text-left">
          <p>© 2024 Sevadhar Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
             <span>Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
