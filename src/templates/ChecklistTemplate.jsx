import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const ChecklistTemplate = ({ content, theme, onUpdate, isPreviewMode }) => {
  const handleItemUpdate = (index, field, value) => {
    const newItems = [...(content.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate({ ...content, items: newItems });
  };

  return (
    <div className="space-y-6 relative z-10 w-full max-w-3xl mx-auto">
      {(content.items || []).map((item, idx) => (
        <div key={idx} className={`flex items-start gap-6 p-6 md:p-8 ${theme.highlight} rounded-3xl border ${theme.cardBorder} transition-all hover:translate-x-2`}>
          <div className="pt-1">
            <CheckCircle2 className={`w-8 h-8 ${theme.accentText} opacity-40 shrink-0`} />
          </div>
          
          <div className="space-y-2 flex-1">
            {isPreviewMode ? (
              <h3 className={`text-xl md:text-2xl font-black font-serif ${theme.titleText}`}>
                {item.title || "清单项标题"}
              </h3>
            ) : (
              <input
                value={item.title || ""}
                onChange={(e) => handleItemUpdate(idx, 'title', e.target.value)}
                className={`w-full bg-transparent text-xl md:text-2xl font-black font-serif ${theme.titleText} border-b border-dashed border-gray-300 focus:border-gray-500 outline-none pb-1`}
                placeholder="清单项标题"
              />
            )}

            {isPreviewMode ? (
              <p className={`text-base leading-relaxed opacity-80 ${theme.bodyText} font-medium`}>
                {item.desc || "简短的清单项说明文案..."}
              </p>
            ) : (
              <textarea
                value={item.desc || ""}
                onChange={(e) => handleItemUpdate(idx, 'desc', e.target.value)}
                className={`w-full bg-transparent text-base leading-relaxed opacity-80 ${theme.bodyText} font-medium outline-none resize-none min-h-[40px]`}
                placeholder="简短说明..."
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChecklistTemplate;
