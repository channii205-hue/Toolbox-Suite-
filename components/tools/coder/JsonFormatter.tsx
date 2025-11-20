import React, { useState } from 'react';
import { Braces, Copy, Check } from 'lucide-react';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('{"key": "value", "array": [1,2,3]}');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      const obj = JSON.parse(input);
      setInput(JSON.stringify(obj, null, 2));
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const minify = () => {
    try {
      const obj = JSON.parse(input);
      setInput(JSON.stringify(obj));
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <Braces size={20} className="text-blue-500" /> JSON Formatter
        </h2>
        <div className="flex gap-2">
            <button onClick={format} className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Prettify</button>
            <button onClick={minify} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-sm rounded hover:bg-slate-300">Minify</button>
            <button onClick={copyToClipboard} className="p-1.5 text-slate-500 hover:text-blue-600 transition-colors">
                {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm rounded-lg">
            Error: {error}
        </div>
      )}

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-96 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        spellCheck={false}
      />
    </div>
  );
};

export default JsonFormatter;
