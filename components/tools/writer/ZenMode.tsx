import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, Minimize2, Save } from 'lucide-react';

const ZenMode: React.FC = () => {
  const [content, setContent] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        containerRef.current?.requestFullscreen().catch(err => console.error(err));
        setIsFullScreen(true);
    } else {
        document.exitFullscreen();
        setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const handleChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  return (
    <div ref={containerRef} className={`flex flex-col ${isFullScreen ? 'fixed inset-0 z-50 bg-white dark:bg-slate-900 p-8' : 'h-[500px]'}`}>
      <div className={`flex justify-between items-center mb-4 ${isFullScreen ? 'opacity-0 hover:opacity-100 transition-opacity' : ''}`}>
        <h2 className="text-lg font-semibold text-slate-400">Zen Mode</h2>
        <div className="flex gap-2">
            <button onClick={() => alert('Saved to local storage')} className="p-2 text-slate-400 hover:text-emerald-500"><Save size={20}/></button>
            <button onClick={toggleFullScreen} className="p-2 text-slate-400 hover:text-blue-500">
                {isFullScreen ? <Minimize2 size={20}/> : <Maximize2 size={20}/>}
            </button>
        </div>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 w-full resize-none bg-transparent outline-none text-slate-800 dark:text-slate-200 text-lg leading-relaxed p-4 max-w-3xl mx-auto focus:ring-0 border-none"
        placeholder="Just write..."
      />
    </div>
  );
};

export default ZenMode;
