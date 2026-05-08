import React from 'react';
import { CheckCircle2, Star, ShieldCheck, Zap, Heart, AlertCircle, Quote } from 'lucide-react';

const ICONS = [Star, ShieldCheck, Zap, Heart];

const ChecklistTemplate = ({ content, theme, onUpdate, isPreviewMode }) => {
  const handleItemUpdate = (index, field, value) => {
    const newItems = [...(content.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate({ ...content, items: newItems });
  };

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto py-10">
      <div className="space-y-12">
        {(content.items || []).map((item, idx) => {
          const IconComponent = ICONS[idx % ICONS.length];
          const isLast = idx === (content.items.length - 1);

          return (
            <div key={idx} className="relative group">
              {/* Gradient Connection Line */}
              {!isLast && (
                <div className={`absolute left-8 md:left-10 top-16 bottom-[-3rem] w-1 bg-gradient-to-b ${theme.accentBg} via-white to-transparent opacity-20 rounded-full`}></div>
              )}

              <div className={`relative flex items-start gap-8 p-8 md:p-10 ${theme.cardBg} rounded-[2.5rem] border-2 ${theme.cardBorder} shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group-hover:border-opacity-100 border-opacity-40`}>
                
                {/* Exquisite Badge */}
                <div className={`shrink-0 w-16 h-16 rounded-2xl ${theme.accentBg} ${theme.accentText} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <IconComponent className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1">
                  <div className="flex justify-between items-start">
                    {isPreviewMode ? (
                      <h3 className={`text-2xl md:text-3xl font-black font-serif ${theme.titleText} leading-tight`}>
                        {item.title || "清单项标题"}
                      </h3>
                    ) : (
                      <input
                        value={item.title || ""}
                        onChange={(e) => handleItemUpdate(idx, 'title', e.target.value)}
                        className={`w-full bg-transparent text-2xl md:text-3xl font-black font-serif ${theme.titleText} border-b border-dashed border-gray-300 focus:border-gray-500 outline-none pb-1`}
                        placeholder="任务名称"
                      />
                    )}
                    <CheckCircle2 className={`w-6 h-6 ${theme.accentText} opacity-20 group-hover:opacity-100 transition-opacity`} />
                  </div>

                  {isPreviewMode ? (
                    <p className={`text-lg leading-relaxed opacity-80 ${theme.bodyText} font-medium`}>
                      {item.desc || "简短的清单项说明文案..."}
                    </p>
                  ) : (
                    <textarea
                      value={item.desc || ""}
                      onChange={(e) => handleItemUpdate(idx, 'desc', e.target.value)}
                      className={`w-full bg-transparent text-lg leading-relaxed opacity-80 ${theme.bodyText} font-medium outline-none resize-none min-h-[60px]`}
                      placeholder="任务详情描述..."
                    />
                  )}
                </div>

                {/* Subtle Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${theme.accentBg} to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-5 -z-10 transition-opacity blur-xl`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checklist Final Guidance */}
      <div className="mt-20 space-y-8">
        {content.quote && (
          <div className="py-12 border-t border-white/20 text-center">
            <Quote className={`inline-block mb-4 w-10 h-10 ${theme.accentText} opacity-10`} />
            <p className={`text-2xl font-black font-serif italic ${theme.titleText} leading-tight`}>
              “{content.quote}”
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChecklistTemplate;
