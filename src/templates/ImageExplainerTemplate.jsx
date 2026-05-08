import React from 'react';
import { Camera, Sparkles, MessageSquareQuote, AlertCircle } from 'lucide-react';

const ImageExplainerTemplate = ({ content, theme, onUpdate, isPreviewMode }) => {
  const handleItemUpdate = (index, field, value) => {
    const newItems = [...(content.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate({ ...content, items: newItems });
  };

  return (
    <div className="space-y-16 relative z-10 w-full">
      {(content.items || []).map((item, idx) => (
        <div key={idx} className={`group grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
          
          {/* Visual Side */}
          <div className={`${idx % 2 !== 0 ? 'md:order-2' : ''} space-y-4`}>
            <div className={`relative aspect-square rounded-[3rem] overflow-hidden ${theme.cardBg} border-4 ${theme.cardBorder} shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]`}>
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-10 opacity-30 h-full flex flex-col justify-center items-center">
                  <Camera className="w-16 h-16 mb-4" />
                  <p className="font-black tracking-[0.2em] uppercase text-xs">Aesthetic Visual</p>
                </div>
              )}
            </div>
            
            {!isPreviewMode && (
              <div className="px-6 space-y-2">
                <div className="flex items-center gap-2 opacity-50">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Image Prompt</span>
                </div>
                <textarea
                  value={item.image_prompt || ""}
                  onChange={(e) => handleItemUpdate(idx, 'image_prompt', e.target.value)}
                  className="w-full bg-black/5 rounded-2xl px-4 py-2 text-[10px] font-mono outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
                  placeholder="AI 生成提示词..."
                  rows={2}
                />
              </div>
            )}
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {isPreviewMode ? (
                  <span className={`px-4 py-1 ${theme.tagBg} ${theme.tagText} text-[10px] font-black tracking-widest uppercase rounded-full`}>
                    {item.tag || "INSIGHT"}
                  </span>
                ) : (
                  <input
                    value={item.tag || ""}
                    onChange={(e) => handleItemUpdate(idx, 'tag', e.target.value)}
                    className={`px-4 py-1 ${theme.tagBg} ${theme.tagText} text-[10px] font-black tracking-widest uppercase rounded-full outline-none w-32`}
                    placeholder="标签"
                  />
                )}
              </div>

              {isPreviewMode ? (
                <h3 className={`text-3xl md:text-4xl font-black font-serif ${theme.titleText} leading-tight`}>
                  {item.title || "场景标题"}
                </h3>
              ) : (
                <input
                  value={item.title || ""}
                  onChange={(e) => handleItemUpdate(idx, 'title', e.target.value)}
                  className={`w-full bg-transparent text-3xl md:text-4xl font-black font-serif ${theme.titleText} border-b border-dashed border-gray-300 focus:border-gray-500 outline-none pb-2`}
                  placeholder="场景名称"
                />
              )}

              {isPreviewMode ? (
                <p className={`text-lg leading-[1.8] opacity-90 ${theme.bodyText} font-medium`}>
                  {item.interpretation || "在这里输入深度的、富有哲理的心理剖析文字。这段文字应该像是在读一本精美的心理杂志。"}
                </p>
              ) : (
                <textarea
                  value={item.interpretation || ""}
                  onChange={(e) => handleItemUpdate(idx, 'interpretation', e.target.value)}
                  className={`w-full bg-transparent text-lg leading-[1.8] opacity-90 ${theme.bodyText} font-medium outline-none resize-none min-h-[120px]`}
                  placeholder="深度解读内容..."
                />
              )}
            </div>

            {/* Quote & Warning */}
            <div className="space-y-6 pt-6 border-t border-gray-100 border-opacity-30">
              <div className="flex gap-4">
                <MessageSquareQuote className={`w-6 h-6 ${theme.accentText} opacity-40 shrink-0`} />
                {isPreviewMode ? (
                  <p className={`text-base italic font-serif ${theme.quoteText} opacity-80`}>
                    "{item.quote || "真正的宁静，来自内心的安定。"}"
                  </p>
                ) : (
                  <input
                    value={item.quote || ""}
                    onChange={(e) => handleItemUpdate(idx, 'quote', e.target.value)}
                    className={`flex-1 bg-transparent text-base italic font-serif ${theme.quoteText} opacity-80 outline-none`}
                    placeholder="金句引语"
                  />
                )}
              </div>

              <div className={`flex items-center gap-3 p-4 ${theme.highlight} rounded-2xl border ${theme.cardBorder}`}>
                <AlertCircle className={`w-4 h-4 text-rose-400`} />
                {isPreviewMode ? (
                  <p className={`text-xs font-bold ${theme.accentText} opacity-70`}>
                    {item.warning || "心灵警示：不要过度解读当下的迷茫。"}
                  </p>
                ) : (
                  <input
                    value={item.warning || ""}
                    onChange={(e) => handleItemUpdate(idx, 'warning', e.target.value)}
                    className={`flex-1 bg-transparent text-xs font-bold ${theme.accentText} opacity-70 outline-none`}
                    placeholder="心灵警示"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageExplainerTemplate;
