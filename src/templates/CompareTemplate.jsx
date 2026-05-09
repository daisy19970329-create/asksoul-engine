import { AlertCircle, Quote } from 'lucide-react';
import ImageSlot from '../components/ImageSlot';

const CompareTemplate = ({ content, theme, onUpdate, isPreviewMode, onGenerateImage, onRemoveImage, onUploadImage }) => {
  const handleItemUpdate = (index, field, value) => {
    const newItems = [...(content.items || [{}, {}])];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate({ ...content, items: newItems });
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
        {/* VS Badge */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full ${theme.accentBg} ${theme.accentText} border-8 border-white shadow-2xl flex items-center justify-center text-3xl font-black z-30 transform rotate-12 hidden md:flex`}>
          VS
        </div>

        {[0, 1].map((idx) => {
          const item = (content.items || [])[idx] || {};
          return (
            <div key={item.id || idx} className={`relative overflow-hidden ${theme.igGradient} backdrop-blur-xl rounded-[3rem] p-10 border ${theme.cardBorder} shadow-xl hover:shadow-2xl transition-all group`}>
              <div className="space-y-8">
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

                <div className="space-y-4 text-center">
                  <div className="flex justify-center">
                    <span className={`px-4 py-1 rounded-full ${theme.tagBg} ${theme.tagText} text-[10px] font-black uppercase tracking-widest border ${theme.cardBorder}`}>
                      {item.tag || 'OPTION'}
                    </span>
                  </div>

                  {isPreviewMode ? (
                    <h3 className={`text-3xl font-black ${theme.titleText}`}>{item.title}</h3>
                  ) : (
                    <input
                      value={item.title || ""}
                      onChange={(e) => handleItemUpdate(idx, 'title', e.target.value)}
                      className={`w-full bg-transparent text-3xl font-black text-center ${theme.titleText} border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none py-1`}
                      placeholder="标题"
                    />
                  )}

                  {isPreviewMode ? (
                    <p className={`text-lg leading-relaxed ${theme.bodyText} opacity-80 font-medium`}>{item.desc}</p>
                  ) : (
                    <textarea
                      value={item.desc || ""}
                      onChange={(e) => handleItemUpdate(idx, 'desc', e.target.value)}
                      className={`w-full bg-transparent text-lg leading-relaxed ${theme.bodyText} opacity-80 font-medium outline-none resize-none min-h-30 text-center border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20`}
                      placeholder="对比描述..."
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bridging Harmony Card */}
      <div className={`mt-16 ${theme.igGradient} backdrop-blur-3xl rounded-[3.5rem] p-12 border ${theme.cardBorder} shadow-2xl relative overflow-hidden group`}>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className={`p-2 bg-white/40 rounded-xl ${theme.accentText}`}>
                <AlertCircle className="w-4 h-4" />
              </div>
              <h4 className={`font-black uppercase tracking-widest text-[10px] ${theme.accentText}`}>平衡的智慧 / Balance</h4>
            </div>
            <p className={`text-lg leading-relaxed ${theme.bodyText} font-medium italic opacity-70`}>
              {content.soul_warning || "所有的对比都不是为了分出胜负，而是为了在差异中找到更完整的自己。"}
            </p>
          </div>
          
          <div className={`hidden md:block w-px h-24 bg-white/20`}></div>
          
          <div className="flex-1 text-center md:text-right">
             <Quote className={`inline-block mb-4 w-8 h-8 ${theme.accentText} opacity-20`} />
             <p className={`text-xl font-black font-serif italic ${theme.titleText} leading-tight`}>
               “{content.quote || "去拥抱生命中的每一份不同。"}”
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareTemplate;
