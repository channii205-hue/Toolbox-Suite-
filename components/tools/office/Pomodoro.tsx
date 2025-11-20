import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Briefcase } from 'lucide-react';

const Pomodoro: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Play sound here if allowed
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      <div className="flex gap-4 bg-slate-100 dark:bg-slate-900 p-1 rounded-full">
        <button
            onClick={() => switchMode('work')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${mode === 'work' ? 'bg-white dark:bg-slate-800 text-purple-600 shadow-sm' : 'text-slate-500'}`}
        >
            <Briefcase size={18} /> Work
        </button>
        <button
            onClick={() => switchMode('break')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${mode === 'break' ? 'bg-white dark:bg-slate-800 text-emerald-600 shadow-sm' : 'text-slate-500'}`}
        >
            <Coffee size={18} /> Break
        </button>
      </div>

      <div className={`text-9xl font-mono font-bold tracking-tighter ${mode === 'work' ? 'text-slate-800 dark:text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-4">
        <button 
            onClick={toggleTimer}
            className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:scale-110 transition-transform"
        >
            {isRunning ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1"/>}
        </button>
        <button 
            onClick={resetTimer}
            className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
            <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
