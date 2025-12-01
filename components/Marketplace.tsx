import React, { useState } from 'react';
import { Search, MapPin, Filter, ArrowLeftRight, ShoppingBag } from 'lucide-react';
import { FashionItem } from '../types';

interface MarketplaceProps {
  items: FashionItem[];
}

export const Marketplace: React.FC<MarketplaceProps> = ({ items }) => {
  const [filter, setFilter] = useState<'all' | 'swap' | 'sale'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => {
    const matchesType = filter === 'all' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-4 py-4 border-b border-gray-100">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search vintage, brands, styles..." 
            className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            All Listings
          </button>
          <button 
             onClick={() => setFilter('swap')}
             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 transition-colors ${filter === 'swap' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-600'}`}
          >
            <ArrowLeftRight className="w-3 h-3" /> Swaps Only
          </button>
          <button 
             onClick={() => setFilter('sale')}
             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 transition-colors ${filter === 'sale' ? 'bg-violet-100 text-violet-800 border border-violet-200' : 'bg-gray-100 text-gray-600'}`}
          >
            <ShoppingBag className="w-3 h-3" /> For Sale
          </button>
          <button className="p-2 bg-gray-100 rounded-full text-gray-600">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 pt-4">
        {filteredItems.map(item => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-gray-100">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide text-white ${item.type === 'swap' ? 'bg-emerald-500' : 'bg-violet-500'}`}>
                {item.type}
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm truncate">{item.title}</h3>
            <div className="flex items-center justify-between mt-1">
              <p className="text-gray-500 text-xs font-medium">${item.price}</p>
              <div className="flex items-center text-gray-400 text-[10px]">
                <MapPin className="w-3 h-3 mr-0.5" />
                {item.distance}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};