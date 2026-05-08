import React from 'react';
const CompareTemplate = ({ content, theme }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
    {[content.optionA, content.optionB].filter(Boolean).map((option, idx) => (
      <div key={idx} className={`space-y-4 ${theme.highlight} p-8 rounded-[2rem] border ${theme.cardBorder}`}>
        <span className={`px-3 py-1 bg-white ${theme.accentText} text-xs font-black rounded-full border border-white/50 inline-block`}>{option.tag}</span>
        <h2 className={`text-2xl font-black font-serif ${theme.text}`}>{option.title}</h2>
        <p className={`text-base font-sans leading-relaxed opacity-80 ${theme.text}`}>{option.desc}</p>
      </div>
    ))}
  </div>
);
export default CompareTemplate;
