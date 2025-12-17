
import { CartItem, Service, ServiceVariant, ServiceAddon, Coupon, Provider } from '../../types';
import { COUPONS } from '../utils/constants';

class CartStore {
  items: CartItem[] = [];
  coupon: Coupon | null = null;
  listeners: Function[] = [];
  isCartOpen: boolean = false;

  // Add Item now needs to handle unique combinations of Service + Variant + Addons + Provider
  addItem(service: Service, variant?: ServiceVariant, addons?: ServiceAddon[], provider?: Provider) {
    // Generate a unique ID for this specific configuration
    const variantId = variant ? variant.id : 'base';
    const addonIds = addons ? addons.map(a => a.id).sort().join('-') : '';
    const providerId = provider ? provider.id : 'any';
    
    const compositeId = `${service.id}_${variantId}_${addonIds}_${providerId}`;
    
    // Calculate total price for this unit
    let unitPrice = variant ? variant.price : service.price;
    if (addons) {
        addons.forEach(a => unitPrice += a.price);
    }

    const existing = this.items.find(i => i.id === compositeId);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ 
          id: compositeId,
          serviceId: service.id,
          title: service.title,
          image: service.image,
          price: unitPrice,
          quantity: 1,
          variant,
          addons,
          selectedProvider: provider ? {
              id: provider.id,
              name: provider.name,
              photo: provider.photo
          } : null
      });
    }
    this.notify();
  }

  removeItem(cartItemId: string) {
    const existing = this.items.find(i => i.id === cartItemId);
    if (existing) {
      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        this.items = this.items.filter(i => i.id !== cartItemId);
      }
      this.notify();
    }
  }

  applyCoupon(code: string): boolean {
      const found = COUPONS.find(c => c.code === code);
      if (found) {
          this.coupon = found;
          this.notify();
          return true;
      }
      return false;
  }

  removeCoupon() {
      this.coupon = null;
      this.notify();
  }

  clearCart() {
    this.items = [];
    this.coupon = null;
    this.notify();
  }

  toggleCart(isOpen: boolean) {
    this.isCartOpen = isOpen;
    this.notify();
  }

  getTotalAmount() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getDiscountAmount() {
      if (!this.coupon) return 0;
      const total = this.getTotalAmount();
      if (total < this.coupon.minOrderValue) return 0;
      
      const discount = (total * this.coupon.discountPercent) / 100;
      return Math.min(discount, this.coupon.maxDiscount);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  subscribe(listener: Function) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l());
  }
}

export const cartStore = new CartStore();
