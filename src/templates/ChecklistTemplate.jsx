import { Check, Quote } from 'lucide-react';

const ChecklistTemplate = ({ content, theme, onUpdate, isPreviewMode }) => {
  const handleItemUpdate = (index, field, value) => {
    const newItems = [...(content.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate({ ...content, items: newItems });
  };

  return (
    <div className="space-y-12 relative z-10 w-full max-w-4xl mx-auto">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
        {(content.items || []).map((item, idx) => (
          <div key={item.id || idx} className={`${theme.igGradient} backdrop-blur-2xl rounded-3xl p-6 border ${theme.cardBorder} shadow-lg flex items-start gap-6 transition-all hover:translate-x-1`}>
            <div className={`w-10 h-10 rounded-xl ${theme.accentBg} ${theme.accentText} flex items-center justify-center shrink-0 shadow-sm border border-white/40`}>
              <Check className="w-5 h-5" />
            </div>
            <div className="space-y-2 flex-1">
              {isPreviewMode ? (
                <h4 className={`text-xl font-black ${theme.titleText}`}>{item.title}</h4>
              ) : (
                <input
                  value={item.title || ""}
                  onChange={(e) => handleItemUpdate(idx, 'title', e.target.value)}
                  className={`w-full bg-transparent text-xl font-black ${theme.titleText} border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none px-1`}
                  placeholder="项目标题"
                />
              )}
              
              {isPreviewMode ? (
                <p className={`text-sm leading-relaxed ${theme.bodyText} opacity-70 font-medium`}>{item.desc}</p>
              ) : (
                <textarea
                  value={item.desc || ""}
                  onChange={(e) => handleItemUpdate(idx, 'desc', e.target.value)}
                  className={`w-full bg-transparent text-sm leading-relaxed ${theme.bodyText} opacity-70 font-medium outline-none resize-none min-h-15 border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20`}
                  placeholder="项目描述..."
                />
              )}
            </div>
          </div>
        ))}
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
