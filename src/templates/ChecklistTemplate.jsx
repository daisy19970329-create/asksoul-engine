import React from 'react';
import { CheckCircle2 } from 'lucide-react';
const ChecklistTemplate = ({ content, theme }) => (
  <div className="space-y-4 relative z-10">
    {content.items?.map((item, idx) => (
      <div key={idx} className={`flex gap-4 items-center ${theme.highlight} p-5 rounded-2xl border ${theme.cardBorder}`}>
        <CheckCircle2 className={`w-6 h-6 shrink-0 ${theme.accentText} opacity-70`} />
        <div>
          <h3 className={`font-bold font-serif text-lg ${theme.text}`}>{item.title}</h3>
          <p className={`text-sm font-sans opacity-70 ${theme.text}`}>{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
);
export default ChecklistTemplate;
