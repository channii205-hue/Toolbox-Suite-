import React, { useState } from 'react';
import ZenMode from '../components/tools/writer/ZenMode';
import AiWriter from '../components/tools/writer/AiWriter';
import StatsAnalyzer from '../components/tools/writer/StatsAnalyzer';
import AiContentGen from '../components/tools/writer/AiContentGen';
import { Sparkles } from 'lucide-react';

const WriterTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ai-gen');

  const tabs = [
    { id: 'ai-gen', label: 'Content Studio', icon: Sparkles },
    { id: 'ai', label: 'Quick Fixes' },
    { id: 'stats', label: 'Readability & Stats' },
    { id: 'zen', label: 'Zen Mode' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Writer Tools</h1>
          <p className="text-slate-500 dark:text-slate-400">Enhance your content with AI and analytics.</p>
        </div>
        <div className="flex space-x-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.icon && <tab.icon size={16}/>}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 min-h-[500px]">
        {activeTab === 'ai-gen' && <AiContentGen />}
        {activeTab === 'ai' && <AiWriter />}
        {activeTab === 'zen' && <ZenMode />}
        {activeTab === 'stats' && <StatsAnalyzer />}
      </div>
    </div>
  );
};

export default WriterTools;