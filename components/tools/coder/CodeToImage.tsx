import React, { useState } from 'react';
import { Download, Copy, Terminal } from 'lucide-react';

const CodeToImage: React.FC = () => {
  const [code, setCode] = useState(`const hello = "world";\nfunction greet(name) {\n  return \`Hello \${name}\`;\n}`);
  const [color, setColor] = useState('bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500');
  const [padding, setPadding] = useState(64);
  const [language, setLanguage] = useState('javascript');

  const gradients = [
    'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500',
    'bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500',
    'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500',
    'bg-slate-800'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
          <Terminal size={20} /> Code to Image
        </h2>
        <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Background:</span>
            <div className="flex gap-1">
                {gradients.map(g => (
                    <button 
                        key={g} 
                        onClick={() => setColor(g)}
                        className={`w-6 h-6 rounded-full ${g} ${color === g ? 'ring-2 ring-offset-2 ring-slate-400' : ''}`}
                    />
                ))}
            </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Input Code</label>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Paste your code here..."
            />
        </div>

        <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Preview</label>
            {/* This container simulates the canvas area */}
            <div className={`w-full overflow-hidden rounded-lg flex items-center justify-center ${color}`} style={{ padding: `${padding/4}px` }}>
                <div className="w-full bg-slate-900 rounded-lg shadow-2xl overflow-hidden">
                    <div className="flex items-center px-4 py-3 bg-slate-800/50 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <pre className="font-mono text-sm text-slate-100">
                            <code>{code}</code>
                        </pre>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <p className="text-xs text-slate-500 mb-2">Note: Use your system screenshot tool or right-click to save the preview image.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CodeToImage;
