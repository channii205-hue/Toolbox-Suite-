import React, { useState } from 'react';
import { Mail, FileText, Table, Search, Loader2, ExternalLink } from 'lucide-react';
import { fastTextTask, searchGroundedQuery } from '../../../services/geminiService';

type Mode = 'email' | 'summary' | 'formula' | 'search';

const AiOfficeHelper: React.FC = () => {
  const [mode, setMode] = useState<Mode>('search');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput('');
    setSources([]);

    if (mode === 'search') {
        const res = await searchGroundedQuery(input);
        setOutput(res.text);
        setSources(res.sources);
    } else {
        let prompt = '';
        let system = '';
        
        if (mode === 'email') {
            prompt = `Write a professional email based on these details: ${input}`;
            system = "You are an executive assistant.";
        } else if (mode === 'summary') {
            prompt = `Summarize these meeting notes/text into bullet points:\n\n${input}`;
            system = "You are a concise note-taker.";
        } else if (mode === 'formula') {
            prompt = `Write a spreadsheet formula (Excel/Sheets) to: ${input}. Explain it briefly.`;
            system = "You are a spreadsheet expert.";
        }

        const res = await fastTextTask(prompt, system);
        setOutput(res);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4 gap-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <FileText size={24} className="text-purple-600" /> Office Assistant
        </h2>
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg overflow-x-auto">
             <button onClick={() => setMode('search')} className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm whitespace-nowrap ${mode === 'search' ? 'bg-white dark:bg-slate-700 shadow text-blue-600' : 'text-slate-500'}`}><Search size={14}/> Smart Search</button>
             <button onClick={() => setMode('email')} className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm whitespace-nowrap ${mode === 'email' ? 'bg-white dark:bg-slate-700 shadow text-purple-600' : 'text-slate-500'}`}><Mail size={14}/> Email Writer</button>
             <button onClick={() => setMode('summary')} className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm whitespace-nowrap ${mode === 'summary' ? 'bg-white dark:bg-slate-700 shadow text-purple-600' : 'text-slate-500'}`}><FileText size={14}/> Summarizer</button>
             <button onClick={() => setMode('formula')} className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm whitespace-nowrap ${mode === 'formula' ? 'bg-white dark:bg-slate-700 shadow text-green-600' : 'text-slate-500'}`}><Table size={14}/> Excel Helper</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {mode === 'search' ? 'Ask a question (uses Google Search):' : 
                 mode === 'email' ? 'Describe the email (recipient, tone, topic):' :
                 mode === 'summary' ? 'Paste text to summarize:' : 'Describe what you need to calculate:'}
            </label>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-4 min-h-[200px] text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Enter details..."
            />
            <button 
                onClick={handleAction}
                disabled={loading || !input}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {loading ? <Loader2 className="animate-spin" /> : mode === 'search' ? <Search size={18}/> : <FileText size={18}/>}
                {mode === 'search' ? 'Search' : 'Generate'}
            </button>
        </div>

        <div className="flex flex-col h-full min-h-[300px]">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Result</label>
            <div className="flex-1 p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg overflow-y-auto">
                {output ? (
                    <div className="space-y-4">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 dark:text-slate-200">{output}</div>
                        {sources.length > 0 && (
                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sources</h4>
                                <div className="space-y-1">
                                    {sources.map((source, idx) => (
                                        <a key={idx} href={source.uri} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline truncate">
                                            <ExternalLink size={10} /> {source.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <p className="italic">Output will appear here</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AiOfficeHelper;