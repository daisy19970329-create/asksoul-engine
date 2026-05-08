import React, { useState } from 'react';
import { Sparkles, Camera, Share2, Check, Heart, Sun, Send, BookOpen, ChevronRight, MessageCircle, Palette, Globe, Layers, Upload, Quote, AlertCircle } from 'lucide-react';
import RankingTemplate from './templates/RankingTemplate';
import ImageExplainerTemplate from './templates/ImageExplainerTemplate';
import LongFormTemplate from './templates/LongFormTemplate';
import StepsGuideTemplate from './templates/StepsGuideTemplate';
import CompareTemplate from './templates/CompareTemplate';
import ChecklistTemplate from './templates/ChecklistTemplate';
import SEOMetadataPanel from './components/SEOMetadataPanel';
import ImageSlot from './components/ImageSlot';

const THEME_MAP = {
  "Snow Alabaster": {
    bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#F0F4F8_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#E1E8F0_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#D1D9E6_0%,_transparent_50%)] bg-[#F8FAFB]",
    text: "text-[#4A5568]",
    accentBg: "bg-[#E2E8F0]", accentText: "text-[#64748B]",
    primaryBtn: "bg-white/40 backdrop-blur-md border border-white/60 text-[#4A5568] font-bold rounded-full px-10 py-3 shadow-sm hover:shadow-md transition-all",
    cardBg: "bg-white/45 backdrop-blur-3xl", cardBorder: "border-white/50", highlight: "bg-white/20", shadow: "shadow-[0_20px_60px_-15px_rgba(100,116,139,0.05)]",
    watermark: "text-[#CBD5E1]", badgeBg: "bg-white/80", badgeText: "text-[#475569]", titleText: "text-[#1E293B]", tagBg: "bg-[#F1F5F9]", tagText: "text-[#64748B]", bodyText: "text-[#334155]", iconBg: "bg-[#F1F5F9]", iconText: "text-[#475569]", quoteBg: "bg-white/20", quoteText: "text-[#0F172A]",
    titleStyle: "font-black tracking-tight",
    igGradient: "bg-gradient-to-br from-slate-100/80 via-blue-50/80 to-gray-100/80"
  },
  "Matcha Zen": {
    bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#EBF5EC_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#D5E8D9_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#BBD6BE_0%,_transparent_50%)] bg-[#F1F8F2]",
    text: "text-[#344E41]",
    accentBg: "bg-[#DADEDC]", accentText: "text-[#588157]",
    primaryBtn: "bg-[#588157] text-white font-bold rounded-full px-10 py-3 shadow-lg hover:bg-[#3A5A40] transition-all",
    cardBg: "bg-white/50 backdrop-blur-2xl", cardBorder: "border-[#D5E8D9]", highlight: "bg-[#F8FCF9]", shadow: "shadow-[0_25px_70px_-20px_rgba(58,90,64,0.08)]",
    watermark: "text-[#A3B18A]", badgeBg: "bg-[#DADEDC]", badgeText: "text-[#344E41]", titleText: "text-[#344E41]", tagBg: "bg-[#E9EDC9]", tagText: "text-[#588157]", bodyText: "text-[#3A5A40]", iconBg: "bg-[#DADEDC]", iconText: "text-[#588157]", quoteBg: "bg-[#DADEDC]/40", quoteText: "text-[#344E41]",
    titleStyle: "font-black tracking-normal leading-[1.1]",
    igGradient: "bg-gradient-to-br from-emerald-50/90 via-stone-50/90 to-teal-50/80"
  },
  "Lavender Mist": {
    bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#F5F3FF_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#EDE9FE_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#DDD6FE_0%,_transparent_50%)] bg-[#FAF9FF]",
    text: "text-[#4C1D95]",
    accentBg: "bg-[#F3E8FF]", accentText: "text-[#7C3AED]",
    primaryBtn: "bg-white/50 backdrop-blur-lg border border-purple-100 text-[#7C3AED] font-bold rounded-full px-10 py-3 shadow-md hover:shadow-xl",
    cardBg: "bg-white/55 backdrop-blur-3xl", cardBorder: "border-white/60", highlight: "bg-[#FDFBFF]", shadow: "shadow-[0_30px_80px_-25px_rgba(124,58,237,0.06)]",
    watermark: "text-[#C4B5FD]", badgeBg: "bg-white/90", badgeText: "text-[#4C1D95]", titleText: "text-[#2E1065]", tagBg: "bg-[#F5F3FF]", tagText: "text-[#8B5CF6]", bodyText: "text-[#5B21B6]", iconBg: "bg-[#EDE9FE]", iconText: "text-[#7C3AED]", quoteBg: "bg-[#F3E8FF]/30", quoteText: "text-[#4C1D95]",
    titleStyle: "font-black tracking-tight",
    igGradient: "bg-gradient-to-br from-purple-100/80 via-fuchsia-100/80 to-pink-100/80"
  },
  "Ocean Salt": {
    bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#F0F9FF_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#E0F2FE_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#BAE6FD_0%,_transparent_50%)] bg-[#F8FCFF]",
    text: "text-[#075985]",
    accentBg: "bg-[#E0F2FE]", accentText: "text-[#0284C7]",
    primaryBtn: "bg-[#0284C7] text-white font-bold rounded-full px-10 py-3 shadow-xl hover:bg-[#0369A1] transition-all",
    cardBg: "bg-white/40 backdrop-blur-2xl", cardBorder: "border-white/70", highlight: "bg-blue-50/20", shadow: "shadow-[0_20px_60px_-15px_rgba(14,165,233,0.07)]",
    watermark: "text-[#7DD3FC]", badgeBg: "bg-[#F0F9FF]", badgeText: "text-[#075985]", titleText: "text-[#0C4A6E]", tagBg: "bg-[#E0F2FE]", tagText: "text-[#0284C7]", bodyText: "text-[#0369A1]", iconBg: "bg-[#F0F9FF]", iconText: "text-[#0284C7]", quoteBg: "bg-white/30", quoteText: "text-[#075985]",
    titleStyle: "font-black tracking-wide",
    igGradient: "bg-gradient-to-br from-sky-100/80 via-cyan-50/80 to-blue-100/80"
  },
  "Rose Clay": {
    bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#FFF1F2_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#FFE4E6_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#FECDD3_0%,_transparent_50%)] bg-[#FFF5F5]",
    text: "text-[#881337]",
    accentBg: "bg-[#FFE4E6]", accentText: "text-[#E11D48]",
    primaryBtn: "bg-[#E11D48] text-white font-bold rounded-full px-10 py-3 shadow-lg hover:bg-[#BE123C] transition-all",
    cardBg: "bg-white/45 backdrop-blur-3xl", cardBorder: "border-[#FFE4E6]", highlight: "bg-[#FFF9F9]", shadow: "shadow-[0_35px_90px_-30px_rgba(225,29,72,0.09)]",
    watermark: "text-[#FDA4AF]", badgeBg: "bg-[#FFF1F2]", badgeText: "text-[#881337]", titleText: "text-[#4C0519]", tagBg: "bg-[#FFE4E6]", tagText: "text-[#BE123C]", bodyText: "text-[#9F1239]", iconBg: "bg-[#FFF1F2]", iconText: "text-[#E11D48]", quoteBg: "bg-[#FFE4E6]/40", quoteText: "text-[#881337]",
    titleStyle: "font-black tracking-tighter",
    igGradient: "bg-gradient-to-br from-rose-100/80 via-red-50/80 to-pink-100/80"
  },
  "Sunset Glow": {
    bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#FFFBEB_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#FEF3C7_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#FDE68A_0%,_transparent_50%)] bg-[#FFFDF7]",
    text: "text-[#92400E]",
    accentBg: "bg-[#FEF3C7]", accentText: "text-[#D97706]",
    primaryBtn: "bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white font-bold rounded-full px-10 py-3 shadow-xl hover:scale-105 transition-all",
    cardBg: "bg-white/60 backdrop-blur-2xl", cardBorder: "border-[#FDE68A]", highlight: "bg-[#FFFDF9]", shadow: "shadow-[0_25px_70px_-20px_rgba(217,119,6,0.08)]",
    watermark: "text-[#FCD34D]", badgeBg: "bg-[#FEF3C7]", badgeText: "text-[#92400E]", titleText: "text-[#78350F]", tagBg: "bg-[#FFFBEB]", tagText: "text-[#D97706]", bodyText: "text-[#B45309]", iconBg: "bg-[#FEF3C7]", iconText: "text-[#D97706]", quoteBg: "bg-white/40", quoteText: "text-[#92400E]",
    titleStyle: "font-black tracking-normal",
    igGradient: "bg-gradient-to-br from-orange-50/90 via-stone-50/90 to-amber-50/80"
  }
};

