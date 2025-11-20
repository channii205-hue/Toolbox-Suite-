import React, { useState } from 'react';
import CodeToImage from '../components/tools/coder/CodeToImage';
import RegexTester from '../components/tools/coder/RegexTester';
import DiffChecker from '../components/tools/coder/DiffChecker';
import JsonFormatter from '../components/tools/coder/JsonFormatter';
import UtilityPanel from '../components/tools/coder/UtilityPanel';
import AiCodeLab from '../components/tools/coder/AiCodeLab';
import { BrainCircuit } from 'lucide-react';

const CoderTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ai-lab');

  const tabs = [
    { id: 'ai-lab', label: 'AI Code Lab', icon: BrainCircuit },
    { id: 'carbon', label: 'Code Image' },
    { id: 'regex', label: 'Regex Tester' },
    { id: 'diff', label: 'Diff Checker' },
    { id: 'json', label: 'JSON Tools' },
    { id: 'utils', label: 'Utilities' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Coder Tools</h1>
          <p className="text-slate-500 dark:text-slate-400">Utilities for development, debugging, and AI generation.</p>
        </div>
        <div className="flex space-x-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.icon && <tab.icon size={16} />}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 min-h-[500px]">
        {activeTab === 'ai-lab' && <AiCodeLab />}
        {activeTab === 'carbon' && <CodeToImage />}
        {activeTab === 'regex' && <RegexTester />}
        {activeTab === 'diff' && <DiffChecker />}
        {activeTab === 'json' && <JsonFormatter />}
        {activeTab === 'utils' && <UtilityPanel />}
      </div>
    </div>
  );
};

export default CoderTools;