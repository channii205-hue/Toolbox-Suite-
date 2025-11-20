import React, { useState } from 'react';
import { Sparkles, Wand2, Type } from 'lucide-react';
import { checkGrammar, paraphraseText, generateTitles } from '../../../services/geminiService';

const AiWriter: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'grammar' | 'paraphrase' | 'titles'>('grammar');

  const handleAction = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult('');

    if (mode === 'grammar') {
        const res = await checkGrammar(text);
        setResult(res);
    } else if (mode === 'paraphrase') {
        const res = await paraphraseText(text, 'formal');
        setResult(res);
    } else if (mode === 'titles') {
        const res = await generateTitles(text);
        setResult(res.join('\n'));
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
         <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <Sparkles size={20} className="text-emerald-500" /> AI Assistant
        </h2>
        <div className="flex gap-2 text-sm">
            <button onClick={() => setMode('grammar')} className={`px-3 py-1 rounded-full border ${mode === 'grammar' ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-300' : 'border-slate-200 dark:border-slate-700'}`}>Fix Grammar</button>
            <button onClick={() => setMode('paraphrase')} className={`px-3 py-1 rounded-full border ${mode === 'paraphrase' ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300' : 'border-slate-200 dark:border-slate-700'}`}>Paraphrase</button>
            <button onClick={() => setMode('titles')} className={`px-3 py-1 rounded-full border ${mode === 'titles' ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500 text-purple-700 dark:text-purple-300' : 'border-slate-200 dark:border-slate-700'}`}>Gen Titles</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Input Text</label>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-64 p-4 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                placeholder="Type or paste your text here..."
            />
            <button 
                onClick={handleAction}
                disabled={loading || !text}
                className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
                {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/> : <Wand2 size={18}/>}
                {mode === 'grammar' ? 'Fix Errors' : mode === 'paraphrase' ? 'Rewrite' : 'Generate Ideas'}
            </button>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Result</label>
            <div className="w-full h-64 p-4 text-sm bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg overflow-y-auto">
                {result ? (
                    <pre className="whitespace-pre-wrap font-sans text-slate-800 dark:text-slate-200">{result}</pre>
                ) : (
                    <span className="text-slate-400 italic">AI results will appear here...</span>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AiWriter;
