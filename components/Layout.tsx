import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import GlobalChat from './GlobalChat';
import { Menu, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/coder': return 'Coder Tools';
      case '/writer': return 'Writer Tools';
      case '/office': return 'Office Tools';
      default: return 'Dashboard';
    }
  };

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun size={20} />;
    if (theme === 'dark') return <Moon size={20} />;
    return <Monitor size={20} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 font-sans">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <GlobalChat />

      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="mr-4 lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-slate-800 dark:text-white">{getTitle()}</h1>
          </div>

          <div className="flex items-center gap-2">
             <button
              onClick={cycleTheme}
              className="flex items-center gap-2 p-2 px-3 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              title={`Current theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
            >
              {getThemeIcon()}
              <span className="text-xs font-medium hidden md:block capitalize">{theme}</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
