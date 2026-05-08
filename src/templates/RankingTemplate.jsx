import React from 'react';
const RankingTemplate = ({ content, theme }) => (
  <div className="space-y-16 relative z-10">
    {content.rankings?.map((item, idx) => (
      <div key={idx} className="group space-y-6">
        <div className="flex items-center gap-5">
          <div className={`w-12 h-12 rounded-full ${theme.accentBg} flex items-center justify-center font-black ${theme.accentText} text-xl shadow-sm border border-white group-hover:scale-110 transition-all`}>
            {item.rank}
          </div>
          <h2 className={`text-2xl font-black font-serif ${theme.text}`}>{item.sign}</h2>
        </div>
        <div className={`${theme.highlight} rounded-[2rem] p-7 border ${theme.cardBorder} hover:shadow-md transition-all`}>
          <div className="flex justify-between items-center mb-4">
            <span className={`px-3 py-1 bg-white ${theme.accentText} text-xs font-black rounded-full border border-white/50 tracking-wide shadow-sm`}>{item.tag}</span>
            <span className="text-xl">{item.addictiveFactor}</span>
          </div>
          <p className={`text-sm font-sans leading-relaxed opacity-80 ${theme.text}`}>{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
);
export default RankingTemplate;
