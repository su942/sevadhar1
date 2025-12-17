
import React, { useState } from 'react';
import { Send, Phone, ArrowLeft, MoreVertical, Image as ImageIcon } from 'lucide-react';

interface ChatWindowProps {
  partnerName: string;
  onClose: () => void;
}

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'partner';
    time: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ partnerName, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
      { id: '1', text: 'Hello, I have booked your service.', sender: 'user', time: '10:00 AM' },
      { id: '2', text: 'Namaskar! I am on my way.', sender: 'partner', time: '10:02 AM' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
      if(!inputText.trim()) return;
      const newMsg: Message = {
          id: Date.now().toString(),
          text: inputText,
          sender: 'user',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setInputText('');
      
      // Auto reply mock
      setTimeout(() => {
          setMessages(prev => [...prev, {
              id: Date.now().toString(),
              text: 'Okay, noted.',
              sender: 'partner',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
      }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={20}/></button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 leading-none">{partnerName}</h3>
                        <span className="text-xs text-green-500 font-medium">Online</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"><Phone size={20}/></button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"><MoreVertical size={20}/></button>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                        msg.sender === 'user' 
                        ? 'bg-[#FF6B35] text-white rounded-tr-none shadow-orange-100' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
                    }`}>
                        <p>{msg.text}</p>
                        <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-orange-200' : 'text-gray-400'}`}>{msg.time}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-100 bg-white flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                <ImageIcon size={24} />
            </button>
            <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="p-3 bg-[#FF6B35] text-white rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-100"
            >
                <Send size={20} />
            </button>
        </div>
    </div>
  );
};

export default ChatWindow;
