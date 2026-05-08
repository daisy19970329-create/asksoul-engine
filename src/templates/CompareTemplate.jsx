import { AlertCircle, Quote } from 'lucide-react';
import ImageSlot from '../components/ImageSlot';

const CompareTemplate = ({ content, theme, onUpdate, isPreviewMode, onGenerateImage, onRemoveImage, onUploadImage }) => {
  const options = [
    { key: 'optionA', label: 'Side A' },
    { key: 'optionB', label: 'Side B' }
  ];

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto py-12">
      {/* VS Badge */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full ${theme.accentBg} ${theme.accentText} border-4 border-white shadow-2xl flex items-center justify-center text-3xl font-black z-30 transform rotate-12 group-hover:scale-110 transition-transform`}>
        VS
      </div>

      <div className="space-y-12">
        {options.map(({ key, label }, idx) => {
          const data = content[key] || {};
          return (
            <div key={key} className={`relative overflow-hidden ${theme.igGradient} backdrop-blur-xl rounded-[3rem] p-10 md:p-14 border ${theme.cardBorder} shadow-xl hover:shadow-2xl transition-all group`}>
              
              <div className="space-y-8">
                {/* Visual Section */}
                <div className="w-full">
                  <ImageSlot 
                    url={data.image_url}
                    prompt={data.image_prompt}
                    onPromptChange={(val) => onUpdate({ ...content, [key]: { ...data, image_prompt: val } })}
                    onGenerate={() => onGenerateImage(null, null, data.image_prompt, key)}
                    onRemove={() => onRemoveImage(null, null, key)}
                    onUpload={(data) => onUploadImage(null, null, data, key)}
                    isPreviewMode={isPreviewMode}
                    theme={theme}
                    className="aspect-[16/9]"
                    recommendSize="16:9 (1200x675px)"
                  />
                </div>

                {/* Content Section */}
                <div className="space-y-4 text-center">
                  <div className="flex justify-center">
                    {isPreviewMode ? (
                      <span className={`px-4 py-1 rounded-full ${theme.tagBg} ${theme.tagText} text-[10px] font-black uppercase tracking-widest`}>
                        {data.tag || 'PERSPECTIVE'}
                      </span>
                    ) : (
                      <input
                        value={data.tag || ""}
                        onChange={(e) => onUpdate({ ...content, [key]: { ...data, tag: e.target.value } })}
                        className={`px-4 py-1 rounded-full ${theme.tagBg} ${theme.tagText} text-[10px] font-black uppercase tracking-widest outline-none w-32 text-center`}
                        placeholder="标签"
                      />
                    )}
                  </div>

                  {isPreviewMode ? (
                    <h3 className={`text-3xl md:text-4xl font-black font-serif ${theme.titleText}`}>
                      {data.title || "选项标题"}
                    </h3>
                  ) : (
                    <input
                      value={data.title || ""}
                      onChange={(e) => onUpdate({ ...content, [key]: { ...data, title: e.target.value } })}
                      className={`w-full bg-transparent text-3xl md:text-4xl font-black font-serif ${theme.titleText} border-b border-dashed border-gray-300 outline-none text-center`}
                      placeholder="标题"
                    />
                  )}

                  {isPreviewMode ? (
                    <p className={`text-lg leading-relaxed opacity-80 ${theme.bodyText} font-medium max-w-lg mx-auto`}>
                      {data.desc || "在这里输入对比描述文案..."}
                    </p>
                  ) : (
                    <textarea
                      value={data.desc || ""}
                      onChange={(e) => onUpdate({ ...content, [key]: { ...data, desc: e.target.value } })}
                      className={`w-full bg-transparent text-lg leading-relaxed opacity-80 ${theme.bodyText} font-medium outline-none resize-none min-h-[80px] text-center`}
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
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
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
