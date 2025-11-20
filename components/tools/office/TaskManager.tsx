import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckSquare, Square } from 'lucide-react';
import { Task } from '../../../types';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('toolbox-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('toolbox-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
         <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <CheckSquare size={20} className="text-purple-500" /> Task Manager
        </h2>
        <span className="text-sm text-slate-500">{tasks.filter(t => t.completed).length}/{tasks.length} done</span>
      </div>

      <form onSubmit={addTask} className="flex gap-2">
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors">
            <Plus size={24} />
        </button>
      </form>

      <div className="space-y-2">
        {tasks.length === 0 && (
            <p className="text-center text-slate-400 py-8">No tasks yet. Get productive!</p>
        )}
        {tasks.map(task => (
            <div key={task.id} className={`flex items-center justify-between p-4 rounded-lg border transition-all ${task.completed ? 'bg-slate-50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800 opacity-70' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm'}`}>
                <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => toggleTask(task.id)}>
                    {task.completed ? <CheckSquare className="text-purple-500" size={20} /> : <Square className="text-slate-400" size={20} />}
                    <span className={`${task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>{task.text}</span>
                </div>
                <button onClick={() => deleteTask(task.id)} className="text-slate-400 hover:text-red-500 p-1">
                    <Trash2 size={18} />
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