const PLACEHOLDER_DATA = {
  "Ranking": {
    title: "2024 年度治愈系生活方式排行榜",
    intro: "在这个快节奏的时代，我们比任何时候都更需要寻找内心的宁静。",
    type: "Ranking",
    rankings: [
      { rank:1, sign: "清晨冥想", tag: "深度静心", desc: "在日出时分静坐10分钟，观察呼吸的流动。", addictiveFactor: "静谧的力量" },
      { rank:2, sign: "午后阅读", tag: "精神食粮", desc: "放下手机，翻开一本纸质书。", addictiveFactor: "跨越时空的共鸣" },
      { rank:3, sign: "赤脚踏青", tag: "大地连接", desc: "脱掉鞋袜，让脚掌直接触碰泥土或草地。", addictiveFactor: "原始的自由感" },
      { rank:4, sign: "整理空间", tag: "断舍离", desc: "清空一个抽屉或整理一片角落。", addictiveFactor: "掌控感的回归" },
      { rank:5, sign: "慢煮时光", tag: "烟火气", desc: "为自己煮一壶茶或煲一锅汤。", addictiveFactor: "生活的质感" },
      { rank:6, sign: "晚间散步", tag: "慢节奏", desc: "在落日余晖中随意行走。", addictiveFactor: "放松身心" },
      { rank:7, sign: "书写日记", tag: "自我对话", desc: "记录当下的感受与思考。", addictiveFactor: "内心的宁静" },
      { rank:8, sign: "深度睡眠", tag: "修复力", desc: "关掉灯光，彻底放松。", addictiveFactor: "能量补给" }
    ],
    recommendations: [{ id:1, title: "如何建立专属的早起仪式感", hot: true }],
    quizzes: [{ title: "测一测你属于哪种疗愈型人格", color: "bg-pink-100 text-pink-700" }],
    quote: "每个人都是一颗独立的星球，在寒冷的宇宙里，努力散发着微弱却坚定的光。",
    soul_warning: "记得在照顾所有人之前，先把自己照顾好。你的情绪价值不应该建立在自我损耗之上。"
  },
  "ImageExplainer": {
    title: "透过这几张图，看清你潜意识里的渴望",
    intro: "心理学家认为，视觉选择往往投射出我们内心深处最真实的一面。",
    type: "ImageExplainer",
    main: {
      image_prompt: "Mystical forest, healing scene, dreamy vibe",
      image_url: ""
    },
    items: [
      { title: "迷雾森林", interpretation: "你目前可能处于某种迷茫期。", tag: "潜意识", warning: "别忽略信号" },
      { title: "孤寂灯塔", interpretation: "你是一个独立且坚定的人。", tag: "独立", warning: "别总一个人扛" },
      { title: "平静湖面", interpretation: "你内心渴望长久的安宁。", tag: "安宁", warning: "小心停滞不前" },
      { title: "繁华闹市", interpretation: "你对社交和连接有强烈需求。", tag: "连接", warning: "别迷失在人群中" }
    ],
    recommendations: [{ id:1, title: "你最近的情绪，是在自救还是自耗？", hot: true }],
    quizzes: [{ title: "测一测你潜意识最深的执念", color: "bg-pink-100 text-pink-700" }],
    quote: "眼睛是灵魂的窗户，而潜意识则是推开窗户后，那个更深邃的房间。",
    soul_warning: "看清真相往往伴随着阵痛，但这正是成长的开始。不要害怕面对那个‘不完美’的自己。"
  },
  "LongForm": {
    title: "人工智能如何重塑未来的艺术创作？",
    intro: "艺术的边界正在经历前所未有的扩张与重组。",
    type: "LongForm",
    sections: [
      { subtitle: "技术的画布", content: "AI成为了数字化‘超级画笔’。", image_prompt: "AI art concept" },
      { subtitle: "创意的新源泉", content: "算法与人类灵感的碰撞。", image_prompt: "" },
      { subtitle: "审美范式的转移", content: "新的艺术风格正在诞生。", image_prompt: "" },
      { subtitle: "艺术的未来", content: "人机协作将成为主流。", image_prompt: "" }
    ],
    recommendations: [{ id:1, title: "当技术成为艺术家的第二大脑", hot: true }],
    quizzes: [{ title: "测一测你的创作人格", color: "bg-pink-100 text-pink-700" }],
    quote: "技术永远只是工具，唯有灵魂深处的颤动，才能赋予艺术真正的生命。",
    soul_warning: "在追求效率的时代，请警惕‘流水线式’的审美。不要让算法完全取代你独特的直觉。"
  },
  "StepsGuide": {
    title: "职场新人如何快速建立专业信任？",
    intro: "专业感不是演出来的，而是堆叠出来的逻辑闭环。",
    type: "StepsGuide",
    steps: [
      { title: "凡事有交代", desc: "收到指令第一时间回复。", image_prompt: "Communication" },
      { title: "件件有着落", desc: "执行中定时汇报进度。", image_prompt: "Progress" },
      { title: "事事有回音", desc: "完成后主动确认结果。", image_prompt: "" },
      { title: "时间有预判", desc: "合理安排工作优先级。", image_prompt: "" },
      { title: "专业有沉淀", desc: "总结经验，不断复盘。", image_prompt: "" }
    ],
    recommendations: [{ id:1, title: "为什么靠谱的人总能被看见", hot: true }],
    quizzes: [{ title: "测测你的职场信任值", color: "bg-pink-100 text-pink-700" }],
    quote: "职场是一场马拉松，暂时的领先并不代表终点，唯有始终如一的踏实才是护身符。",
    soul_warning: "过度追求‘专业感’可能会让你显得冷漠。在逻辑闭环之外，请保留一份属于人的温度。"
  },
  "Compare": {
    title: "极简主义 vs 极繁主义",
    intro: "生活的加法与减法。",
    type: "Compare",
    optionA: { title: "极简主义", desc: "剥离多余，留下核心。", tag: "Less is More", image_prompt: "Minimalism" },
    optionB: { title: "极繁主义", desc: "拥抱一切美好。", tag: "More is More", image_prompt: "Maximalism" },
    recommendations: [{ id:1, title: "你真正需要的，不一定更多", hot: true }],
    quizzes: [{ title: "测一测你的生活方式", color: "bg-pink-100 text-pink-700" }],
    quote: "繁花与荒野，都有它们存在的意义。关键不在于你拥有多少，而在于你是否在其中感到自由。",
    soul_warning: "所有的‘主义’都只是路径，而不是终点。不要为了合群而强行改变自己的生存逻辑。"
  },
  "Checklist": {
    title: "出发去冰岛前核对清单",
    intro: "行前确认以下事项。",
    type: "Checklist",
    items: [
      { title: "防水登山靴", desc: "冰岛的水是全方位的。" },
      { title: "保暖内衣", desc: "层叠穿法是王道。" },
      { title: "相机备用电池", desc: "低温环境下电量消耗快。" },
      { title: "防水外套", desc: "遮风挡雨必不可少。" },
      { title: "离线地图", desc: "部分地区信号微弱。" },
      { title: "转换插头", desc: "欧标双圆孔。" },
      { title: "急救包", desc: "安全第一。" },
      { title: "好心情", desc: "这是最重要的。" }
    ],
    recommendations: [{ id:1, title: "旅行前最容易忽略的事", hot: true }],
    quizzes: [{ title: "测一测你的旅行人格", color: "bg-pink-100 text-pink-700" }],
    quote: "出发的意义不在于抵达，而在于你决定推开门的那一刻。",
    soul_warning: "清单可以穷尽物资，但无法穷尽意外。保持随遇而安的心态，才是旅途中最坚硬的铠甲。",
    seo: { slug: "iceland-travel-checklist", title: "出发去冰岛前必看的 8 件事", description: "冰岛旅行终极核对清单，带你避坑。", keywords: "冰岛, 旅游, 清单" }
  }
};

