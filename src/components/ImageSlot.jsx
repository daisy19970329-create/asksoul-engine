import { useRef, useState } from 'react';
import { Camera, Sparkles, X, Upload, Image as ImageIcon } from 'lucide-react';

const ImageSlot = ({ 
  url, 
  prompt, 
  onPromptChange, 
  onGenerate, 
  onRemove, 
  onUpload,
  isPreviewMode, 
  className = "aspect-video",
  theme,
  recommendSize = "16:9"
}) => {
  const fileInputRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback high-quality abstract image if everything fails
  const fallbackImg = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200";
  
  if (isPreviewMode && !url) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpload(event.target.result);
        setHasError(false);
        setIsLoading(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`relative ${className} rounded-[2rem] overflow-hidden ${theme.cardBg} border-2 ${url ? theme.cardBorder : 'border-dashed ' + theme.cardBorder} shadow-inner flex items-center justify-center group transition-all duration-500`}>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />

      {url ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse z-10">
              <ImageIcon className="w-8 h-8 opacity-20" />
            </div>
          )}
          <img 
            src={hasError ? fallbackImg : url} 
            alt="Content" 
            className={`w-full h-full object-cover transition-all duration-1000 ${isLoading ? 'scale-110 blur-xl' : 'scale-100 blur-0'}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            loading="lazy"
          />
          
          {/* Controls Overlay */}
          {!isPreviewMode && (
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 z-20 pointer-events-none">
              <button 
                onClick={(e) => { e.stopPropagation(); onGenerate(); }}
                className="pointer-events-auto px-6 py-3 bg-white/90 text-black rounded-full shadow-2xl transform scale-90 group-hover:scale-100 transition-all hover:bg-white active:scale-95 flex items-center gap-2 font-black text-xs uppercase"
              >
                <Sparkles className="w-4 h-4" />
                Regenerate AI
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                className="pointer-events-auto px-6 py-3 bg-white/20 backdrop-blur-md text-white border border-white/40 rounded-full shadow-2xl transform scale-90 group-hover:scale-100 transition-all hover:bg-white/30 active:scale-95 flex items-center gap-2 font-black text-xs uppercase"
              >
                <Upload className="w-4 h-4" />
                Replace Local
              </button>
            </div>
          )}

          {/* Remove Button - Top Right */}
          {!isPreviewMode && (
            <button 
              onClick={onRemove}
              className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 hover:bg-rose-500 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all z-30 flex items-center gap-1.5 border border-white/20 shadow-xl"
            >
              <X className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-tighter">Remove</span>
            </button>
          )}

          {/* Source Indicator */}
          {!isPreviewMode && (
             <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-white/80 ${theme.text} shadow-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity`}>
                   {url.startsWith('data:') ? 'Local Source 本地' : 'AI Generated 智能'}
                </span>
             </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-6 p-8">
          <div className="text-center opacity-30 group-hover:opacity-50 transition-opacity text-current">
            <Camera className="w-10 h-10 mx-auto mb-2" />
            <p className="text-[10px] font-black tracking-widest uppercase italic">Visual Workspace</p>
            <p className="text-[9px] font-bold mt-1 opacity-60">REC: {recommendSize}</p>
          </div>

          {!isPreviewMode && (
            <div className="flex flex-col gap-3 w-full max-w-[200px]">
              <button 
                onClick={onGenerate}
                className="w-full py-3 bg-black text-white rounded-full shadow-lg flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-wider hover:bg-gray-800 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Generate
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full py-3 ${theme.accentBg} ${theme.accentText} rounded-full shadow-md flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-wider hover:opacity-80 transition-all`}
              >
                <Upload className="w-3.5 h-3.5" />
                Local Upload
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Prompt Box */}
      {!isPreviewMode && (
        <div className={`absolute bottom-4 left-4 right-4 z-30 transition-all duration-500 ${url ? 'translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100' : 'translate-y-0 opacity-100'}`}>
          <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-3 shadow-2xl">
            <div className="flex items-center gap-2 mb-1.5 opacity-60">
              <Sparkles className="w-3 h-3 text-current" />
              <span className="text-[10px] font-black uppercase tracking-widest text-current">Vision Concept</span>
            </div>
            <textarea
              value={prompt || ""}
              onChange={(e) => onPromptChange(e.target.value)}
              className="w-full bg-transparent text-[11px] font-medium leading-relaxed outline-none resize-none placeholder:opacity-30 scrollbar-hide text-current"
              placeholder="Prompt for AI..."
              rows={2}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlot;
