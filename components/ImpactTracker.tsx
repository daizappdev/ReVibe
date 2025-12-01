import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Droplets, Cloud, Shirt } from 'lucide-react';

const data = [
  { name: 'Jan', co2: 2.5 },
  { name: 'Feb', co2: 5.0 },
  { name: 'Mar', co2: 3.8 },
  { name: 'Apr', co2: 7.2 },
  { name: 'May', co2: 6.5 },
];

export const ImpactTracker: React.FC = () => {
  return (
    <div className="pb-20 space-y-6 px-4 pt-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-emerald-900 mb-2">Your Impact</h2>
        <p className="text-emerald-700">You're making a difference, one swap at a time.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex flex-col items-center text-center">
          <Droplets className="w-6 h-6 text-blue-500 mb-2" />
          <span className="text-2xl font-bold text-blue-900">450L</span>
          <span className="text-xs text-blue-600">Water Saved</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col items-center text-center">
          <Cloud className="w-6 h-6 text-gray-500 mb-2" />
          <span className="text-2xl font-bold text-gray-900">12kg</span>
          <span className="text-xs text-gray-600">CO2 Avoided</span>
        </div>
        <div className="bg-violet-50 p-4 rounded-2xl border border-violet-100 flex flex-col items-center text-center">
          <Shirt className="w-6 h-6 text-violet-500 mb-2" />
          <span className="text-2xl font-bold text-violet-900">8</span>
          <span className="text-xs text-violet-600">Items Rescued</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">CO2 Savings (kg)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                dy={10}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="co2" radius={[6, 6, 6, 6]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 4 ? '#10B981' : '#E5E7EB'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">Calculated based on industry averages for textile production.</p>
      </div>

      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
            <h3 className="font-bold text-lg mb-2">Next Milestone</h3>
            <div className="w-full bg-white/30 h-2 rounded-full mb-2">
                <div className="w-[75%] bg-white h-full rounded-full"></div>
            </div>
            <p className="text-sm text-emerald-100">Save 3kg more CO2 to reach "Eco Warrior" status!</p>
        </div>
        <LeafPattern className="absolute -bottom-10 -right-10 text-white/10 w-40 h-40" />
      </div>
    </div>
  );
};

const LeafPattern = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L9.5 9.5L2 12L9.5 14.5L12 22L14.5 14.5L22 12L14.5 9.5L12 2Z" />
    </svg>
);