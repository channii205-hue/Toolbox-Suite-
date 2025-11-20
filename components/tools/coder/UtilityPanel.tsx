import React, { useState, useEffect } from 'react';
import { Shield, Repeat } from 'lucide-react';

const UtilityPanel: React.FC = () => {
  const [input, setInput] = useState('Hello World');
  const [base64, setBase64] = useState('');
  const [hashes, setHashes] = useState({ md5: '', sha1: '', sha256: '' });

  const computeHashes = async (text: string) => {
    try {
      setBase64(btoa(text));
      
      const encoder = new TextEncoder();
      const data = encoder.encode(text);

      // Simple implementation using SubtleCrypto
      const hashBuffer256 = await crypto.subtle.digest('SHA-256', data);
      const hashArray256 = Array.from(new Uint8Array(hashBuffer256));
      const sha256 = hashArray256.map(b => b.toString(16).padStart(2, '0')).join('');

      const hashBuffer1 = await crypto.subtle.digest('SHA-1', data);
      const hashArray1 = Array.from(new Uint8Array(hashBuffer1));
      const sha1 = hashArray1.map(b => b.toString(16).padStart(2, '0')).join('');

      setHashes({ md5: 'N/A (Requires Ext Lib)', sha1, sha256 });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    computeHashes(input);
  }, [input]);

  return (
    <div className="space-y-6">
       <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <Shield size={20} className="text-green-500" /> Security & Encoding
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Input Text</label>
        <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
              <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-400">Base 64</h3>
              <textarea readOnly value={base64} className="w-full h-20 p-2 text-xs font-mono bg-slate-100 dark:bg-slate-900/50 rounded border dark:border-slate-700" />
          </div>
          <div className="space-y-2">
              <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-400">SHA-256</h3>
              <textarea readOnly value={hashes.sha256} className="w-full h-20 p-2 text-xs font-mono bg-slate-100 dark:bg-slate-900/50 rounded border dark:border-slate-700" />
          </div>
          <div className="space-y-2">
              <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-400">SHA-1</h3>
              <input readOnly value={hashes.sha1} className="w-full p-2 text-xs font-mono bg-slate-100 dark:bg-slate-900/50 rounded border dark:border-slate-700" />
          </div>
      </div>
    </div>
  );
};

export default UtilityPanel;
