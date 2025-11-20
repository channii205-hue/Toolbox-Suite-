import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Image as ImageIcon, Loader2, Sparkles, Globe } from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const GlobalChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm your Gemini-powered assistant. I can help with code, writing, or analyzing images. How can I help?" }
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setSelectedImage(ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!input.trim() && !selectedImage) || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, image: selectedImage || undefined };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setLoading(true);

    try {
      // Prepare history for context (excluding images for simple history to avoid complexity in this demo)
      const history = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
      }));

      const response = await chatWithGemini(userMsg.text || "Analyze this image", history, userMsg.image);
      
      setMessages(prev => [...prev, { 
          role: 'model', 
          text: response.text || "I couldn't generate a response.",
          groundingMetadata: response.grounding 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please check your API key or connection.", isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-slate-200 text-slate-800 rotate-90' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'}`}
      >
        {isOpen ? <X size={28} /> : <Sparkles size={28} />}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 transition-all duration-300 flex flex-col overflow-hidden ${isOpen ? 'opacity-100 translate-y-0 h-[600px]' : 'opacity-0 translate-y-10 pointer-events-none h-0'}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
                <Sparkles className="text-white" size={20} />
            </div>
            <div>
                <h3 className="font-bold text-white">Gemini Assistant</h3>
                <p className="text-xs text-blue-100">Powered by Gemini 3 Pro</p>
            </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                        msg.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : msg.isError 
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' 
                                : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none shadow-sm'
                    }`}>
                        {msg.image && (
                            <img src={msg.image} alt="User upload" className="w-full h-auto rounded-lg mb-2 border border-white/20" />
                        )}
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                </div>
            ))}
            {loading && (
                <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-bl-none shadow-sm">
                        <Loader2 className="animate-spin text-slate-400" size={20} />
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
            {selectedImage && (
                <div className="flex items-center gap-2 mb-2 bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">
                    <img src={selectedImage} alt="Selected" className="w-8 h-8 rounded object-cover" />
                    <span className="text-xs text-slate-500 truncate flex-1">Image attached</span>
                    <button onClick={() => setSelectedImage(null)} className="text-slate-400 hover:text-red-500"><X size={14}/></button>
                </div>
            )}
            <form onSubmit={sendMessage} className="flex gap-2">
                <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    title="Upload Image"
                >
                    <ImageIcon size={20} />
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400 text-sm"
                />
                <button 
                    type="submit" 
                    disabled={loading || (!input.trim() && !selectedImage)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
      </div>
    </>
  );
};

export default GlobalChat;
