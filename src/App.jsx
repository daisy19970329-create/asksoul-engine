import React, { useState } from 'react';
import { Sparkles, Camera, Share2, Heart, Sun, Send, BookOpen, ChevronRight, MessageCircle, Palette, Globe, Layers, Upload } from 'lucide-react';
import RankingTemplate from './templates/RankingTemplate';
import ImageExplainerTemplate from './templates/ImageExplainerTemplate';
import LongFormTemplate from './templates/LongFormTemplate';
import StepsGuideTemplate from './templates/StepsGuideTemplate';
import CompareTemplate from './templates/CompareTemplate';
import ChecklistTemplate from './templates/ChecklistTemplate';

const THEME_MAP = {
 "Snow Alabaster": {
 bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#E5E7E9_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#D5D8DC_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#AEB6BF_0%,_transparent_50%)] bg-[#F2F4F4]",
 text: "text-[#2C3E50]",
 accentBg: "bg-[#D5D8DC]", accentText: "text-[#566573]",
 primaryBtn: "bg-white/40 backdrop-blur-md border border-white/50 text-[#2C3E50] font-bold rounded-full px-10 py-3 shadow-lg hover:shadow-xl transition-all",
 cardBg: "bg-white/60 backdrop-blur-3xl", cardBorder: "border-white/40", highlight: "bg-white/20", shadow: "shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]",
 watermark: "text-[#ABB2B9]", badgeBg: "bg-white/80", badgeText: "text-[#2C3E50]", titleText: "text-[#1B2631]", tagBg: "bg-[#D5D8DC]", tagText: "text-[#5D6D7E]", bodyText: "text-[#2E4053]", iconBg: "bg-[#D5D8DC]", iconText: "text-[#2C3E50]", quoteBg: "bg-white/30", quoteText: "text-[#1B2631]"
 },
 "Matcha Zen": {
 bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#D5DBDB_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#A9DFBF_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#7DCEA0_0%,_transparent_50%)] bg-[#E9F7EF]",
 text: "text-[#186A3B]",
 accentBg: "bg-[#D4EFDF]", accentText: "text-[#1E8449]",
 primaryBtn: "bg-[#1E8449] text-white font-bold rounded-full px-10 py-3 shadow-md hover:scale-105 transition-all",
 cardBg: "bg-white/70 backdrop-blur-2xl", cardBorder: "border-[#A9DFBF]", highlight: "bg-[#F4FBF7]", shadow: "shadow-[0_40px_100px_-20px_rgba(30,132,73,0.1)]",
 watermark: "text-[#A9DFBF]", badgeBg: "bg-[#D4EFDF]", badgeText: "text-[#186A3B]", titleText: "text-[#0B5345]", tagBg: "bg-[#D4EFDF]", tagText: "text-[#1E8449]", bodyText: "text-[#145A32]", iconBg: "bg-[#D4EFDF]", iconText: "text-[#1E8449]", quoteBg: "bg-[#D4EFDF]/50", quoteText: "text-[#186A3B]"
 },
 "Lavender Mist": {
 bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#E8DAEF_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#D2B4DE_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#BB8FCE_0%,_transparent_50%)] bg-[#F4ECF7]",
 text: "text-[#4A235A]",
 accentBg: "bg-[#EBDEF0]", accentText: "text-[#7D3C98]",
 primaryBtn: "bg-white/40 backdrop-blur-md border border-purple-200 text-[#7D3C98] font-bold rounded-full px-10 py-3 shadow-lg",
 cardBg: "bg-white/65 backdrop-blur-3xl", cardBorder: "border-white/50", highlight: "bg-[#FDFEFE]", shadow: "shadow-[0_40px_100px_-20px_rgba(125,60,152,0.1)]",
 watermark: "text-[#D2B4DE]", badgeBg: "bg-white/90", badgeText: "text-[#4A235A]", titleText: "text-[#2E1537]", tagBg: "bg-[#EBDEF0]", tagText: "text-[#7D3C98]", bodyText: "text-[#512E5F]", iconBg: "bg-[#EBDEF0]", iconText: "text-[#7D3C98]", quoteBg: "bg-[#EBDEF0]/40", quoteText: "text-[#4A235A]"
 },
 "Ocean Salt": {
 bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#D6EAF8_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#AED6F1_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#85C1E9_0%,_transparent_50%)] bg-[#EBF5FB]",
 text: "text-[#1B4F72]",
 accentBg: "bg-[#D4E6F1]", accentText: "text-[#2E86C1]",
 primaryBtn: "bg-white/50 backdrop-blur-md border border-blue-100 text-[#2E86C1] font-bold rounded-full px-10 py-3 shadow-md",
 cardBg: "bg-white/70 backdrop-blur-2xl", cardBorder: "border-white/60", highlight: "bg-blue-50/30", shadow: "shadow-[0_40px_100px_-20px_rgba(46,134,193,0.1)]",
 watermark: "text-[#AED6F1]", badgeBg: "bg-[#D4E6F1]", badgeText: "text-[#1B4F72]", titleText: "text-[#154360]", tagBg: "bg-white/90", tagText: "text-[#2E86C1]", bodyText: "text-[#21618C]", iconBg: "bg-blue-50/50", iconText: "text-[#2E86C1]", quoteBg: "bg-white/40", quoteText: "text-[#1B4F72]"
 },
 "Rose Clay": {
 bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#FADBD8_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#F5B7B1_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#F1948A_0%,_transparent_50%)] bg-[#FDEDEC]",
 text: "text-[#78281F]",
 accentBg: "bg-[#F9EBEA]", accentText: "text-[#943126]",
 primaryBtn: "bg-[#943126] text-white font-bold rounded-full px-10 py-3 shadow-md hover:bg-[#7B241C] transition-all",
 cardBg: "bg-white/65 backdrop-blur-3xl", cardBorder: "border-[#F5B7B1]", highlight: "bg-[#FEF9F9]", shadow: "shadow-[0_40px_100px_-20px_rgba(148,49,38,0.12)]",
 watermark: "text-[#F5B7B1]", badgeBg: "bg-[#F9EBEA]", badgeText: "text-[#78281F]", titleText: "text-[#641E16]", tagBg: "bg-[#F9EBEA]", tagText: "text-[#943126]", bodyText: "text-[#7B241C]", iconBg: "bg-[#F9EBEA]", iconText: "text-[#943126]", quoteBg: "bg-[#F9EBEA]/50", quoteText: "text-[#78281F]"
 },
 "Sunset Glow": {
 bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#FEF5E7_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#FDEBD0_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#FAD7A0_0%,_transparent_50%)] bg-[#FEF9E7]",
 text: "text-[#7E5109]",
 accentBg: "bg-[#FEF5E7]", accentText: "text-[#B7950B]",
 primaryBtn: "bg-gradient-to-br from-[#D4AC0D] to-[#B7950B] text-white font-bold rounded-full px-10 py-3 shadow-md hover:scale-105 transition-all",
 cardBg: "bg-white/70 backdrop-blur-2xl", cardBorder: "border-[#FDEBD0]", highlight: "bg-[#FFFDF9]", shadow: "shadow-[0_40px_100px_-20px_rgba(183,149,11,0.1)]",
 watermark: "text-[#FDEBD0]", badgeBg: "bg-[#FEF5E7]", badgeText: "text-[#7E5109]", titleText: "text-[#7D6608]", tagBg: "bg-[#FEF5E7]", tagText: "text-[#B7950B]", bodyText: "text-[#9A7D0A]", iconBg: "bg-[#FEF5E7]", iconText: "text-[#B7950B]", quoteBg: "bg-white/40", quoteText: "text-[#7E5109]"
 }
};

