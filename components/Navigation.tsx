import React from 'react';
import { Home, ShoppingBag, PlusSquare, LayoutGrid, User, Sparkles } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.FEED, icon: Home, label: 'Feed' },
    { id: ViewState.MARKETPLACE, icon: ShoppingBag, label: 'Shop' },
    { id: ViewState.MOODBOARD, icon: Sparkles, label: 'Create' },
    { id: ViewState.IMPACT, icon: LayoutGrid, label: 'Impact' },
    { id: ViewState.COMMUNITY, icon: User, label: 'Social' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 pb-safe flex justify-between items-end z-50">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-black -translate-y-1' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {item.id === ViewState.MOODBOARD ? (
                 <div className={`p-3 rounded-full ${isActive ? 'bg-black text-white shadow-lg' : 'bg-violet-100 text-violet-600'}`}>
                    <Icon className="w-6 h-6" />
                 </div>
            ) : (
                <>
                    <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                    <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>{item.label}</span>
                </>
            )}
          </button>
        );
      })}
    </div>
  );
};