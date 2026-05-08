import { AlertCircle, Quote } from 'lucide-react';
import ImageSlot from '../components/ImageSlot';

const StepsGuideTemplate = ({ content, theme, onUpdate, isPreviewMode, onGenerateImage, onRemoveImage, onUploadImage }) => {
  const handleStepUpdate = (index, field, value) => {
    const newSteps = [...(content.steps || [])];
    newSteps[index] = { ...newSteps[index], [field]: value };
    onUpdate({ ...content, steps: newSteps });
  };

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto pl-12 md:pl-16">
      {/* Background Vertical Guide Line */}
      <div className={`absolute left-[2.2rem] md:left-[3.2rem] top-0 bottom-0 w-0.5 ${theme.accentBg} opacity-20`}></div>

      <div className="space-y-20">
        {(content.steps || []).map((step, idx) => {
          const showVisual = idx < 2;
          return (
            <div key={idx} className="relative group">
              
              {/* Step Number Dot */}
              <div className={`absolute -left-[3.1rem] md:-left-[4.1rem] top-1.5 w-8 h-8 rounded-full ${theme.accentBg} ${theme.accentText} flex items-center justify-center font-black text-sm shadow-xl z-20 border-2 border-white`}>
                {idx + 1}
              </div>

              {/* Step Content */}
              <div className="space-y-8 w-full max-w-2xl">
                <div className="space-y-3">
                  {isPreviewMode ? (
                    <h3 className={`text-2xl md:text-3xl font-black font-serif ${theme.titleText}`}>
                      {step.title || "步骤名称"}
                    </h3>
                  ) : (
                    <textarea
                      value={step.title || ""}
                      onChange={(e) => handleStepUpdate(idx, 'title', e.target.value)}
                      className={`w-full bg-transparent text-2xl md:text-3xl font-black font-serif ${theme.titleText} border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none py-1 resize-none overflow-hidden`}
                      rows={1}
                      placeholder="步骤名"
                    />
                  )}

                  {isPreviewMode ? (
                    <p className={`text-lg leading-relaxed opacity-80 ${theme.bodyText} font-medium`}>
                      {step.desc || "详细说明这个步骤..."}
                    </p>
                  ) : (
                    <textarea
                      value={step.desc || ""}
                      onChange={(e) => handleStepUpdate(idx, 'desc', e.target.value)}
                      className={`w-full bg-transparent text-lg leading-relaxed opacity-80 ${theme.bodyText} font-medium outline-none resize-none min-h-[60px] border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20`}
                      placeholder="步骤详细描述..."
                    />
                  )}
                </div>

                {/* Conditional Step Image */}
                {showVisual && (
                  <div className="w-full max-w-md">
                    <ImageSlot 
                      url={step.image_url}
                      prompt={step.image_prompt}
                      onPromptChange={(val) => handleStepUpdate(idx, 'image_prompt', val)}
                      onGenerate={() => onGenerateImage('steps', idx, step.image_prompt)}
                      onRemove={() => onRemoveImage('steps', idx)}
                      onUpload={(data) => onUploadImage('steps', idx, data)}
                      isPreviewMode={isPreviewMode}
                      theme={theme}
                      className="aspect-video"
                      recommendSize="16:9 (1200x675px)"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Steps Conclusion Modules */}
      <div className="mt-20 space-y-8">
        {content.soul_warning && (
          <div className={`${theme.igGradient} backdrop-blur-2xl rounded-[2.5rem] p-10 border ${theme.cardBorder} shadow-xl flex items-start gap-6`}>
            <div className={`p-4 bg-white/40 rounded-2xl ${theme.accentText} shrink-0`}>
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className={`font-black uppercase tracking-widest text-[10px] ${theme.accentText}`}>碎碎念 / Note</h4>
              <p className={`text-base leading-relaxed ${theme.bodyText} font-medium italic opacity-70`}>
                {content.soul_warning}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StepsGuideTemplate;
