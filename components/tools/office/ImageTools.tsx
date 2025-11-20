import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Download } from 'lucide-react';

const ImageTools: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImage(ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const downloadCompressed = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'compressed-image.jpg';
      link.click();
    };
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
         <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <ImageIcon size={20} className="text-orange-500" /> Image Compressor (Local)
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors h-64"
            >
                <Upload className="text-slate-400 mb-2" size={32} />
                <p className="text-sm text-slate-500">Click to upload image (JPG/PNG)</p>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </div>

            {image && (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Quality: {Math.round(quality * 100)}%</label>
                    <input 
                        type="range" 
                        min="0.1" 
                        max="1" 
                        step="0.1" 
                        value={quality} 
                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                        className="w-full"
                    />
                </div>
            )}
        </div>

        <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 h-64 relative overflow-hidden">
            {image ? (
                <>
                    <img src={image} alt="Preview" className="max-h-full max-w-full object-contain" style={{ opacity: quality < 0.5 ? 0.5 : 1 }} />
                    <button 
                        onClick={downloadCompressed}
                        className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
                    >
                        <Download size={16} /> Save
                    </button>
                </>
            ) : (
                <span className="text-slate-400 text-sm">Preview will appear here</span>
            )}
        </div>
      </div>
    </div>
  );
};

export default ImageTools;
