import React from 'react';
import { Link } from 'react-router-dom';
import { Code, PenTool, Briefcase, ArrowRight, Cpu, FileText, PieChart } from 'lucide-react';

const Home: React.FC = () => {
  const cards = [
    {
      title: 'For Coders',
      description: 'Generate clean code snippets, test Regex, format JSON, and hash data securely.',
      icon: Code,
      path: '/coder',
      color: 'bg-blue-500',
      features: ['Carbon-style Images', 'Diff Checker', 'JSON Formatter']
    },
    {
      title: 'For Writers',
      description: 'Enhance your writing with AI grammar checks, paraphrasing, and readability analysis.',
      icon: PenTool,
      path: '/writer',
      color: 'bg-emerald-500',
      features: ['AI Grammar Check', 'Zen Mode', 'Headline Gen']
    },
    {
      title: 'For Office',
      description: 'Productivity tools including task management, image compression, and data visualization.',
      icon: Briefcase,
      path: '/office',
      color: 'bg-purple-500',
      features: ['Task Manager', 'Chart Generator', 'Image Tools']
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Your All-in-One <span className="text-blue-600 dark:text-blue-400">Digital Workspace</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          A suite of powerful, privacy-focused tools designed for developers, content creators, and professionals. No backend, secure, and fast.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link 
            key={card.path} 
            to={card.path}
            className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:-translate-y-1"
          >
            <div className={`w-12 h-12 rounded-xl ${card.color} text-white flex items-center justify-center mb-6 shadow-lg`}>
              <card.icon size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{card.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {card.description}
            </p>
            <div className="space-y-2 mb-6">
              {card.features.map(f => (
                <div key={f} className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 mr-2"></div>
                  {f}
                </div>
              ))}
            </div>
            <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-2 transition-all">
              Open Tools <ArrowRight size={18} className="ml-2" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-center gap-4">
           <Cpu className="text-blue-600" />
           <div>
             <h3 className="font-bold text-slate-800 dark:text-slate-200">Fast & Local</h3>
             <p className="text-sm text-slate-600 dark:text-slate-400">Client-side execution</p>
           </div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl flex items-center gap-4">
           <FileText className="text-emerald-600" />
           <div>
             <h3 className="font-bold text-slate-800 dark:text-slate-200">Export Ready</h3>
             <p className="text-sm text-slate-600 dark:text-slate-400">PNG, JSON, TXT Support</p>
           </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl flex items-center gap-4">
           <PieChart className="text-purple-600" />
           <div>
             <h3 className="font-bold text-slate-800 dark:text-slate-200">Visualization</h3>
             <p className="text-sm text-slate-600 dark:text-slate-400">Instant Charts</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
