import { useState } from 'react';
import { Search, Globe, Tag, AlignLeft, Check, Sparkles } from 'lucide-react';

const SEOMetadataPanel = ({ seo, onUpdate, theme }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field, value) => {
    onUpdate({ ...seo, [field]: value });
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className={`${theme.cardBg} rounded-[2.5rem] p-7 border ${theme.cardBorder} shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-right-8 duration-700 relative overflow-hidden`}>
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-12 h-12" />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className={`p-2 ${theme.accentBg} rounded-xl ${theme.accentText}`}>
          <Search className="w-5 h-5" />
        </div>
        <h3 className="font-black text-lg tracking-tight">SEO Metadata</h3>
      </div>

      <div className="space-y-6">
        {/* URL Slug */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
            <Globe className="w-3 h-3" /> URL Slug
          </label>
          <input
            value={seo.slug || ""}
            onChange={(e) => handleChange('slug', e.target.value)}
            className={`w-full bg-transparent text-sm font-medium border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none py-1.5 transition-all rounded-lg px-1`}
            placeholder="url-slug-here"
          />
        </div>

        {/* SEO Title */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
            <Tag className="w-3 h-3" /> SEO Title
          </label>
          <textarea
            value={seo.title || ""}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full bg-transparent text-sm font-black border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none py-1 resize-none overflow-hidden rounded-lg px-1`}
            rows={2}
            placeholder="Meta Title"
          />
        </div>

        {/* Meta Description */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
            <AlignLeft className="w-3 h-3" /> Description
          </label>
          <textarea
            value={seo.description || ""}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`w-full bg-transparent text-xs leading-relaxed opacity-80 border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none py-1.5 resize-none rounded-lg px-1`}
            rows={4}
            placeholder="Meta description..."
          />
        </div>

        {/* Keywords */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
            <Search className="w-3 h-3" /> Keywords
          </label>
          <input
            value={seo.keywords || ""}
            onChange={(e) => handleChange('keywords', e.target.value)}
            className={`w-full bg-transparent text-[10px] font-mono border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none py-1.5 rounded-lg px-1`}
            placeholder="keyword1, keyword2..."
          />
        </div>

        <button 
          onClick={handleSave}
          className={`w-full py-4 ${isSaved ? 'bg-emerald-500 text-white' : theme.accentBg + ' ' + theme.accentText} rounded-2xl font-black text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg`}
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4" /> SEO SETTINGS SAVED
            </>
          ) : (
            <>
              <Check className="w-4 h-4" /> SAVE SEO METADATA
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SEOMetadataPanel;
