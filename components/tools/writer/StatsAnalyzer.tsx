import React, { useState, useEffect } from 'react';
import { BarChart2, Clock } from 'lucide-react';

const StatsAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    chars: 0,
    sentences: 0,
    paragraphs: 0,
    readTime: 0
  });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;
    const readTime = Math.ceil(words / 200); // Avg 200 wpm

    setStats({ words, chars, sentences, paragraphs, readTime });
  }, [text]);

  return (
    <div className="space-y-6">
       <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <BarChart2 size={20} className="text-blue-500" /> Text Statistics
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-center border border-slate-100 dark:border-slate-700">
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats.words}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Words</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-center border border-slate-100 dark:border-slate-700">
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats.chars}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Chars</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-center border border-slate-100 dark:border-slate-700">
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats.sentences}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Sentences</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-center border border-slate-100 dark:border-slate-700">
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats.paragraphs}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Paragraphs</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center border border-blue-100 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                {stats.readTime} <span className="text-sm">min</span>
            </div>
            <div className="text-xs text-blue-500 uppercase tracking-wider flex items-center justify-center gap-1">
                <Clock size={12} /> Read Time
            </div>
        </div>
      </div>

      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-64 p-4 text-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start writing here..."
      />
    </div>
  );
};

export default StatsAnalyzer;
