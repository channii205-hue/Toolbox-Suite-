import React, { useState } from 'react';
import { PenLine, Sparkles, Loader2, Layers } from 'lucide-react';
import { fastTextTask } from '../../../services/geminiService';

const AiContentGen: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'generate' | 'tone'>('generate');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState('Professional');

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    
    let prompt = '';
    let system = '';

    if (activeMode === 'generate') {
        prompt = `Generate content based on this request: ${input}`;
        system = "You are a creative professional writer. Generate high-quality, engaging content.";
    } else {
        prompt = `Rewrite the following text to have a ${tone} tone: "${input}"`;
        system = "You are an expert editor. Maintain the original meaning but drastically change the tone.";
    }

    const res = await fastTextTask(prompt, system);
    setOutput(res);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4 gap-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <PenLine size={24} className="text-emerald-600" /> Content Studio
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Fast Lite</span>
        </h2>
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
             <button 
                onClick={() => setActiveMode('generate')} 
                className={`px-4 py-1.5 rounded-md text-sm ${activeMode === 'generate' ? 'bg-white dark:bg-slate-700 shadow text-emerald-600' : 'text-slate-500'}`}
            >
                Generator
             </button>
             <button 
                onClick={() => setActiveMode('tone')} 
                className={`px-4 py-1.5 rounded-md text-sm ${activeMode === 'tone' ? 'bg-white dark:bg-slate-700 shadow text-emerald-600' : 'text-slate-500'}`}
            >
                Tone Switcher
             </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
            {activeMode === 'tone' && (
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Tone</label>
                    <select 
                        value={tone} 
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                    >
                        <option>Professional</option>
                        <option>Casual</option>
                        <option>Humorous</option>
                        <option>Academic</option>
                        <option>Persuasive</option>
                        <option>Dramatic</option>
                    </select>
                </div>
            )}
            
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {activeMode === 'generate' ? 'What should I write?' : 'Original Text'}
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-64 p-4 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    placeholder={activeMode === 'generate' ? "e.g., A blog post about the benefits of coffee..." : "Paste text here..."}
                />
            </div>

            <button 
                onClick={handleGenerate}
                disabled={loading || !input}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                {activeMode === 'generate' ? 'Generate Content' : 'Rewrite Text'}
            </button>
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Result</label>
            <div className="w-full h-full min-h-[300px] p-6 text-sm bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg overflow-y-auto leading-relaxed prose dark:prose-invert">
                {output ? (
                    <div className="whitespace-pre-wrap">{output}</div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 italic">
                        <Layers size={40} className="mb-2 opacity-20"/>
                        AI generated content will appear here
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AiContentGen;