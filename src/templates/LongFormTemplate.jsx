import React from 'react';
const LongFormTemplate = ({ content, theme }) => (
  <div className="space-y-12 relative z-10">
    {content.sections?.map((section, idx) => (
      <div key={idx} className="space-y-4">
        <h2 className={`text-2xl font-black font-serif ${theme.text}`}>{section.subtitle}</h2>
        <p className={`text-base font-sans leading-relaxed opacity-80 ${theme.text}`}>{section.content}</p>
      </div>
    ))}
  </div>
);
export default LongFormTemplate;
