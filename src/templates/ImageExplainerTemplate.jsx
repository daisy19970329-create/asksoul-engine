import React from 'react';
const ImageExplainerTemplate = ({ content, theme }) => (
  <div className="space-y-8 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {content.items?.map((item, idx) => (
        <div key={idx} className={`group ${theme.highlight} rounded-[2rem] p-6 border ${theme.cardBorder} hover:shadow-md transition-all`}>
          <h3 className={`font-black font-serif text-xl ${theme.text} mb-3`}>{item.title}</h3>
          <p className={`text-sm font-sans leading-relaxed opacity-80 ${theme.text}`}>{item.interpretation}</p>
        </div>
      ))}
    </div>
  </div>
);
export default ImageExplainerTemplate;
