import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { PieChart as IconPie, BarChart as IconBar, FileText } from 'lucide-react';
import { CsvDataPoint } from '../../../types';

const ChartGen: React.FC = () => {
  const [data, setData] = useState<CsvDataPoint[]>([
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 }
  ]);
  const [csvInput, setCsvInput] = useState('name,value\nJan,400\nFeb,300\nMar,600\nApr,800\nMay,500');
  const [chartType, setChartType] = useState<'line' | 'bar'>('bar');

  const parseCsv = (input: string) => {
    try {
        const lines = input.trim().split('\n');
        const headers = lines[0].split(',');
        const parsed = lines.slice(1).map(line => {
            const values = line.split(',');
            return {
                name: values[0],
                value: parseFloat(values[1]) || 0
            };
        });
        setData(parsed);
    } catch (e) {
        alert("Invalid CSV format");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCsvInput(e.target.value);
      parseCsv(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
         <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <IconPie size={20} className="text-pink-500" /> Simple Chart Generator
        </h2>
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
            <button onClick={() => setChartType('bar')} className={`p-2 rounded ${chartType === 'bar' ? 'bg-white dark:bg-slate-700 shadow' : ''}`}><IconBar size={18}/></button>
            <button onClick={() => setChartType('line')} className={`p-2 rounded ${chartType === 'line' ? 'bg-white dark:bg-slate-700 shadow' : ''}`}><IconPie size={18}/></button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <FileText size={16}/> CSV Data (name, value)
            </label>
            <textarea 
                value={csvInput}
                onChange={handleInputChange}
                className="w-full h-64 p-3 font-mono text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="name,value&#10;A,10&#10;B,20"
            />
        </div>
        
        <div className="col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-4 min-h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
                {chartType === 'bar' ? (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip 
                            contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} 
                            cursor={{fill: 'transparent'}}
                        />
                        <Bar dataKey="value" fill="#ec4899" radius={[4, 4, 0, 0]} />
                    </BarChart>
                ) : (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" stroke="#888888" />
                        <YAxis stroke="#888888" />
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', color: '#fff' }} />
                        <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                )}
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartGen;
