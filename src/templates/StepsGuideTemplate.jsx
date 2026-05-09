import { AlertCircle } from 'lucide-react';
import ImageSlot from '../components/ImageSlot';

const StepsGuideTemplate = ({ content, theme, onUpdate, isPreviewMode, onGenerateImage, onRemoveImage, onUploadImage }) => {
  const handleItemUpdate = (index, field, value) => {
    const newItems = [...(content.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate({ ...content, items: newItems });
  };

  return (
    <div className="space-y-16 relative z-10 w-full max-w-4xl mx-auto">
      {(content.items || []).map((item, idx) => (
        <div key={item.id || idx} className="relative group">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Step Number & Visual */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${theme.accentBg} ${theme.accentText} flex items-center justify-center text-2xl font-black shadow-lg`}>
                  {idx + 1}
                </div>
                <div className={`h-px flex-1 ${theme.accentBg} opacity-20`}></div>
              </div>
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
            </div>

            {/* Step Content */}
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              {isPreviewMode ? (
                <h3 className={`text-3xl font-black ${theme.titleText} leading-tight`}>{item.title}</h3>
              ) : (
                <input
                  value={item.title || ""}
                  onChange={(e) => handleItemUpdate(idx, 'title', e.target.value)}
                  className={`w-full bg-transparent text-3xl font-black ${theme.titleText} border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none py-1`}
                  placeholder="步骤标题"
                />
              )}
              
              {isPreviewMode ? (
                <p className={`text-lg leading-relaxed ${theme.bodyText} opacity-80 font-medium`}>{item.desc}</p>
              ) : (
                <textarea
                  value={item.desc || ""}
                  onChange={(e) => handleItemUpdate(idx, 'desc', e.target.value)}
                  className={`w-full bg-transparent text-lg leading-relaxed ${theme.bodyText} opacity-80 font-medium outline-none resize-none min-h-30 border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20`}
                  placeholder="详细描述步骤..."
                />
              )}
            </div>
          </div>
          {idx !== (content.items || []).length - 1 && (
            <div className="hidden md:block absolute left-7 top-[calc(100%+2rem)] w-px h-16 border-l-2 border-dashed border-gray-300 opacity-30"></div>
          )}
        </div>
      ))}

      {/* Steps Conclusion Modules */}
      <div className="mt-20 space-y-8">
        {content.soul_warning && (
          <div className={`${theme.igGradient} backdrop-blur-2xl rounded-[2.5rem] p-10 border ${theme.cardBorder} shadow-xl flex items-start gap-6`}>
            <div className={`p-4 bg-white/40 rounded-2xl ${theme.accentText} shrink-0`}>
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className={`font-black uppercase tracking-widest text-[10px] ${theme.accentText}`}>碎碎念 / Note</h4>
              <p className={`text-base leading-relaxed ${theme.bodyText} font-medium italic opacity-70`}>
                {content.soul_warning}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepsGuideTemplate;
