import { Award, AlertCircle } from 'lucide-react';
import ImageSlot from '../components/ImageSlot';

const RankingTemplate = ({ content, theme, onUpdate, isPreviewMode, onGenerateImage, onRemoveImage, onUploadImage }) => {
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
    <div className="space-y-12 relative z-10 w-full max-w-4xl mx-auto">
      {/* Expert's Soul Warning at Top */}
      <div className={`${theme.igGradient} backdrop-blur-2xl rounded-[2.5rem] p-8 border ${theme.cardBorder} shadow-xl relative overflow-hidden group`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 bg-white/40 rounded-xl ${theme.accentText}`}>
            <AlertCircle className="w-4 h-4" />
          </div>
          <h4 className={`font-black uppercase tracking-widest text-[10px] ${theme.accentText}`}>写在前面 / Note</h4>
        </div>
        <p className={`text-base leading-relaxed ${theme.bodyText} font-medium italic opacity-70`}>
          {content.soul_warning || "在揭晓榜单之前，请记得：排名从不定义你的价值，它只是一种观察生活的视角。"}
        </p>
      </div>
      {(content.items || []).map((item, idx) => {
        const showVisual = idx < 3;
        return (
          <div key={item.id || idx} className={`relative flex flex-col gap-8 items-center text-center ${theme.igGradient} backdrop-blur-xl rounded-[3rem] p-10 md:p-14 border ${theme.cardBorder} transition-all hover:scale-[1.01] shadow-xl overflow-hidden`}>
            
            {/* Rank Number Badge */}
            <div className={`absolute -left-2 -top-2 w-16 h-16 rounded-3xl ${idx < 3 ? 'bg-white shadow-2xl border-4 border-white/60 backdrop-blur-md' : theme.iconBg} ${idx < 3 ? theme.titleText : theme.iconText} flex items-center justify-center text-3xl font-black z-20 transform -rotate-12`}>
              {idx + 1}
            </div>

            {/* Top 3 Visual Section */}
            {showVisual && (
              <div className="w-full max-w-3xl mx-auto">
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
            )}

            {/* Content Section */}
            <div className="w-full space-y-8">
              <div className="space-y-4">
                <div className="flex justify-center">
                  {isPreviewMode ? (
                    <span className={`px-5 py-1.5 rounded-full ${theme.tagBg} ${theme.tagText} text-[10px] font-black tracking-[0.2em] uppercase border ${theme.cardBorder} shadow-sm`}>
                      {item.tag || "CATEGORY"}
                    </span>
                  ) : (
                    <input
                      value={item.tag || ""}
                      onChange={(e) => handleItemUpdate(idx, 'tag', e.target.value)}
                      className={`px-5 py-1.5 rounded-full ${theme.tagBg} ${theme.tagText} text-[10px] font-black tracking-[0.2em] uppercase border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none w-32 text-center`}
                      placeholder="标签"
                    />
                  )}
                </div>

                {isPreviewMode ? (
                  <h3 className={`text-3xl md:text-4xl font-black font-serif ${theme.titleText} leading-tight`}>
                    {item.title || "项目名称"}
                  </h3>
                ) : (
                  <textarea
                    value={item.title || ""}
                    onChange={(e) => handleItemUpdate(idx, 'title', e.target.value)}
                    className={`w-full bg-transparent text-3xl md:text-4xl font-black font-serif ${theme.titleText} border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none py-1 text-center resize-none overflow-hidden`}
                    rows={1}
                    placeholder="输入名称"
                  />
                )}

                {isPreviewMode ? (
                  <p className={`text-lg leading-[1.8] opacity-80 ${theme.bodyText} font-medium max-w-2xl mx-auto`}>
                    {item.desc || "详细描述文案..."}
                  </p>
                ) : (
                  <textarea
                    value={item.desc || ""}
                    onChange={(e) => handleItemUpdate(idx, 'desc', e.target.value)}
                    className={`w-full bg-transparent text-lg leading-[1.8] opacity-80 ${theme.bodyText} font-medium outline-none resize-none min-h-25 text-center border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 max-w-2xl mx-auto`}
                    placeholder="深度描述..."
                  />
                )}
              </div>

              {/* Addictive Factor / Score */}
              <div className="flex justify-center">
                <div className={`inline-flex items-center gap-4 px-8 py-4 ${theme.quoteBg} rounded-3xl border ${theme.cardBorder} shadow-lg`}>
                  <Award className={`w-6 h-6 ${theme.accentText} opacity-70`} />
                  <div className="text-left">
                    <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-0.5">Rating Insight</p>
                    {isPreviewMode ? (
                      <p className={`font-black text-xl ${theme.accentText}`}>{item.extra?.addictiveFactor || "Premium"}</p>
                    ) : (
                      <input
                        value={item.extra?.addictiveFactor || ""}
                        onChange={(e) => handleItemUpdate(idx, 'addictiveFactor', e.target.value, true)}
                        className={`bg-transparent font-black text-xl ${theme.accentText} outline-none w-full border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20`}
                        placeholder="评分或亮点"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative background number for non-visual items */}
            {!showVisual && (
              <div className={`absolute -right-8 -bottom-8 text-[12rem] font-black opacity-[0.03] select-none pointer-events-none ${theme.iconText}`}>
                {idx + 1}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RankingTemplate;
