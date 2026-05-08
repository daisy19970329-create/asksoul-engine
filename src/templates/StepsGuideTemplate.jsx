import React from 'react';
const StepsGuideTemplate = ({ content, theme }) => (
  <div className="space-y-8 relative z-10">
    {content.steps?.map((step, idx) => (
      <div key={idx} className={`flex gap-6 items-start ${theme.highlight} p-6 rounded-[2rem] border ${theme.cardBorder}`}>
        <div className={`w-10 h-10 shrink-0 rounded-full ${theme.accentBg} flex items-center justify-center font-black ${theme.accentText} text-lg`}>
          {idx + 1}
        </div>
        <div className="space-y-2">
          <h3 className={`font-black font-serif text-xl ${theme.text}`}>{step.title}</h3>
          <p className={`text-sm font-sans leading-relaxed opacity-80 ${theme.text}`}>{step.desc}</p>
        </div>
      </div>
    ))}
  </div>
);
export default StepsGuideTemplate;
