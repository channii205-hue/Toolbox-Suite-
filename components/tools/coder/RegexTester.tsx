import React, { useState } from 'react';
import { explainRegex } from '../../../services/geminiService';
import { Zap, AlertCircle, CheckCircle } from 'lucide-react';

const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('([A-Z])\\w+');
  const [text, setText] = useState('Hello World this is a Test');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  let matchResult = null;
  let isValid = true;
  let matches: RegExpMatchArray | null = null;

  try {
    const regex = new RegExp(pattern, 'g');
    matches = text.match(regex);
  } catch (e) {
    isValid = false;
  }

  const handleExplain = async () => {
    setLoading(true);
    const result = await explainRegex(pattern, text);
    setExplanation(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <Zap size={20} className="text-yellow-500" /> Regex Tester
        </h2>
        <button 
            onClick={handleExplain}
            disabled={loading}
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
            {loading ? 'Analyzing...' : 'AI Explain'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Regular Expression</label>
            <div className="relative">
                <input
                    type="text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className={`w-full p-3 font-mono text-sm bg-slate-50 dark:bg-slate-900 border rounded-lg outline-none focus:ring-2 ${isValid ? 'border-slate-200 dark:border-slate-700 focus:ring-blue-500' : 'border-red-500 focus:ring-red-500'}`}
                />
                {!isValid && <AlertCircle className="absolute right-3 top-3 text-red-500" size={20} />}
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Test String</label>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-32 p-3 font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Matches</h3>
            {matches ? (
                <div className="flex flex-wrap gap-2">
                    {Array.from(matches).map((m, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm font-mono">
                            {m}
                        </span>
                    ))}
                    <span className="text-xs text-slate-500 self-center ml-2">{matches.length} matches found</span>
                </div>
            ) : (
                <span className="text-sm text-slate-500 italic">No matches found</span>
            )}
        </div>

        {explanation && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 animate-fade-in">
                <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">AI Explanation</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{explanation}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default RegexTester;
