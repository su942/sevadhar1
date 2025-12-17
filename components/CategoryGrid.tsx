import React from 'react';
import * as Icons from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (id: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-6 mb-8">
      {categories.map((cat) => {
        // Dynamically get icon component
        const IconComponent = (Icons as any)[cat.iconName] || Icons.HelpCircle;
        
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-orange-50 transition-colors group"
          >
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${cat.color} bg-opacity-20 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform border border-orange-100`}>
              <IconComponent size={32} className="text-[#FF6B35]" />
            </div>
            <div className="text-center">
                <span className="block text-sm font-semibold text-gray-800">{cat.label}</span>
                <span className="block text-xs text-gray-500 font-medium">{cat.labelMarathi}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