const PLACEHOLDER_DATA = {
 "Ranking": {
 title: "2024 年度治愈系生活方式排行榜",
 intro: "在这个快节奏的时代，我们比任何时候都更需要寻找内心的宁静。以下是经过深度调研得出的最能提升生活幸福感的治愈行为。",
 type: "Ranking",
 rankings: [
 { rank:1, sign: "清晨冥想", tag: "深度静心", desc: "在日出时分静坐10分钟，观察呼吸的流动。这不仅是身体的唤醒，更是灵魂的洗礼。", addictiveFactor: "静谧的力量" },
 { rank:2, sign: "午后阅读", tag: "精神食粮", desc: "放下手机，翻开一本纸质书。在墨香中与伟大的灵魂对话，感受时光的缓慢流淌。", addictiveFactor: "跨越时空的共鸣" },
 { rank:3, sign: "赤脚踏青", tag: "大地连接", desc: "脱掉鞋袜，让脚掌直接触碰泥土或草地。感受地球的频率，释放积压的静电与压力。", addictiveFactor: "原始的自由感" },
 { rank:4, sign: "整理空间", tag: "断舍离", desc: "清空一个抽屉或整理一片角落。在梳理外界秩序的同时，内心也会随之变得明亮通透。", addictiveFactor: "掌控感的回归" },
 { rank:5, sign: "慢煮时光", tag: "烟火气", desc: "为自己煮一壶茶或煲一锅汤。听水沸腾的声音，看热气升腾，在等待中习得耐心。", addictiveFactor: "生活的质感" }
 ],
 recommendations: [
 { id:1, title: "如何建立专属的早起仪式感", hot: true },
 { id:2, title: "冥想对焦虑症的科学改善建议", hot: false }
 ],
 quizzes: [{ title: "测一测你属于哪种疗愈型人格", color: "bg-pink-100 text-pink-700" }]
 },
 "ImageExplainer": {
 title: "透过这几张图，看清你潜意识里的渴望",
 intro: "心理学家认为，视觉选择往往投射出我们内心深处最真实的一面。请观察以下场景...",
 type: "ImageExplainer",
 items: [
 { title: "迷雾森林", interpretation: "你目前可能处于某种迷茫期，但内心依然保有探索未知的勇气。", image_prompt: "Mystical forest with fog, ethereal lighting", tag: "潜意识", warning: "别忽略内心信号", quote: "你看见的，就是你内心的一部分。" },
 { title: "孤寂灯塔", interpretation: "你是一个独立且坚定的人，在风浪中总能为他人提供方向。", image_prompt: "Lighthouse on a rocky cliff, cinematic", tag: "独立", warning: "别总一个人扛", quote: "光之所以珍贵，是因为它照亮黑夜。" }
 ],
 recommendations: [{ id:1, title: "你最近的情绪，是在自救还是自耗？", hot: true }],
 quizzes: [{ title: "测一测你潜意识最深的执念", color: "bg-pink-100 text-pink-700" }]
 },
 "LongForm": {
 title: "人工智能如何重塑未来的艺术创作？",
 intro: "从达芬奇到生成式AI，艺术的边界正在经历前所未有的扩张与重组。",
 type: "LongForm",
 sections: [
 { subtitle: "技术的画布：AI作为新型画笔", content: "AI并非取代艺术家，而是成为了一种具备无限可能的数字化‘超级画笔’。", image_prompt: "Editorial AI art concept, futuristic canvas" }
 ],
 recommendations: [{ id:1, title: "当技术成为艺术家的第二大脑", hot: true }],
 quizzes: [{ title: "测一测你的创作人格更像人类还是算法", color: "bg-pink-100 text-pink-700" }]
 },
 "StepsGuide": {
 title: "职场新人如何快速建立专业信任？",
 intro: "专业感不是演出来的，而是通过一件件靠谱的小事堆叠出来的逻辑闭环。",
 type: "StepsGuide",
 steps: [
 { title: "凡事有交代，件件有着落", desc: "收到指令第一时间回复，执行中定时汇报进度，完成后主动确认结果。", image_prompt: "Professional communication" }
 ],
 recommendations: [{ id:1, title: "为什么靠谱的人总能被看见", hot: true }],
 quizzes: [{ title: "测测你的职场信任值有多高", color: "bg-pink-100 text-pink-700" }]
 },
 "Compare": {
 title: "极简主义 vs 极繁主义：哪种更适合你？",
 intro: "生活的加法与减法，本质上是对生命重心的不同选择。",
 type: "Compare",
 optionA: { title: "极简主义 (Minimalism)", desc: "剥离多余的杂质，只留下最核心的本质。", tag: "Less is More" },
 optionB: { title: "极繁主义 (Maximalism)", desc: "热烈地拥抱一切美好。色彩的碰撞、物件的堆叠。", tag: "More is More" },
 recommendations: [{ id:1, title: "你真正需要的，不一定更多", hot: true }],
 quizzes: [{ title: "测一测你的生活方式偏极简还是极繁", color: "bg-pink-100 text-pink-700" }]
 },
 "Checklist": {
 title: "出发去冰岛前，请核对这份‘灵魂清单’",
 intro: "为了不让遗憾留在北大西洋的冷风里，请在行前确认以下事项。",
 type: "Checklist",
 items: [
 { title: "防水性能极佳的登山靴", desc: "相信我，冰岛的水是全方位的。" }
 ],
 recommendations: [{ id:1, title: "旅行前最容易被忽略的10件事", hot: true }],
 quizzes: [{ title: "测一测你属于哪种旅行人格", color: "bg-pink-100 text-pink-700" }]
 }
};

