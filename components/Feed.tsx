import React from 'react';
import { Heart, MessageCircle, Share2, Leaf } from 'lucide-react';
import { FashionItem } from '../types';

interface FeedProps {
  items: FashionItem[];
}

export const Feed: React.FC<FeedProps> = ({ items }) => {
  return (
    <div className="space-y-6 pb-20">
      <div className="px-4 pt-6">
        <h2 className="text-2xl font-bold text-gray-900">For You</h2>
        <p className="text-gray-500 text-sm">Curated sustainable finds based on your vibe.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="relative aspect-[4/5]">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Leaf className="w-3 h-3 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-700">{item.sustainabilityScore}/10 Eco Score</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white">
                   <p className="font-semibold text-sm">@{item.sellerName}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.brand} • {item.size}</p>
                </div>
                <span className="font-bold text-lg text-violet-600">${item.price}</span>
              </div>
              
              <div className="flex gap-2 mb-4">
                {item.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">#{tag}</span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t pt-3 mt-2">
                <div className="flex gap-4">
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                  <button className="text-gray-400 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-6 h-6" />
                  </button>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};