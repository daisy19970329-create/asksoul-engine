import { AlertCircle, Quote } from 'lucide-react';
import ImageSlot from '../components/ImageSlot';

const ImageExplainerTemplate = ({ content, theme, onUpdate, isPreviewMode, onGenerateImage, onRemoveImage, onUploadImage }) => {
  const handleItemUpdate = (index, field, value, isExtra = false) => {
    const newItems = [...(content.items || [])];
    if (isExtra) {
      newItems[index] = { ...newItems[index], extra: { ...newItems[index].extra, [field]: value } };
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }
    onUpdate({ ...content, items: newItems });
  };

  return (
    <div className="space-y-16 relative z-10 w-full max-w-4xl mx-auto">
      {/* Grid of Interpretations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(content.items || []).map((item, idx) => (
          <div key={item.id || idx} className={`${theme.igGradient} backdrop-blur-2xl rounded-[2.5rem] p-8 border ${theme.cardBorder} shadow-lg space-y-6 transition-all hover:scale-[1.02] overflow-hidden group`}>
            <ImageSlot 
              url={item.image_url}
              prompt={item.image_prompt}
              onPromptChange={(val) => handleItemUpdate(idx, 'image_prompt', val)}
              onGenerate={() => onGenerateImage(idx)}
              onRemove={() => onRemoveImage(idx)}
              onUpload={(data) => onUploadImage(idx, data)}
              isPreviewMode={isPreviewMode}
              theme={theme}
              className="aspect-video"
              recommendSize="16:9 (1200x675px)"
            />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`px-4 py-1 rounded-full ${theme.tagBg} ${theme.tagText} text-[10px] font-black uppercase tracking-widest border ${theme.cardBorder}`}>{item.tag || "INSIGHT"}</span>
              </div>
              
              {isPreviewMode ? (
                <h3 className={`text-2xl font-black ${theme.titleText}`}>{item.title}</h3>
              ) : (
                <input
                  value={item.title || ""}
                  onChange={(e) => handleItemUpdate(idx, 'title', e.target.value)}
                  className={`w-full bg-transparent text-2xl font-black ${theme.titleText} border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none py-1`}
                  placeholder="标题"
                />
              )}

              {isPreviewMode ? (
                <p className={`text-lg leading-relaxed ${theme.bodyText} opacity-80 font-medium`}>{item.desc}</p>
              ) : (
                <textarea
                  value={item.desc || ""}
                  onChange={(e) => handleItemUpdate(idx, 'desc', e.target.value)}
                  className={`w-full bg-transparent text-lg leading-relaxed ${theme.bodyText} opacity-80 font-medium outline-none resize-none min-h-25 border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20`}
                  placeholder="解读文案..."
                />
              )}

              {/* Warning/Advice Badge */}
              <div className={`p-4 ${theme.highlight} rounded-2xl border-l-4 border-rose-400 flex items-start gap-3`}>
                <AlertCircle className="w-5 h-5 text-rose-500 mt-1 shrink-0" />
                {isPreviewMode ? (
                  <p className={`text-sm font-bold ${theme.titleText}`}>{item.extra?.warning || "建议备注..."}</p>
                ) : (
                  <input
                    value={item.extra?.warning || ""}
                    onChange={(e) => handleItemUpdate(idx, 'warning', e.target.value, true)}
                    className={`w-full bg-transparent text-sm font-bold ${theme.titleText} border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none`}
                    placeholder="警告或建议"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
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
