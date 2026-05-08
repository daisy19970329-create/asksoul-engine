import React from 'react';
import { MessageSquareQuote, AlertCircle, Quote } from 'lucide-react';
import ImageSlot from '../components/ImageSlot';

const WATERMARKS = [
  "DEEP SOUL", "INNER PEACE", "TRUE SELF", "QUIET MIND", "PURE HEART", "ZEN MOMENT"
];

const ImageExplainerTemplate = ({ content, theme, onUpdate, isPreviewMode, onGenerateImage, onRemoveImage, onUploadImage }) => {
  const handleItemUpdate = (index, field, value) => {
    const newItems = [...(content.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate({ ...content, items: newItems });
  };

  return (
    <div className="space-y-10 relative z-10 w-full">
      {/* Main Single Image (首图) */}
      {(!isPreviewMode || content.main?.image_url) && (
        <div className={`p-4 md:p-6 rounded-[3rem] ${theme.cardBg} border ${theme.cardBorder} shadow-2xl`}>
          <ImageSlot 
            url={content.main?.image_url}
            prompt={content.main?.image_prompt || "治愈系场景"}
            onPromptChange={(val) => onUpdate({ ...content, main: { ...content.main, image_prompt: val } })}
            onGenerate={() => onGenerateImage(null, null, content.main?.image_prompt || "治愈系场景", 'main')}
            onRemove={() => onRemoveImage(null, null, 'main')}
            onUpload={(data) => onUploadImage(null, null, data, 'main')}
            isPreviewMode={isPreviewMode}
            theme={theme}
            className="aspect-video rounded-[2rem]"
            recommendSize="16:9 (1200x675px)"
          />
        </div>
      )}

      <div className="flex flex-col gap-6">
        {(content.items || []).map((item, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C...
          
          return (
            <div key={idx} className={`relative flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] shadow-xl transition-all hover:scale-[1.01] overflow-hidden group ${theme.igGradient} backdrop-blur-xl border border-white/60`}>

              {/* Top Row: Badge & Tag */}
              <div className="relative z-20 flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-white/60 ${theme.text} flex items-center justify-center text-xl font-black shadow-lg border border-white/40 transform group-hover:rotate-6 transition-transform`}>
                  {letter}
                </div>
                <div className="text-right bg-white/40 px-3 py-1 rounded-full border border-white/50">
                  {isPreviewMode ? (
                    <span className={`text-[10px] font-black tracking-widest uppercase ${theme.text} opacity-80`}>
                      {item.tag || "INSIGHT"}
                    </span>
                  ) : (
                    <input
                      value={item.tag || ""}
                      onChange={(e) => handleItemUpdate(idx, 'tag', e.target.value)}
                      className={`bg-transparent text-[10px] font-black tracking-widest uppercase ${theme.text} opacity-80 outline-none w-20 text-right`}
                      placeholder="TAG"
                    />
                  )}
                </div>
              </div>

              {/* Content: Title & Interpretation */}
              <div className="relative z-20 flex-1 flex flex-col justify-center space-y-4 py-2">
                {isPreviewMode ? (
                  <h3 className={`text-2xl font-black font-serif ${theme.titleText} leading-tight`}>
                    {item.title || "场景标题"}
                  </h3>
                ) : (
                  <input
                    value={item.title || ""}
                    onChange={(e) => handleItemUpdate(idx, 'title', e.target.value)}
                    className={`w-full bg-transparent text-2xl font-black font-serif ${theme.titleText} border-b border-dashed border-gray-400 outline-none`}
                    placeholder="标题"
                  />
                )}
                {isPreviewMode ? (
                  <p className={`text-sm leading-relaxed ${theme.bodyText} font-medium`}>
                    {item.interpretation || "深度剖析文字..."}
                  </p>
                ) : (
                  <textarea
                    value={item.interpretation || ""}
                    onChange={(e) => handleItemUpdate(idx, 'interpretation', e.target.value)}
                    className={`w-full bg-transparent text-sm leading-relaxed ${theme.bodyText} font-medium outline-none resize-none h-20`}
                    placeholder="深度解读..."
                  />
                )}
              </div>

              {/* Bottom: Warning */}
              <div className="relative z-20 mt-6">
                <div className={`flex items-center gap-2 px-4 py-3 bg-white/50 rounded-2xl border border-white/60 shadow-sm`}>
                  <AlertCircle className={`w-4 h-4 ${theme.accentText}`} />
                  {isPreviewMode ? (
                    <p className={`text-[10px] font-black ${theme.accentText} opacity-90 uppercase tracking-wider truncate`}>
                      Warning: {item.warning || "小心解读。"}
                    </p>
                  ) : (
                    <input
                      value={item.warning || ""}
                      onChange={(e) => handleItemUpdate(idx, 'warning', e.target.value)}
                      className={`flex-1 bg-transparent text-[10px] font-black ${theme.accentText} opacity-90 outline-none uppercase`}
                      placeholder="心灵警示"
                    />
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Final Soul Insight Card */}
      {(content.quote || content.soul_warning) && (
        <div className={`mt-20 ${theme.igGradient} backdrop-blur-3xl rounded-[3rem] p-12 border ${theme.cardBorder} shadow-2xl relative overflow-hidden group`}>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-[100px]"></div>
          <div className="relative z-10 space-y-10">
            {content.quote && (
              <div className="text-center">
                <Quote className={`inline-block mb-6 w-10 h-10 ${theme.accentText} opacity-20`} />
                <p className={`text-3xl font-black font-serif italic ${theme.titleText} leading-tight`}>
                  “{content.quote}”
                </p>
              </div>
            )}
            
            {content.soul_warning && (
              <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center gap-6">
                <div className={`p-4 bg-white/30 rounded-full ${theme.accentText}`}>
                  <AlertCircle className="w-6 h-6" />
                </div>
                <p className={`text-lg leading-relaxed ${theme.bodyText} font-medium text-center md:text-left`}>
                  <span className={`font-black uppercase tracking-widest text-[10px] block mb-1 ${theme.accentText}`}>Soul Guidance / 心灵指引</span>
                  {content.soul_warning}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageExplainerTemplate;
