import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

const LongFormTemplate = ({ content, theme, onUpdate, isPreviewMode }) => {
  const handleSectionUpdate = (index, field, value) => {
    const newSections = [...(content.sections || [])];
    newSections[index] = { ...newSections[index], [field]: value };
    onUpdate({ ...content, sections: newSections });
  };

  return (
    <div className="space-y-20 relative z-10 w-full max-w-4xl mx-auto">
      {(content.sections || []).map((section, idx) => (
        <article key={idx} className="space-y-10 group">
          
          {/* Section Header */}
          <div className="space-y-4">
            {isPreviewMode ? (
              <h2 className={`text-3xl md:text-4xl font-black font-serif ${theme.titleText} leading-tight`}>
                {section.subtitle || "小节标题"}
              </h2>
            ) : (
              <input
                value={section.subtitle || ""}
                onChange={(e) => handleSectionUpdate(idx, 'subtitle', e.target.value)}
                className={`w-full bg-transparent text-3xl md:text-4xl font-black font-serif ${theme.titleText} border-b border-dashed border-gray-300 focus:border-gray-500 outline-none pb-2`}
                placeholder="章节小标题"
              />
            )}
            <div className={`w-20 h-1.5 ${theme.accentBg} rounded-full opacity-30`}></div>
          </div>

          {/* Section Content */}
          <div className="space-y-10">
            {isPreviewMode ? (
              <p className={`text-lg md:text-xl leading-[2] ${theme.bodyText} opacity-90 font-medium whitespace-pre-wrap`}>
                {section.content || "在这里输入长文详细内容..."}
              </p>
            ) : (
              <textarea
                value={section.content || ""}
                onChange={(e) => handleSectionUpdate(idx, 'content', e.target.value)}
                className={`w-full bg-transparent text-lg md:text-xl leading-[2] ${theme.bodyText} opacity-90 font-medium outline-none resize-none min-h-[200px]`}
                placeholder="开始书写深度见解..."
              />
            )}

            {/* Section Image */}
            <div className={`relative aspect-[16/9] rounded-[2.5rem] overflow-hidden ${theme.cardBg} border-2 ${theme.cardBorder} shadow-2xl`}>
              {section.image_url ? (
                <img src={section.image_url} alt={section.subtitle} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              ) : (
                <div className="text-center p-12 opacity-30 h-full flex flex-col justify-center items-center">
                  <Camera className="w-12 h-12 mb-4" />
                  <p className="font-black tracking-widest text-[10px] uppercase">Section Illustration</p>
                </div>
              )}
            </div>

            {!isPreviewMode && (
              <div className="space-y-2 px-6">
                <div className="flex items-center gap-2 opacity-50">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Illustration Prompt</span>
                </div>
                <input
                  value={section.image_prompt || ""}
                  onChange={(e) => handleSectionUpdate(idx, 'image_prompt', e.target.value)}
                  className="w-full bg-black/5 rounded-xl px-4 py-2 text-xs font-mono outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="针对此段落的视觉生成提示词..."
                />
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default LongFormTemplate;
