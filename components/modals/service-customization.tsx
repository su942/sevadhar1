
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Service, ServiceVariant, ServiceAddon } from '../../types';
import { Button } from '../ui/button';

interface ServiceCustomizationModalProps {
  service: Service;
  onClose: () => void;
  onConfirm: (service: Service, variant?: ServiceVariant, addons?: ServiceAddon[]) => void;
}

const ServiceCustomizationModal: React.FC<ServiceCustomizationModalProps> = ({ service, onClose, onConfirm }) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(service.variants?.[0]?.id || '');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    if (selectedAddonIds.includes(id)) {
        setSelectedAddonIds(prev => prev.filter(a => a !== id));
    } else {
        setSelectedAddonIds(prev => [...prev, id]);
    }
  };

  const calculateTotal = () => {
      let total = 0;
      // Variant Price
      if (service.variants) {
          const v = service.variants.find(v => v.id === selectedVariantId);
          if (v) total += v.price;
      } else {
          total += service.price;
      }
      // Addons
      if (service.addons) {
          service.addons.forEach(a => {
              if (selectedAddonIds.includes(a.id)) total += a.price;
          });
      }
      return total;
  };

  const handleConfirm = () => {
      const variant = service.variants?.find(v => v.id === selectedVariantId);
      const addons = service.addons?.filter(a => selectedAddonIds.includes(a.id));
      onConfirm(service, variant, addons);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-900">Customize {service.title}</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={20} /></button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Variants */}
                {service.variants && service.variants.length > 0 && (
                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Select Option</h4>
                        <div className="space-y-3">
                            {service.variants.map(v => (
                                <div 
                                    key={v.id} 
                                    onClick={() => setSelectedVariantId(v.id)}
                                    className={`flex justify-between items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedVariantId === v.id ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div>
                                        <p className="font-bold text-gray-900">{v.title}</p>
                                        <p className="text-sm text-gray-500">₹{v.price}</p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedVariantId === v.id ? 'border-[#FF6B35]' : 'border-gray-300'}`}>
                                        {selectedVariantId === v.id && <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Addons */}
                {service.addons && service.addons.length > 0 && (
                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Add-ons (Optional)</h4>
                        <div className="space-y-3">
                            {service.addons.map(a => {
                                const isSelected = selectedAddonIds.includes(a.id);
                                return (
                                    <div 
                                        key={a.id} 
                                        onClick={() => toggleAddon(a.id)}
                                        className={`flex justify-between items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div>
                                            <p className="font-bold text-gray-900">{a.title}</p>
                                            <p className="text-sm text-gray-500">+₹{a.price}</p>
                                        </div>
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSelected ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>
                                            {isSelected && <Check size={14} />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <Button onClick={handleConfirm} className="w-full flex justify-between items-center py-4 text-base font-bold">
                    <span>₹{calculateTotal()}</span>
                    <span>Add to Cart</span>
                </Button>
            </div>

        </div>
    </div>
  );
};

export default ServiceCustomizationModal;
