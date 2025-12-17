
import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Tag, Trash2 } from 'lucide-react';
import { cartStore } from '../../lib/store/cart-store';
import { CartItem } from '../../types';
import { Button } from '../ui/button';

interface CartDrawerProps {
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const [isOpen, setIsOpen] = useState(cartStore.isCartOpen);
  const [items, setItems] = useState<CartItem[]>(cartStore.items);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(cartStore.coupon);

  useEffect(() => {
    const unsubscribe = cartStore.subscribe(() => {
      setIsOpen(cartStore.isCartOpen);
      setItems([...cartStore.items]);
      setAppliedCoupon(cartStore.coupon);
    });
    return unsubscribe;
  }, []);

  const handleApplyCoupon = () => {
      const success = cartStore.applyCoupon(couponCode.toUpperCase());
      if (success) {
          alert("Coupon Applied Successfully!");
      } else {
          alert("Invalid Coupon Code");
      }
      setCouponCode('');
  };

  if (!isOpen) return null;

  const total = cartStore.getTotalAmount();
  const discount = cartStore.getDiscountAmount();
  const platformFee = 19;
  const taxes = Math.round((total - discount) * 0.18);
  const finalTotal = total - discount + platformFee + taxes;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
        onClick={() => cartStore.toggleCart(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingBag className="text-[#FF6B35]" size={20} /> Your Cart
          </h2>
          <button 
            onClick={() => cartStore.toggleCart(false)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag size={64} className="opacity-20" />
              <p>Your cart is empty.</p>
              <Button onClick={() => cartStore.toggleCart(false)} variant="outline">Browse Services</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 border border-gray-100 rounded-xl relative overflow-hidden">
                <img src={item.image} alt="" className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 leading-tight">{item.title}</h3>
                  
                  {/* Variant/Addon Badges */}
                  <div className="flex flex-wrap gap-1 mt-1 mb-2">
                     {item.variant && <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">{item.variant.title}</span>}
                     {item.addons?.map(a => (
                         <span key={a.id} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">+ {a.title}</span>
                     ))}
                  </div>

                  <p className="text-sm font-bold text-[#FF6B35]">₹{item.price}</p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => cartStore.removeItem(item.id)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => cartStore.addItem({id: item.serviceId} as any, item.variant, item.addons)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white space-y-4">
            
            {/* Coupon Section */}
            {!appliedCoupon ? (
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Coupon Code (Try SEVA20)" 
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#FF6B35]"
                        />
                    </div>
                    <Button size="sm" onClick={handleApplyCoupon} disabled={!couponCode}>Apply</Button>
                </div>
            ) : (
                <div className="bg-green-50 border border-green-100 p-3 rounded-lg flex justify-between items-center text-sm text-green-700">
                    <div className="flex items-center gap-2">
                        <Tag size={16} className="fill-green-100" />
                        <span className="font-bold">{appliedCoupon.code} applied</span>
                    </div>
                    <button onClick={() => cartStore.removeCoupon()} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                </div>
            )}

            {/* Bill Details */}
            <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between text-gray-600">
                <span>Item Total</span>
                <span>₹{total}</span>
              </div>
              
              {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes (18%)</span>
                <span>₹{taxes}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button 
              onClick={onCheckout}
              className="w-full py-4 text-base font-bold shadow-lg shadow-orange-100 flex justify-between items-center"
            >
              <span>₹{finalTotal}</span>
              <span className="flex items-center gap-2">Proceed <ArrowRight size={18} /></span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
