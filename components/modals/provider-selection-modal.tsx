
import React, { useMemo } from 'react';
import { X, Star, ShieldCheck, User, MapPin } from 'lucide-react';
import { Service, Provider, ServiceVariant, ServiceAddon } from '../../types';
import { PROVIDERS } from '../../lib/utils/constants';

interface ProviderSelectionModalProps {
  service: Service;
  variant?: ServiceVariant;
  addons?: ServiceAddon[];
  location: string;
  onClose: () => void;
  onSelect: (provider?: Provider) => void;
}

const ProviderSelectionModal: React.FC<ProviderSelectionModalProps> = ({ service, variant, addons, location, onClose, onSelect }) => {
  
  const availableProviders = useMemo(() => {
    // 1. Basic Filter (Service + Location)
    const baseList = PROVIDERS.filter(p => {
       const categoryMatch = p.skills.some(skill => 
           skill.toLowerCase().includes(service.categoryId) || 
           skill.toLowerCase().includes(service.title.split(' ')[0].toLowerCase())
       );
       const locationMatch = location ? p.ward === location : true;
       return categoryMatch && locationMatch; 
    });

    // 2. Refined Filter (Variants/Addons)
    // If specific variants/addons are selected, prioritize providers who list those skills explicitly.
    // If this strict filtering results in 0 providers, we fall back to the base list.
    const refinedList = baseList.filter(p => {
        const pSkills = p.skills.map(s => s.toLowerCase());
        
        // Check Variant (Optional refinement)
        if (variant) {
            // For example, if variant is "Split AC", we check if provider has "Split AC" skill.
            // If they don't, we don't necessarily exclude them unless we want strict matching.
            // Here we use it as a strict filter for the "refined" list.
            const vTitle = variant.title.toLowerCase();
            const hasVariantSkill = pSkills.some(s => s.includes(vTitle));
            // If the provider has a skill matching the variant, keep them. 
            // If not, we drop them from the *refined* list (but they might stay in baseList).
            // NOTE: If variant doesn't imply a special skill, this might be too strict, 
            // but the fallback mechanism handles that.
        }

        // Check Addons (Critical for some services)
        if (addons && addons.length > 0) {
             // Require provider to have skills matching the addons
             const matchesAddon = addons.every(a => 
                pSkills.some(s => s.includes(a.title.toLowerCase()))
            );
            if (!matchesAddon) return false; 
        }
        return true;
    });

    // If refined list has providers, use it. Otherwise fall back to base list (providers who match the category).
    return refinedList.length > 0 ? refinedList : baseList;
  }, [service, location, variant, addons]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
          <div className="flex items-center gap-3">
              <img src={service.image} alt={service.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200" />
              <div>
                  <h3 className="font-bold text-gray-900 leading-tight">Select Professional</h3>
                  <div className="flex flex-col">
                      <span className="text-xs text-gray-500">For {service.title}</span>
                      {(variant || (addons && addons.length > 0)) && (
                          <span className="text-[10px] text-[#FF6B35] font-medium truncate max-w-[200px]">
                              {variant ? variant.title : ''} 
                              {addons && addons.length > 0 ? ` + ${addons.length} addons` : ''}
                          </span>
                      )}
                  </div>
              </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-4 bg-gray-50/50">
            
            {/* Option 1: Any Professional (Sevadhar Select) */}
            <div 
                onClick={() => onSelect(undefined)}
                className="bg-white p-4 rounded-xl border-2 border-dashed border-[#FF6B35] cursor-pointer hover:bg-orange-50 transition-all group relative overflow-hidden"
            >
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF6B35] to-orange-600 flex items-center justify-center text-white shadow-lg">
                        <User size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-lg">Sevadhar Select</h4>
                        <p className="text-sm text-gray-500">We assign the best available pro</p>
                    </div>
                    <div className="ml-auto bg-[#FF6B35] text-white text-xs px-3 py-1 rounded-full font-bold">
                        Quickest
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 my-2">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-xs text-gray-400 font-medium uppercase">Or Choose Specific</span>
                <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Provider List */}
            {availableProviders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No specific providers found in {location || 'your area'}.</p>
                    <p className="text-xs mt-1">Try "Sevadhar Select" for automatic assignment.</p>
                </div>
            ) : (
                availableProviders.map(provider => (
                    <div 
                        key={provider.id}
                        onClick={() => onSelect(provider)}
                        className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-[#FF6B35] hover:shadow-md transition-all group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="relative">
                                <img src={provider.photo} className="w-14 h-14 rounded-full object-cover bg-gray-200" alt={provider.name} />
                                {provider.isVerified && (
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-0.5 border-2 border-white">
                                        <ShieldCheck size={10} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors">{provider.name}</h4>
                                    <div className="flex items-center gap-1 bg-orange-50 text-[#FF6B35] px-1.5 py-0.5 rounded text-xs font-bold">
                                        <Star size={10} className="fill-current" /> {provider.rating}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">{provider.experience} Exp • {provider.ward}</p>
                                
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {provider.badges.slice(0, 2).map((b, i) => (
                                        <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{b}</span>
                                    ))}
                                    {/* Show skill matches badge if addons matched */}
                                    {addons && addons.length > 0 && provider.skills.some(s => addons.some(a => s.toLowerCase().includes(a.title.toLowerCase()))) && (
                                         <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">Matches Add-ons</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default ProviderSelectionModal;