const App = () => {
 const [imageUrl, setImageUrl] = useState(null);
 const [isGenerating, setIsGenerating] = useState(false);
 const [isGeneratingContent, setIsGeneratingContent] = useState(false);
 const [isLiked, setIsLiked] = useState(false);
 const [isPreviewMode, setIsPreviewMode] = useState(false);
 const [topic, setTopic] = useState("");
 const [templateType, setTemplateType] = useState("Ranking");
 const [styleType, setStyleType] = useState("Snow Alabaster");
 const [language, setLanguage] = useState("繁体中文");
 const [articleContent, setArticleContent] = useState(PLACEHOLDER_DATA["Ranking"]);

 const handleTemplateChange = (type) => {
 setTemplateType(type);
 setArticleContent(PLACEHOLDER_DATA[type]);
 setImageUrl("");
 };

 const activeTheme = THEME_MAP[styleType] || THEME_MAP["Snow Alabaster"];

 const handleContentUpdate = (newContent) => {
 setArticleContent(newContent);
 };

 const generateArticle = async () => {
 if (!topic) return;
 setIsGeneratingContent(true);
 // Use the history API key
 const apiKey = "AIzaSyAK3JJ2jXvVCpCfWJSxcGkdM8L41qP-Lj0";

 let schemaPrompt = JSON.stringify(PLACEHOLDER_DATA[templateType]);
 const prompt = `You are a premium AI content curator. Subject: 【${topic}】. Language: ${language}. Style: ${styleType}. Output JSON strictly matching this schema: ${schemaPrompt}. Include 'recommendations' and 'quizzes' arrays at top level. Use double newlines for spacing.`;

 try {
 const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
 });
 const data = await resp.json();
 if (data.error) throw new Error(data.error.message);
 const raw = data.candidates[0].content.parts[0].text;
 const cleaned = raw.replace(/```json|```/g, '').trim();
 const parsed = JSON.parse(cleaned);
 setArticleContent({ ...parsed, type: templateType });
 } catch (err) {
 alert("Generation failed: " + err.message);
 } finally {
 setIsGeneratingContent(false);
 }
 };

 const generateImage = async () => {
 if (!topic) return;
 setIsGenerating(true);
 const seed = Math.floor(Math.random() * 1000);
 const url = `https://images.unsplash.com/photo-1518005020481-a78a88974554?auto=format&fit=crop&q=80&w=1200&h=675&sig=${seed}&${topic}`;
 setTimeout(() => { setImageUrl(url); setIsGenerating(false); }, 1000);
 };

 return (
 <div className={`min-h-screen ${activeTheme.bg} ${activeTheme.text} transition-all duration-1000 p-4 md:p-8 relative overflow-hidden`}>
 <div className="noise-overlay" />
 <div className="max-w-6xl mx-auto space-y-8 relative z-10">
 
 {/* Floating Toolbar */}
 <div className={`sticky top-4 z-50 flex items-center justify-between ${activeTheme.cardBg} rounded-full px-6 py-3 shadow-2xl border ${activeTheme.cardBorder} backdrop-blur-xl bg-opacity-90`}>
 <div className="flex items-center gap-3">
 <span className="font-serif-display text-xl italic tracking-wider">AskSoul</span>
 <div className={`w-px h-4 ${activeTheme.accentBg} opacity-50`}></div>
 <span className="font-bold tracking-widest uppercase text-[10px] opacity-60">Engine</span>
 </div>
 <div className="flex items-center gap-4">
 <div className="flex bg-black/5 rounded-full p-1">
 <button onClick={() => setIsPreviewMode(false)} className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${!isPreviewMode ? activeTheme.primaryBtn : 'text-gray-500'}`}>Edit</button>
 <button onClick={() => setIsPreviewMode(true)} className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${isPreviewMode ? activeTheme.primaryBtn : 'text-gray-500'}`}>Preview</button>
 </div>
 <button className={`px-6 py-2 rounded-full ${activeTheme.primaryBtn} text-sm font-black shadow-lg flex items-center gap-2`}><Send className="w-4 h-4" /> Publish</button>
 </div>
 </div>

 {/* Editor Controls */}
 {!isPreviewMode && (
 <div className={`${activeTheme.cardBg} rounded-2xl p-6 shadow-2xl border ${activeTheme.cardBorder}`}>
 <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
 <div className="md:col-span-1">
 <label className="text-xs font-bold opacity-70 mb-1 block">主题 (Topic)</label>
 <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="输入主题..." className={`w-full px-4 py-3 ${activeTheme.highlight} border ${activeTheme.cardBorder} rounded-xl outline-none`} />
 </div>
 <div>
 <label className="text-xs font-bold opacity-70 mb-1 block">模板</label>
 <select value={templateType} onChange={e => handleTemplateChange(e.target.value)} className={`w-full px-4 py-3 ${activeTheme.highlight} border ${activeTheme.cardBorder} rounded-xl outline-none`}>
 <option value="Ranking">排行榜 (Ranking)</option>
 <option value="ImageExplainer">图片解读 (ImageExplainer)</option>
 <option value="LongForm">长文 (LongForm)</option>
 <option value="StepsGuide">步骤指南 (StepsGuide)</option>
 <option value="Compare">对比 (Compare)</option>
 <option value="Checklist">清单 (Checklist)</option>
 </select>
 </div>
 <div>
 <label className="text-xs font-bold opacity-70 mb-1 block">风格</label>
 <select value={styleType} onChange={e => setStyleType(e.target.value)} className={`w-full px-4 py-3 ${activeTheme.highlight} border ${activeTheme.cardBorder} rounded-xl outline-none`}>
 {Object.keys(THEME_MAP).map(key => <option key={key} value={key}>{key}</option>)}
 </select>
 </div>
 <div>
 <label className="text-xs font-bold opacity-70 mb-1 block">语言</label>
 <select value={language} onChange={e => setLanguage(e.target.value)} className={`w-full px-4 py-3 ${activeTheme.highlight} border ${activeTheme.cardBorder} rounded-xl outline-none`}>
 <option value="繁体中文">繁体中文</option>
 <option value="简体中文">简体中文</option>
 <option value="English">English</option>
 </select>
 </div>
 <div className="flex items-end">
 <button onClick={generateArticle} disabled={isGeneratingContent || !topic} className={`w-full py-3 ${activeTheme.primaryBtn} rounded-xl font-black disabled:opacity-50 flex items-center justify-center gap-2`}>
 {isGeneratingContent ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : <Sparkles className="w-4 h-4" />} 一键生成
 </button>
 </div>
 </div>
 </div>
 )}

 {/* Main Content Layout */}
 <div className="flex flex-col md:flex-row gap-12 items-start relative">
 <div className="flex-1 space-y-12 min-w-0">
 {/* Cover Section */}
 <div className="space-y-8">
 <header className="text-center space-y-6">
 <div className={`inline-flex items-center px-4 py-1.5 rounded-full ${activeTheme.accentBg} ${activeTheme.accentText} text-sm font-semibold border ${activeTheme.cardBorder} shadow-sm`}>
 <Sun className="w-4 h-4 mr-2" /> AskSoul 专栏
 </div>
 <h1 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-sm px-4 max-w-4xl mx-auto">{articleContent.title}</h1>
 </header>

 <div className={`relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden ${activeTheme.cardBg} border-4 ${activeTheme.cardBorder} shadow-2xl flex items-center justify-center group`}>
 {imageUrl ? <img src={imageUrl} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <Camera className="w-12 h-12 opacity-20" />}
 </div>

 {!isPreviewMode && (
 <button onClick={generateImage} disabled={isGenerating} className={`w-full py-4 ${activeTheme.primaryBtn} rounded-2xl font-black shadow-lg flex justify-center items-center gap-2`}>
 <Sparkles className="w-5 h-5" /> {imageUrl ? "重新生成封面" : "生成 AI 封面"}
 </button>
 )}
 </div>

 {/* Article Content */}
 <div className={`rounded-[3rem] ${activeTheme.cardBg} shadow-2xl border ${activeTheme.cardBorder} premium-card-shadow overflow-hidden`}>
 <div className="p-8 md:p-16 space-y-20 relative">
 <div className="max-w-3xl mx-auto">
 <p className={`text-xl md:text-2xl leading-[1.8] font-serif font-medium pl-8 border-l-4 ${activeTheme.accentText} border-opacity-30 opacity-90 italic whitespace-pre-wrap`}>{articleContent.intro}</p>
 </div>

 {/* Dynamic Template Selection */}
 {articleContent.type === "Ranking" && <RankingTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
 {articleContent.type === "ImageExplainer" && <ImageExplainerTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
 {articleContent.type === "LongForm" && <LongFormTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
 {articleContent.type === "StepsGuide" && <StepsGuideTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
 {articleContent.type === "Compare" && <CompareTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
 {articleContent.type === "Checklist" && <ChecklistTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
 </div>

 {/* Article Footer */}
 <div className="px-10 py-12 border-t border-gray-100 border-opacity-30 flex flex-col items-center gap-8">
 <div className="flex flex-col items-center gap-3 text-center">
 <div className={`w-12 h-1.5 ${activeTheme.accentBg} rounded-full opacity-20`}></div>
 <p className={`text-[10px] font-black tracking-[0.5em] uppercase ${activeTheme.accentText} opacity-40 font-serif-display italic`}>AskSoul.me</p>
 </div>
 <div className="flex items-center gap-6">
 <button onClick={() => setIsLiked(!isLiked)} className={`p-5 rounded-full ${isLiked ? 'bg-rose-500 text-white' : activeTheme.accentBg + ' ' + activeTheme.accentText} shadow-xl border border-white/50 transition-all`}>
 <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
 </button>
 </div>
 </div>
 </div>
 </div>

 {/* Right Sidebar */}
 <div className="w-full md:w-[360px] flex-shrink-0 space-y-8 md:sticky md:top-24">
 <div className={`${activeTheme.cardBg} rounded-[2.5rem] p-7 border ${activeTheme.cardBorder} shadow-xl transition-all duration-500`}>
 <div className="flex items-center gap-2 mb-6">
 <div className={`p-2 ${activeTheme.accentBg} rounded-xl ${activeTheme.accentText}`}><BookOpen className="w-5 h-5" /></div>
 <h3 className="font-black">热门推荐</h3>
 </div>
 <div className="space-y-6">
 {(articleContent.recommendations || []).map((item, idx) => (
 <div key={idx} className={`group cursor-pointer border-b ${activeTheme.cardBorder} pb-4 last:border-0 last:pb-0`}>
 <p className="text-sm font-bold leading-relaxed">{item.title}</p>
 </div>
 ))}
 </div>
 </div>

 <div className={`${activeTheme.cardBg} rounded-[2.5rem] p-7 border ${activeTheme.cardBorder} shadow-xl transition-all duration-500`}>
 <div className="flex items-center gap-2 mb-6">
 <div className={`p-2 ${activeTheme.accentBg} rounded-xl ${activeTheme.accentText}`}><MessageCircle className="w-5 h-5" /></div>
 <h3 className="font-black">心灵测验</h3>
 </div>
 <div className="space-y-4">
 {(articleContent.quizzes || []).map((quiz, idx) => (
 <div key={idx} className={`${quiz.color || 'bg-blue-100 text-blue-700'} p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:scale-105 transition-all`}>
 <span className="font-bold text-sm">{quiz.title}</span>
 <ChevronRight className="w-4 h-4" />
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};

export default App;