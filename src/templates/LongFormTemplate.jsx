import { Fragment } from 'react';
import { Quote } from 'lucide-react';
import ImageSlot from '../components/ImageSlot';

const LongFormTemplate = ({ content, theme, onUpdate, isPreviewMode, onGenerateImage, onRemoveImage, onUploadImage }) => {
  const handleItemUpdate = (index, field, value) => {
    const newItems = [...(content.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate({ ...content, items: newItems });
  };

  // Helper to format text with forced spacing (2 newlines every 2 sentences)
  const formatContent = (text) => {
    if (!text) return "";
    const sentences = text.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g) || [text];
    let formatted = "";
    for (let i = 0; i < sentences.length; i++) {
      formatted += sentences[i];
      if ((i + 1) % 2 === 0 && i !== sentences.length - 1) {
        formatted += "\n\n\n";
      }
    }
    return formatted;
  };

  return (
    <div className="space-y-32 relative z-10 w-full max-w-4xl mx-auto px-4 md:px-0">
      {(content.items || []).map((item, idx) => {
        const isFirst = idx === 0;
        return (
          <Fragment key={item.id || idx}>
            <article className="space-y-12 group">
            
            {/* Section Header */}
            <div className="space-y-6 text-center max-w-2xl mx-auto">
              <div className={`w-12 h-1 ${theme.accentBg} mx-auto rounded-full opacity-40 mb-4`}></div>
              {isPreviewMode ? (
                <h2 className={`text-4xl md:text-5xl font-black font-serif ${theme.titleText} leading-tight`}>
                  {item.title || "小节标题"}
                </h2>
              ) : (
                <textarea
                  value={item.title || ""}
                  onChange={(e) => handleItemUpdate(idx, 'title', e.target.value)}
                  className={`w-full bg-transparent text-4xl md:text-5xl font-black font-serif ${theme.titleText} border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none py-1 text-center resize-none overflow-hidden`}
                  rows={1}
                  placeholder="章节小标题"
                />
              )}
            </div>

            {/* First Section Big Image */}
            {isFirst && (
              <div className="w-full max-w-4xl mx-auto">
                <ImageSlot 
                  url={item.image_url}
                  prompt={item.image_prompt}
                  onPromptChange={(val) => handleItemUpdate(idx, 'image_prompt', val)}
                  onGenerate={() => onGenerateImage(idx)}
                  onRemove={() => onRemoveImage(idx)}
                  onUpload={(data) => onUploadImage(idx, data)}
                  isPreviewMode={isPreviewMode}
                  theme={theme}
                  className="aspect-[21/9]"
                  recommendSize="21:9 (1400x600px)"
                />
              </div>
            )}

            {/* Section Content */}
            <div className="max-w-3xl mx-auto w-full">
              {isPreviewMode ? (
                <p className={`text-xl md:text-2xl leading-[2.2] ${theme.bodyText} opacity-90 font-medium whitespace-pre-wrap font-serif`}>
                  {formatContent(item.desc) || "在这里输入长文详细内容..."}
                </p>
              ) : (
                <textarea
                  value={item.desc || ""}
                  onChange={(e) => handleItemUpdate(idx, 'desc', e.target.value)}
                  className={`w-full bg-transparent text-xl md:text-2xl leading-[2.2] ${theme.bodyText} opacity-90 font-medium outline-none resize-none min-h-[300px] font-serif border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20`}
                  placeholder="开始书写深度见解... (系统将自动处理分段)"
                />
              )}
            </div>
          </article>
          {/* Mid-Article Soul Quote (创新插页) */}
          {idx === 1 && content.quote && (
            <div className="py-24 flex flex-col items-center">
              <Quote className={`w-16 h-16 ${theme.accentText} opacity-10 mb-8`} />
              <p className={`max-w-2xl text-center text-3xl md:text-4xl font-black font-serif italic ${theme.titleText} leading-tight`}>
                “{content.quote}”
              </p>
              <div className={`mt-10 w-24 h-px ${theme.accentBg} opacity-30`}></div>
            </div>
          )}
          </Fragment>
        );
      })}

    </div>
  );
};

export default LongFormTemplate;
