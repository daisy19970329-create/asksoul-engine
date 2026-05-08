import React from 'react';
import { Camera, Sparkles, CheckCircle2 } from 'lucide-react';

const StepsGuideTemplate = ({ content, theme, onUpdate, isPreviewMode }) => {
  const handleStepUpdate = (index, field, value) => {
    const newSteps = [...(content.steps || [])];
    newSteps[index] = { ...newSteps[index], [field]: value };
    onUpdate({ ...content, steps: newSteps });
  };

  return (
    <div className="space-y-16 relative z-10 w-full">
      {(content.steps || []).map((step, idx) => (
        <div key={idx} className={`relative flex flex-col md:flex-row gap-10 items-start group`}>
          
          {/* Step Number & Connector */}
          <div className="flex flex-col items-center shrink-0 pt-2">
            <div className={`w-10 h-10 rounded-full ${theme.accentBg} ${theme.accentText} flex items-center justify-center font-black shadow-lg z-10`}>
              {idx + 1}
            </div>
            {idx < (content.steps.length - 1) && (
              <div className={`w-0.5 h-32 md:h-40 ${theme.cardBorder} border-dashed border-l-2 opacity-30 my-4`}></div>
            )}
          </div>

          {/* Step Content */}
          <div className={`flex-1 ${theme.highlight} rounded-[2.5rem] p-8 md:p-10 border ${theme.cardBorder} shadow-xl hover:shadow-2xl transition-all`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              <div className="space-y-4">
                {isPreviewMode ? (
                  <h3 className={`text-2xl md:text-3xl font-black font-serif ${theme.titleText}`}>
                    {step.title || "步骤名称"}
                  </h3>
                ) : (
                  <input
                    value={step.title || ""}
                    onChange={(e) => handleStepUpdate(idx, 'title', e.target.value)}
                    className={`w-full bg-transparent text-2xl md:text-3xl font-black font-serif ${theme.titleText} border-b border-dashed border-gray-300 focus:border-gray-500 outline-none pb-1`}
                    placeholder="步骤名"
                  />
                )}

                {isPreviewMode ? (
                  <p className={`text-base leading-relaxed opacity-80 ${theme.bodyText} font-medium`}>
                    {step.desc || "详细说明这个步骤应该如何执行..."}
                  </p>
                ) : (
                  <textarea
                    value={step.desc || ""}
                    onChange={(e) => handleStepUpdate(idx, 'desc', e.target.value)}
                    className={`w-full bg-transparent text-base leading-relaxed opacity-80 ${theme.bodyText} font-medium outline-none resize-none min-h-[80px]`}
                    placeholder="步骤详细描述..."
                  />
                )}
              </div>

              {/* Step Image */}
              <div className="space-y-4">
                <div className={`relative aspect-video rounded-3xl overflow-hidden ${theme.cardBg} border-2 ${theme.cardBorder} shadow-inner flex items-center justify-center`}>
                  {step.image_url ? (
                    <img src={step.image_url} alt={step.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center opacity-40">
                      <Camera className="w-10 h-10 mx-auto mb-2" />
                      <p className="text-[10px] font-black tracking-widest uppercase">Step Visual</p>
                    </div>
                  )}
                </div>
                
                {!isPreviewMode && (
                  <div className="flex items-center gap-2 px-4 opacity-50">
                    <Sparkles className="w-3 h-3" />
                    <input
                      value={step.image_prompt || ""}
                      onChange={(e) => handleStepUpdate(idx, 'image_prompt', e.target.value)}
                      className="flex-1 bg-black/5 rounded-lg px-3 py-1 text-[10px] font-mono outline-none"
                      placeholder="视觉提示词"
                    />
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepsGuideTemplate;
