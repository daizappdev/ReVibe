export enum ViewState {
  FEED = 'FEED',
  MARKETPLACE = 'MARKETPLACE',
  MOODBOARD = 'MOODBOARD',
  COMMUNITY = 'COMMUNITY',
  IMPACT = 'IMPACT',
  PROFILE = 'PROFILE'
}

export interface FashionItem {
  id: string;
  title: string;
  price: number;
  size: string;
  brand: string;
  image: string;
  type: 'sale' | 'swap' | 'rent';
  sellerName: string;
  distance: string;
  tags: string[];
  sustainabilityScore: number; // 1-10
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  daysLeft: number;
  image: string;
  tag: string;
}

export interface CarbonStats {
  waterSaved: number; // liters
  co2Saved: number; // kg
  itemsCirculated: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}