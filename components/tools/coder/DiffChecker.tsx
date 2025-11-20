import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const DiffChecker: React.FC = () => {
  const [text1, setText1] = useState('The quick brown fox\njumps over the lazy dog');
  const [text2, setText2] = useState('The quick red fox\nwalks over the lazy dog');

  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const maxLines = Math.max(lines1.length, lines2.length);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-4">
        <ArrowRightLeft size={20} className="text-purple-500" />
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Diff Checker</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <textarea 
            value={text1} 
            onChange={(e) => setText1(e.target.value)}
            className="w-full h-32 p-2 text-xs font-mono border rounded dark:bg-slate-900 dark:border-slate-700"
            placeholder="Original Text"
        />
        <textarea 
            value={text2} 
            onChange={(e) => setText2(e.target.value)}
            className="w-full h-32 p-2 text-xs font-mono border rounded dark:bg-slate-900 dark:border-slate-700"
            placeholder="Changed Text"
        />
      </div>

      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold p-2 border-b border-slate-200 dark:border-slate-700">
              <div>Original</div>
              <div>Modified</div>
          </div>
          <div className="font-mono text-xs bg-white dark:bg-slate-900 max-h-96 overflow-y-auto">
              {Array.from({ length: maxLines }).map((_, i) => {
                  const l1 = lines1[i] || '';
                  const l2 = lines2[i] || '';
                  const isDiff = l1 !== l2;
                  return (
                      <div key={i} className={`grid grid-cols-2 ${isDiff ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                          <div className={`p-1 border-r border-slate-100 dark:border-slate-800 ${isDiff ? 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-200' : 'text-slate-600 dark:text-slate-400'}`}>
                             <span className="select-none text-slate-300 mr-2 w-4 inline-block text-right">{i + 1}</span> {l1}
                          </div>
                          <div className={`p-1 ${isDiff ? 'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-200' : 'text-slate-600 dark:text-slate-400'}`}>
                             <span className="select-none text-slate-300 mr-2 w-4 inline-block text-right">{i + 1}</span> {l2}
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>
    </div>
  );
};

export default DiffChecker;
