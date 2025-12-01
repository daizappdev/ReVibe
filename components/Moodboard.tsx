import React, { useState } from 'react';
import { Sparkles, Plus, Share, X, Wand2 } from 'lucide-react';
import { FashionItem } from '../types';
import { generateOutfitDescription } from '../services/geminiService';

interface MoodboardProps {
  items: FashionItem[];
}

export const Moodboard: React.FC<MoodboardProps> = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState<FashionItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiCaption, setAiCaption] = useState<string>('');

  const toggleItem = (item: FashionItem) => {
    if (selectedItems.find(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      if (selectedItems.length < 5) {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };

  const handleGenerateCaption = async () => {
    if (selectedItems.length === 0) return;
    setIsGenerating(true);
    const caption = await generateOutfitDescription(selectedItems.map(i => i.title));
    setAiCaption(caption);
    setIsGenerating(false);
  };

  return (
    <div className="pb-20 h-full flex flex-col">
      <div className="px-4 py-6 bg-white border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Style Canvas <Sparkles className="w-5 h-5 text-violet-500" />
        </h2>
        <p className="text-gray-500 text-sm">Mix & match to create your digital fit.</p>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-gray-50 m-4 rounded-2xl border-2 border-dashed border-gray-200 relative min-h-[300px] flex flex-col items-center justify-center p-4">
        {selectedItems.length === 0 ? (
          <div className="text-center text-gray-400">
            <Plus className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Tap items below to add to canvas</p>
          </div>
        ) : (
          <div className="w-full h-full relative">
             <div className="flex flex-wrap items-center justify-center gap-4">
                {selectedItems.map((item, idx) => (
                    <div key={item.id} className="relative group">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl shadow-lg rotate-1 hover:rotate-0 transition-transform"
                            style={{ transform: `rotate(${idx % 2 === 0 ? '2deg' : '-2deg'})`}}
                        />
                        <button 
                            onClick={(e) => { e.stopPropagation(); toggleItem(item); }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
             </div>
             
             <div className="mt-8 w-full">
                {aiCaption && (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-violet-100 mb-4 animate-fade-in">
                        <p className="text-sm text-gray-800 font-medium italic">"{aiCaption}"</p>
                    </div>
                )}
                
                <div className="flex gap-2 justify-center">
                    <button 
                        onClick={handleGenerateCaption}
                        disabled={isGenerating}
                        className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-violet-700 transition-colors disabled:opacity-50"
                    >
                        {isGenerating ? 'Thinking...' : <><Wand2 className="w-4 h-4" /> AI Caption</>}
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50">
                        <Share className="w-4 h-4" /> Share
                    </button>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Item Picker */}
      <div className="px-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Wardrobe</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {items.map(item => (
            <div 
                key={item.id} 
                onClick={() => toggleItem(item)}
                className={`flex-shrink-0 w-20 cursor-pointer transition-opacity ${selectedItems.find(i => i.id === item.id) ? 'opacity-40' : 'opacity-100'}`}
            >
              <img src={item.image} alt={item.title} className="w-20 h-20 rounded-lg object-cover border border-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};