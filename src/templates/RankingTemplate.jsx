import React from 'react';
import { Camera, Sparkles, Award } from 'lucide-react';

const RankingTemplate = ({ content, theme, onUpdate, isPreviewMode }) => {
  const handleItemUpdate = (index, field, value) => {
    const newRankings = [...(content.rankings || [])];
    newRankings[index] = { ...newRankings[index], [field]: value };
    onUpdate({ ...content, rankings: newRankings });
  };

  return (
    <div className="space-y-12 relative z-10 w-full">
      {(content.rankings || []).map((item, idx) => (
        <div key={idx} className={`relative flex flex-col md:flex-row gap-10 items-start ${theme.highlight} rounded-[2.5rem] p-8 md:p-10 border ${theme.cardBorder} transition-all hover:scale-[1.01]`}>
          
          {/* Rank Number Badge */}
          <div className={`absolute -left-5 -top-5 w-14 h-14 rounded-2xl ${idx < 3 ? 'bg-gradient-to-br from-amber-300 to-orange-400' : theme.iconBg} ${idx < 3 ? 'text-white' : theme.iconText} flex items-center justify-center text-2xl font-black shadow-xl z-20 transform -rotate-12`}>
            {idx + 1}
          </div>

          {/* Left: Image Slot */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className={`relative aspect-square rounded-3xl overflow-hidden ${theme.cardBg} border-2 ${theme.cardBorder} shadow-inner flex items-center justify-center group`}>
              {item.image_url ? (
                <img src={item.image_url} alt={item.sign} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center opacity-40">
                  <Camera className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-[10px] font-black tracking-widest uppercase">Visual</p>
                </div>
              )}
            </div>
            
            {!isPreviewMode && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 opacity-50">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Image Prompt</span>
                </div>
                <input
                  value={item.image_prompt || ""}
                  onChange={(e) => handleItemUpdate(idx, 'image_prompt', e.target.value)}
                  className="w-full bg-black/5 rounded-lg px-3 py-1.5 text-[10px] font-mono outline-none focus:ring-1 focus:ring-indigo-100"
                  placeholder="提示词..."
                />
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              {isPreviewMode ? (
                <span className={`px-4 py-1 rounded-full ${theme.tagBg} ${theme.tagText} text-[10px] font-black tracking-widest uppercase border ${theme.cardBorder}`}>
                  {item.tag || "CATEGORY"}
                </span>
              ) : (
                <input
                  value={item.tag || ""}
                  onChange={(e) => handleItemUpdate(idx, 'tag', e.target.value)}
                  className={`px-4 py-1 rounded-full ${theme.tagBg} ${theme.tagText} text-[10px] font-black tracking-widest uppercase border ${theme.cardBorder} outline-none w-28`}
                  placeholder="标签"
                />
              )}
            </div>

            <div className="space-y-4">
              {isPreviewMode ? (
                <h3 className={`text-2xl md:text-3xl font-black font-serif ${theme.titleText}`}>
                  {item.sign || "项目名称"}
                </h3>
              ) : (
                <input
                  value={item.sign || ""}
                  onChange={(e) => handleItemUpdate(idx, 'sign', e.target.value)}
                  className={`w-full bg-transparent text-2xl md:text-3xl font-black font-serif ${theme.titleText} border-b border-dashed border-gray-300 focus:border-gray-500 outline-none pb-1`}
                  placeholder="输入名称"
                />
              )}

              {isPreviewMode ? (
                <p className={`text-base leading-[1.8] opacity-80 ${theme.bodyText} font-medium`}>
                  {item.desc || "在这里输入一段优美的、带有治愈感的描述文字，深度剖析为什么它能排在这个位置。"}
                </p>
              ) : (
                <textarea
                  value={item.desc || ""}
                  onChange={(e) => handleItemUpdate(idx, 'desc', e.target.value)}
                  className={`w-full bg-transparent text-base leading-[1.8] opacity-80 ${theme.bodyText} font-medium outline-none resize-none min-h-[80px]`}
                  placeholder="深度描述..."
                />
              )}
            </div>

            {/* Addictive Factor / Score */}
            <div className={`inline-flex items-center gap-3 px-6 py-3 ${theme.quoteBg} rounded-2xl border ${theme.cardBorder}`}>
              <Award className={`w-5 h-5 ${theme.accentText} opacity-60`} />
              <div>
                <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-0.5">Addictive Factor</p>
                {isPreviewMode ? (
                  <p className={`font-bold ${theme.accentText}`}>{item.addictiveFactor || "4.5 / 5.0"}</p>
                ) : (
                  <input
                    value={item.addictiveFactor || ""}
                    onChange={(e) => handleItemUpdate(idx, 'addictiveFactor', e.target.value)}
                    className={`bg-transparent font-bold ${theme.accentText} outline-none w-full`}
                    placeholder="评分或亮点"
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

export default RankingTemplate;
