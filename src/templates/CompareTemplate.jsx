import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

const CompareTemplate = ({ content, theme, onUpdate, isPreviewMode }) => {
  const options = [
    { key: 'optionA', label: 'Option A' },
    { key: 'optionB', label: 'Option B' }
  ];

  return (
      <div className="flex flex-col gap-12 relative z-10 w-full">
        {options.map(({ key, label }) => {
          const data = content[key] || {};
          return (
              <div key={key} className={`group ${theme.highlight} rounded-[3rem] p-8 md:p-12 border ${theme.cardBorder} transition-all hover:shadow-xl`}>
                <div className="space-y-8">
                  {/* Tag */}
                  <div className="flex justify-between items-center">
                    {isPreviewMode ? (
                        <span className={`px-4 py-1.5 ${theme.tagBg} ${theme.tagText} text-xs font-black rounded-full border ${theme.cardBorder} tracking-widest uppercase`}>
                    {data.tag || 'Label'}
                  </span>
                    ) : (
                        <input
                            value={data.tag || ""}
                            onChange={(e) => onUpdate({ ...content, [key]: { ...data, tag: e.target.value } })}
                            className={`px-4 py-1.5 ${theme.tagBg} ${theme.tagText} text-xs font-black rounded-full border ${theme.cardBorder} tracking-widest uppercase outline-none focus:ring-2 focus:ring-indigo-200 w-32`}
                            placeholder="标签"
                        />
                    )}
                  </div>

                  {/* Content Grid: Image + Text */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Image Slot */}
                    <div className={`relative aspect-[4/3] rounded-[2rem] overflow-hidden ${theme.cardBg} border-2 ${theme.cardBorder} shadow-inner flex items-center justify-center`}>
                      {data.image_url ? (
                          <img src={data.image_url} alt={data.title} className="w-full h-full object-cover" />
                      ) : (
                          <div className="text-center opacity-40">
                            <Camera className="w-10 h-10 mx-auto mb-2" />
                            <p className="text-[10px] font-bold">IMAGE SLOT</p>
                          </div>
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="space-y-6">
                      {isPreviewMode ? (
                          <h3 className={`text-3xl md:text-4xl font-black font-serif ${theme.titleText} leading-tight`}>
                            {data.title || "选项标题"}
                          </h3>
                      ) : (
                          <input
                              value={data.title || ""}
                              onChange={(e) => onUpdate({ ...content, [key]: { ...data, title: e.target.value } })}
                              className={`w-full bg-transparent text-3xl md:text-4xl font-black font-serif ${theme.titleText} border-b border-dashed border-gray-300 focus:border-gray-500 outline-none`}
                              placeholder="选项标题"
                          />
                      )}

                      {isPreviewMode ? (
                          <p className={`text-lg leading-relaxed opacity-90 ${theme.bodyText} font-medium`}>
                            {data.desc || "详细描述文案..."}
                          </p>
                      ) : (
                          <textarea
                              value={data.desc || ""}
                              onChange={(e) => onUpdate({ ...content, [key]: { ...data, desc: e.target.value } })}
                              className={`w-full bg-transparent text-lg leading-relaxed opacity-90 ${theme.bodyText} font-medium outline-none resize-none min-h-[100px]`}
                              placeholder="在这里输入详细的解析和对比内容..."
                          />
                      )}
                    </div>
                  </div>

                  {/* AI Prompt Slot (Only in Edit Mode) */}
                  {!isPreviewMode && (
                      <div className="pt-6 border-t border-gray-100 border-opacity-20">
                        <div className="flex items-center gap-2 mb-2 opacity-50">
                          <Sparkles className="w-3 h-3" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Image Prompt</span>
                        </div>
                        <input
                            value={data.image_prompt || ""}
                            onChange={(e) => onUpdate({ ...content, [key]: { ...data, image_prompt: e.target.value } })}
                            className="w-full bg-black/5 rounded-xl px-4 py-2 text-xs font-mono outline-none focus:ring-2 focus:ring-indigo-100"
                            placeholder="AI 图片生成提示词..."
                        />
                      </div>
                  )}
                </div>
              </div>
          );
        })}
      </div>
  );
};

export default CompareTemplate;
