import React, { useState } from 'react';
import { BrainCircuit, Bug, Lightbulb, Code2, Loader2 } from 'lucide-react';
import { thinkingCodeTask } from '../../../services/geminiService';

type Mode = 'explain' | 'debug' | 'optimize' | 'generate';

const AiCodeLab: React.FC = () => {
  const [mode, setMode] = useState<Mode>('explain');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput('');

    let prompt = '';
    if (mode === 'explain') {
      prompt = `Explain the following code in detail. Break down complex parts:\n\n${input}`;
    } else if (mode === 'debug') {
      prompt = `Analyze the following code for bugs, potential runtime errors, and logical flaws. Provide a list of issues and the corrected code:\n\n${input}`;
    } else if (mode === 'optimize') {
      prompt = `Optimize the following code for performance and readability. Explain the improvements:\n\n${input}`;
    } else if (mode === 'generate') {
      prompt = `Write code to accomplish the following task. Include comments:\n\n${input}`;
    }

    const result = await thinkingCodeTask(prompt);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4 gap-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
          <BrainCircuit size={24} className="text-purple-600" /> 
          AI Code Lab <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Thinking Mode</span>
        </h2>
        
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg overflow-x-auto">
          <button onClick={() => setMode('explain')} className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm whitespace-nowrap ${mode === 'explain' ? 'bg-white dark:bg-slate-700 text-purple-600 shadow' : 'text-slate-500'}`}>
             <Lightbulb size={14}/> Explain
          </button>
          <button onClick={() => setMode('debug')} className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm whitespace-nowrap ${mode === 'debug' ? 'bg-white dark:bg-slate-700 text-red-500 shadow' : 'text-slate-500'}`}>
             <Bug size={14}/> Debug
          </button>
          <button onClick={() => setMode('optimize')} className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm whitespace-nowrap ${mode === 'optimize' ? 'bg-white dark:bg-slate-700 text-emerald-500 shadow' : 'text-slate-500'}`}>
             <Code2 size={14}/> Optimize
          </button>
          <button onClick={() => setMode('generate')} className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm whitespace-nowrap ${mode === 'generate' ? 'bg-white dark:bg-slate-700 text-blue-500 shadow' : 'text-slate-500'}`}>
             <BrainCircuit size={14}/> Generate
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col h-[500px]">
           <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
             {mode === 'generate' ? 'Describe the code you want:' : 'Paste Code Here:'}
           </label>
           <textarea
             value={input}
             onChange={(e) => setInput(e.target.value)}
             className="flex-1 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 resize-none"
             placeholder={mode === 'generate' ? "e.g., Create a React component for a countdown timer..." : "// Paste code..."}
           />
           <button 
             onClick={handleAction}
             disabled={loading || !input}
             className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
           >
             {loading ? <Loader2 className="animate-spin" /> : <BrainCircuit size={18} />}
             {loading ? 'Thinking...' : 'Run AI Analysis'}
           </button>
        </div>

        <div className="flex flex-col h-[500px]">
           <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">AI Output</label>
           <div className="flex-1 p-4 bg-slate-900 text-slate-200 font-mono text-sm rounded-lg overflow-auto border border-slate-700">
             {output ? (
               <pre className="whitespace-pre-wrap">{output}</pre>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                 <BrainCircuit size={48} className="mb-4" />
                 <p>Results will appear here</p>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AiCodeLab;