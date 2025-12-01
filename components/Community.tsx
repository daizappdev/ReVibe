import React from 'react';
import { Users, Calendar, Trophy, ChevronRight } from 'lucide-react';
import { Challenge } from '../types';

interface CommunityProps {
  challenges: Challenge[];
}

export const Community: React.FC<CommunityProps> = ({ challenges }) => {
  return (
    <div className="pb-20 px-4 pt-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Community</h2>
        
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="bg-violet-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">Local Meetup</h3>
                    <p className="text-xs text-gray-500">Brooklyn, NY • 2.5mi away</p>
                </div>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold">Join</button>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" /> Active Challenges
        </h3>
        
        <div className="space-y-4">
            {challenges.map(challenge => (
                <div key={challenge.id} className="relative rounded-2xl overflow-hidden h-48 group">
                    <img 
                        src={challenge.image} 
                        alt={challenge.title} 
                        className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5 text-white">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{challenge.tag}</span>
                            <span className="text-xs text-gray-300 flex items-center gap-1"><Calendar className="w-3 h-3" /> {challenge.daysLeft} days left</span>
                        </div>
                        <h4 className="font-bold text-xl mb-1">{challenge.title}</h4>
                        <p className="text-sm text-gray-200 line-clamp-1">{challenge.description}</p>
                        <div className="mt-3 flex items-center text-xs font-medium">
                            <div className="flex -space-x-2 mr-2">
                                <div className="w-6 h-6 rounded-full bg-gray-400 border border-black"></div>
                                <div className="w-6 h-6 rounded-full bg-gray-300 border border-black"></div>
                                <div className="w-6 h-6 rounded-full bg-gray-200 border border-black"></div>
                            </div>
                            +{challenge.participants} joined
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-bold text-orange-900 text-lg mb-2">Host a Swap Party</h3>
        <p className="text-orange-800 text-sm mb-4">Get the toolkit to host a local clothing swap with your friends.</p>
        <button className="flex items-center gap-1 text-orange-700 font-bold text-sm hover:gap-2 transition-all">
            Get Started <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};