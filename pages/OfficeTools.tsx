import React, { useState } from 'react';
import TaskManager from '../components/tools/office/TaskManager';
import Pomodoro from '../components/tools/office/Pomodoro';
import ChartGen from '../components/tools/office/ChartGen';
import ImageTools from '../components/tools/office/ImageTools';
import AiOfficeHelper from '../components/tools/office/AiOfficeHelper';
import { Bot } from 'lucide-react';

const OfficeTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ai-helper');

  const tabs = [
    { id: 'ai-helper', label: 'AI Assistant', icon: Bot },
    { id: 'tasks', label: 'Task Manager' },
    { id: 'pomodoro', label: 'Pomodoro Timer' },
    { id: 'charts', label: 'Chart Builder' },
    { id: 'images', label: 'Image Tools' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Office Tools</h1>
          <p className="text-slate-500 dark:text-slate-400">Productivity boosters and data visualization.</p>
        </div>
        <div className="flex space-x-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
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
        {activeTab === 'ai-helper' && <AiOfficeHelper />}
        {activeTab === 'tasks' && <TaskManager />}
        {activeTab === 'pomodoro' && <Pomodoro />}
        {activeTab === 'charts' && <ChartGen />}
        {activeTab === 'images' && <ImageTools />}
      </div>
    </div>
  );
};

export default OfficeTools;