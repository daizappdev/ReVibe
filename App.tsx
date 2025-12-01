import React, { useState } from 'react';
import { ViewState, FashionItem, Challenge } from './types';
import { Feed } from './components/Feed';
import { Marketplace } from './components/Marketplace';
import { Moodboard } from './components/Moodboard';
import { ImpactTracker } from './components/ImpactTracker';
import { Community } from './components/Community';
import { Navigation } from './components/Navigation';
import { AiStylist } from './components/AiStylist';
import { Sparkles } from 'lucide-react';

// Mock Data
const MOCK_ITEMS: FashionItem[] = [
  {
    id: '1',
    title: 'Vintage 90s Oversized Denim Jacket',
    price: 45,
    size: 'L',
    brand: 'Levi\'s',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    sellerName: 'eco_sophia',
    distance: '2.5mi',
    tags: ['vintage', 'denim', '90s'],
    sustainabilityScore: 9
  },
  {
    id: '2',
    title: 'Upcycled Patchwork Mini Skirt',
    price: 32,
    size: 'M',
    brand: 'Handmade',
    image: 'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'swap',
    sellerName: 'creative_cat',
    distance: '0.8mi',
    tags: ['upcycled', 'unique', 'y2k'],
    sustainabilityScore: 10
  },
  {
    id: '3',
    title: 'Chunky Knit Cream Sweater',
    price: 28,
    size: 'S',
    brand: 'Thrifted',
    image: 'https://images.unsplash.com/photo-1624835655648-5c42502844a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    sellerName: 'cozy_corner',
    distance: '5mi',
    tags: ['cottagecore', 'winter', 'knit'],
    sustainabilityScore: 8
  },
  {
    id: '4',
    title: 'Dr. Martens Jadon Boots',
    price: 120,
    size: 'US 8',
    brand: 'Dr. Martens',
    image: 'https://images.unsplash.com/photo-1605763240004-7b93b172d7d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    sellerName: 'punk_pixie',
    distance: '1.2mi',
    tags: ['grunge', 'boots', 'leather'],
    sustainabilityScore: 7
  },
  {
    id: '5',
    title: 'Floral Midi Dress',
    price: 0,
    size: 'M',
    brand: 'Reformation',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'swap',
    sellerName: 'luna_love',
    distance: '3mi',
    tags: ['floral', 'summer', 'dress'],
    sustainabilityScore: 8
  }
];

const MOCK_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'The Denim Upcycle',
    description: 'Transform old jeans into something new! Best flip wins a vintage gift card.',
    participants: 124,
    daysLeft: 5,
    image: 'https://images.unsplash.com/photo-1542272617-08f08630329e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tag: 'Upcycle'
  },
  {
    id: '2',
    title: 'Monochrome Magic',
    description: 'Create a full outfit using only one color palette from your thrift finds.',
    participants: 89,
    daysLeft: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tag: 'Styling'
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.FEED);
  const [isStylistOpen, setIsStylistOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case ViewState.FEED:
        return <Feed items={MOCK_ITEMS} />;
      case ViewState.MARKETPLACE:
        return <Marketplace items={MOCK_ITEMS} />;
      case ViewState.MOODBOARD:
        return <Moodboard items={MOCK_ITEMS} />;
      case ViewState.IMPACT:
        return <ImpactTracker />;
      case ViewState.COMMUNITY:
        return <Community challenges={MOCK_CHALLENGES} />;
      default:
        return <Feed items={MOCK_ITEMS} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative shadow-2xl overflow-hidden font-sans">
      {/* Main Content Area */}
      <main className="h-full overflow-y-auto no-scrollbar scroll-smooth">
        {renderView()}
      </main>

      {/* AI Stylist FAB */}
      <button 
        onClick={() => setIsStylistOpen(true)}
        className="fixed bottom-24 right-4 z-40 bg-black text-white p-3.5 rounded-full shadow-xl hover:scale-105 transition-transform animate-bounce-subtle border border-gray-800"
        aria-label="Open AI Stylist"
      >
        <Sparkles className="w-6 h-6 text-violet-300" />
      </button>

      {/* Navigation */}
      <Navigation currentView={currentView} setView={setCurrentView} />

      {/* AI Stylist Modal */}
      <AiStylist isOpen={isStylistOpen} onClose={() => setIsStylistOpen(false)} />
    </div>
  );
}