const App = () => {
 const [imageUrl, setImageUrl] = useState(null);
 const [isGenerating, setIsGenerating] = useState(false);
 const [isGeneratingContent, setIsGeneratingContent] = useState(false);
 const [isLiked, setIsLiked] = useState(false);
 const [isCopied, setIsCopied] = useState(false);
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
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    let schemaPrompt = JSON.stringify(PLACEHOLDER_DATA[templateType]);
    
    let countConstraints = "";
    if (templateType === "Ranking") countConstraints = "Generate EXACTLY 8 items. Each item's description must be 120-150 words for deep emotional insight.";
    if (templateType === "ImageExplainer") countConstraints = "Generate EXACTLY 4 items. Each interpretation must be 100-150 words to explain the hidden emotion.";
    if (templateType === "LongForm") countConstraints = "Generate EXACTLY 4 chapters. Each chapter content MUST be 200-300 words with elegant prose.";
    if (templateType === "StepsGuide") countConstraints = "Generate EXACTLY 5 steps. Each step description should be around 100 words.";
    if (templateType === "Checklist") countConstraints = "Generate EXACTLY 8 items. Each item description should be short but impactful.";
    if (templateType === "Compare") countConstraints = "Generate 2 options (A and B). Each 'desc' block MUST be detailed and comprehensive (150-200 words) to highlight the core contrast.";

    const prompt = `You are a Taiwan IG/Threads Million-follower Healing Emotional Expert (台湾 IG/Threads 百万粉疗愈系情感专家). 
Maintain a warm, soft, but crystal clear (温软清醒) tone. Your voice should feel like a late-night conversation that is both healing and enlightening. 
Expertise: Astrology, MBTI, Love Psychology, and Emotional Value.

Subject: 【${topic}】. 
Language (lang): ${language}. 
Style: ${styleType}. 
Template: ${templateType}.
Constraints: ${countConstraints}

Output Requirements:
1. ALL content MUST be in ${language}. 
2. Writing Style: 
   - Force short sentence structures (强制短句分组).
   - Single content blocks must be refined to 100-150 characters/words (精炼文案), ensuring they fit beautifully within premium card layouts.
   - Use intentional white space (刻意留白) to create a high-end, breathable aesthetic.
   - Subtitles and item titles MUST be poetic and emotionally resonant (e.g., '被温柔包裹的瞬间' instead of '第一名：冥想'), avoid mechanical or listicle-style naming.
   - For 'LongForm' or long descriptions, use frequent double newlines (\\n\\n) to group sentences for a comfortable reading experience.
3. IMPORTANT: The 'seo' object MUST include 'slug' (English with hyphens), 'title', 'description', and 'keywords' (a comma-separated list of 5-8 high-value SEO keywords in ${language} based on the topic).
4. recommendations & quizzes: Strictly follow the healing persona's tone.
5. Soul Modules (NEW): 
   - 'quote': A single, punchy, Instagram-style inspirational quote (20-40 words).
   - 'soul_warning': A warm but serious psychological warning or advice for the reader (40-60 words).
6. Image Prompt Requirements (CRITICAL):
   Every 'image_prompt' in the JSON MUST strictly follow this format:
   "[Template: ${templateType}] [Style: ${styleType}] [Topic: ${topic}] [Composition: {ratio}] [Keywords: 杂志感, 疗愈感, 梦幻感, {generated_keywords}]"
   - {ratio} should be: '16:9 (1200x675px)' for cover/LongForm/StepsGuide/ImageExplainer, and '1:1 (800x800px)' for Ranking/Compare.
   - {generated_keywords} should be 3-5 specific, high-quality English keywords extracted from the content to make the image relevant to the text.

Output JSON strictly matching this schema: ${schemaPrompt}. 
Include 'recommendations', 'quizzes' AND an 'seo' object at the top level. 
Use double newlines for paragraph spacing in descriptions.`;

 try {
  const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
 });
 const data = await resp.json();
 if (data.error) throw new Error(data.error.message);
 const raw = data.candidates[0].content.parts[0].text;
 const cleaned = raw.replace(/```json|```/g, '').trim();
 const parsed = JSON.parse(cleaned);
  
  // Ensure SEO data is present even if AI missed it
  if (!parsed.seo) {
    parsed.seo = {
      slug: topic.toLowerCase().replace(/\s+/g, '-'),
      title: parsed.title || topic,
      description: parsed.intro || "",
      keywords: topic
    };
  }
  
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
    const styleSuffix = "minimalism, cinematic lighting, high-end photography";
    const url = `https://images.unsplash.com/photo-1518005020481-a78a88974554?auto=format&fit=crop&q=80&w=1200&h=675&sig=${seed}&${encodeURIComponent(topic + " " + styleSuffix)}`;
    setTimeout(() => { setImageUrl(url); setIsGenerating(false); }, 1000);
  };

  const generateItemImage = async (path, index, customPrompt, optionKey = null) => {
    const seed = Math.floor(Math.random() * 10000);
    const styleSuffix = "minimalism, cinematic lighting, editorial style, 4k";
    const finalPrompt = `${customPrompt}, ${styleSuffix}`;
    const url = `https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800&sig=${seed}&${encodeURIComponent(finalPrompt)}`;

    const newContent = { ...articleContent };
    if (optionKey) {
      newContent[optionKey].image_url = url;
    } else if (path === 'items') {
      newContent.items[index].image_url = url;
    } else if (path === 'rankings') {
      newContent.rankings[index].image_url = url;
    } else if (path === 'sections') {
      newContent.sections[index].image_url = url;
    } else if (path === 'steps') {
      newContent.steps[index].image_url = url;
    }
    setArticleContent(newContent);
  };

  const removeItemImage = (path, index, optionKey = null) => {
    const newContent = { ...articleContent };
    if (optionKey) {
      newContent[optionKey].image_url = "";
    } else if (path === 'items') {
      newContent.items[index].image_url = "";
    } else if (path === 'rankings') {
      newContent.rankings[index].image_url = "";
    } else if (path === 'sections') {
      newContent.sections[index].image_url = "";
    } else if (path === 'steps') {
      newContent.steps[index].image_url = "";
    }
    setArticleContent(newContent);
  };

  const uploadItemImage = (path, index, fileData, optionKey = null) => {
    const newContent = { ...articleContent };
    if (optionKey) {
      newContent[optionKey].image_url = fileData;
    } else if (path === 'items') {
      newContent.items[index].image_url = fileData;
    } else if (path === 'rankings') {
      newContent.rankings[index].image_url = fileData;
    } else if (path === 'sections') {
      newContent.sections[index].image_url = fileData;
    } else if (path === 'steps') {
      newContent.steps[index].image_url = fileData;
    }
    setArticleContent(newContent);
  };

  return (
    <div className={`min-h-screen ${activeTheme.bg} ${activeTheme.text} transition-all duration-1000 p-4 md:p-8 relative overflow-hidden`}>
 <div className="noise-overlay" />
 <div className="max-w-6xl mx-auto space-y-8 relative z-10">
 
 {/* Floating Toolbar */}
 <div className={`sticky top-4 z-50 flex items-center justify-between ${activeTheme.igGradient} rounded-full px-6 py-3 shadow-2xl border ${activeTheme.cardBorder} backdrop-blur-xl bg-opacity-90`}>
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
 <div className={`${activeTheme.igGradient} backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border ${activeTheme.cardBorder}`}>
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
 <option value="日本語">日本語</option>
 <option value="Français">Français</option>
 <option value="Deutsch">Deutsch</option>
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
    {isPreviewMode ? (
      <h1 className={`text-4xl md:text-6xl ${activeTheme.titleStyle} leading-tight drop-shadow-sm px-4 max-w-4xl mx-auto`}>{articleContent.title}</h1>
    ) : (
      <textarea
        value={articleContent.title}
        onChange={(e) => handleContentUpdate({ ...articleContent, title: e.target.value })}
        className={`w-full text-4xl md:text-6xl ${activeTheme.titleStyle} leading-tight text-center bg-transparent border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none resize-none overflow-hidden`}
        rows={2}
      />
    )}
 </header>

  <div className="w-full">
    <ImageSlot 
      url={imageUrl}
      prompt={topic}
      onPromptChange={setTopic}
      onGenerate={generateImage}
      onRemove={() => setImageUrl("")}
      onUpload={setImageUrl}
      isPreviewMode={isPreviewMode}
      theme={activeTheme}
      className="aspect-[16/9]"
      recommendSize="16:9 (1200x675px)"
    />
  </div>
 </div>

 {/* Article Content */}
 <div className={`rounded-[3rem] ${activeTheme.igGradient} backdrop-blur-3xl shadow-2xl border ${activeTheme.cardBorder} premium-card-shadow overflow-hidden`}>
 <div className="p-8 md:p-16 space-y-20 relative">
 <div className="max-w-3xl mx-auto">
      {isPreviewMode ? (
        <p className={`text-xl md:text-2xl leading-[1.8] font-serif font-medium pl-8 border-l-4 ${activeTheme.accentText} border-opacity-30 opacity-90 italic whitespace-pre-wrap`}>{articleContent.intro}</p>
      ) : (
        <div className={`pl-8 border-l-4 ${activeTheme.accentText} border-opacity-30`}>
          <textarea
            value={articleContent.intro}
            onChange={(e) => handleContentUpdate({ ...articleContent, intro: e.target.value })}
            className={`w-full text-xl md:text-2xl leading-[1.8] font-serif font-medium bg-transparent border-2 border-dashed border-transparent hover:border-black/10 focus:border-black/20 outline-none resize-none italic opacity-90`}
            rows={4}
          />
        </div>
      )}
 </div>

 {/* Dynamic Template Selection */}
  {articleContent.type === "Ranking" && <RankingTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} onGenerateImage={generateItemImage} onRemoveImage={removeItemImage} onUploadImage={uploadItemImage} />}
  {articleContent.type === "ImageExplainer" && <ImageExplainerTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} onGenerateImage={generateItemImage} onRemoveImage={removeItemImage} onUploadImage={uploadItemImage} />}
  {articleContent.type === "LongForm" && <LongFormTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} onGenerateImage={generateItemImage} onRemoveImage={removeItemImage} onUploadImage={uploadItemImage} />}
  {articleContent.type === "StepsGuide" && <StepsGuideTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} onGenerateImage={generateItemImage} onRemoveImage={removeItemImage} onUploadImage={uploadItemImage} />}
  {articleContent.type === "Compare" && <CompareTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} onGenerateImage={generateItemImage} onRemoveImage={removeItemImage} onUploadImage={uploadItemImage} />}
  {articleContent.type === "Checklist" && <ChecklistTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
 
  {/* Share Section */}
  <div className="flex justify-center pt-12 pb-4">
    <button 
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }}
      className={`group relative flex items-center gap-3 px-8 py-4 ${activeTheme.igGradient} backdrop-blur-xl border ${activeTheme.cardBorder} rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95`}
    >
      <div className={`p-2 bg-white/40 rounded-xl ${activeTheme.accentText}`}>
        {isCopied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
      </div>
      <div className="text-left">
        <p className={`text-[10px] font-black uppercase tracking-widest ${activeTheme.accentText} opacity-60 mb-0.5`}>
          {isCopied ? "Link Saved" : "Invite Friends"}
        </p>
        <p className={`font-black text-lg ${activeTheme.titleText}`}>
          {isCopied ? "已成功复制链接" : "分享给你的灵魂伴侣"}
        </p>
      </div>
      
      {/* Visual Feedback Glow */}
      {isCopied && (
        <div className="absolute inset-0 rounded-2xl ring-4 ring-green-400/30 animate-pulse pointer-events-none"></div>
      )}
    </button>
  </div>
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
   {!isPreviewMode && articleContent.seo && (
     <SEOMetadataPanel 
       seo={articleContent.seo} 
       onUpdate={(newSeo) => setArticleContent({ ...articleContent, seo: newSeo })}
       theme={activeTheme}
     />
   )}

 <div className={`${activeTheme.igGradient} backdrop-blur-2xl rounded-[2.5rem] p-7 border ${activeTheme.cardBorder} shadow-xl transition-all duration-500`}>
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

 <div className={`${activeTheme.igGradient} backdrop-blur-2xl rounded-[2.5rem] p-7 border ${activeTheme.cardBorder} shadow-xl transition-all duration-500`}>
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