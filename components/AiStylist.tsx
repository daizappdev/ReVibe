import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { generateStyleAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AiStylistProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiStylist: React.FC<AiStylistProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hey bestie! Need help styling a vintage find or mixing patterns? Ask away! ✨' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Call Gemini API
    const advice = await generateStyleAdvice(input);
    
    setMessages(prev => [...prev, { role: 'model', text: advice }]);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose} />
      
      <div className="bg-white w-full max-w-md h-[85vh] sm:h-[600px] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col pointer-events-auto animate-slide-up relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-violet-100 p-2 rounded-full">
                <Bot className="w-6 h-6 text-violet-600" />
            </div>
            <div>
                <h3 className="font-bold text-gray-900 font-display">ReVibe Stylist</h3>
                <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
          {messages.map((msg, idx) => (
            <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
                {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-2 mt-1 shadow-sm">
                        <Sparkles className="w-4 h-4" />
                    </div>
                )}
                <div 
                    className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-violet-600 text-white rounded-tr-none shadow-md' 
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                    }`}
                >
                    {msg.text}
                </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-fade-in">
                 <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                    <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                    <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2 items-center">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask for styling tips..."
                    className="flex-1 bg-gray-100 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-violet-500 outline-none transition-all placeholder:text-gray-400"
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="bg-black text-white p-3.5 rounded-2xl hover:bg-gray-800 transition-transform active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-lg"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};