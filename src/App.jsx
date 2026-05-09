import { useState, useEffect } from 'react';
import { Sparkles, Sun, Send, Check, Share2, Heart, BookOpen, MessageCircle, ChevronRight } from 'lucide-react';
import RankingTemplate from './templates/RankingTemplate';
import ImageExplainerTemplate from './templates/ImageExplainerTemplate';
import LongFormTemplate from './templates/LongFormTemplate';
import StepsGuideTemplate from './templates/StepsGuideTemplate';
import CompareTemplate from './templates/CompareTemplate';
import ChecklistTemplate from './templates/ChecklistTemplate';
import SEOMetadataPanel from './components/SEOMetadataPanel';
import ImageSlot from './components/ImageSlot';

/**
 * SEO & JSON-LD HELPERS
 * Generates structured data for Google Rich Snippets
 */
const generateJsonLd = (content) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": content.seo?.title || content.title,
    "description": content.seo?.description || content.intro,
    "image": content.cover_image?.url,
    "author": {
      "@type": "Organization",
      "name": "AskSoul"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AskSoul",
      "logo": { "@type": "ImageObject", "url": "https://asksoul.com/logo.png" }
    },
    "datePublished": new Date().toISOString()
  };
};

/**
 * THEME TOKEN SYSTEM
 * Each theme is now defined by semantic tokens rather than just class strings.
 */
const THEME_CONFIGS = {
  "Snow Alabaster": {
    name: "雪山白",
    palette: { primary: "#4A5568", accent: "#64748B", accentBg: "#E2E8F0", surface: "#F8FAFB", card: "rgba(255, 255, 255, 0.45)" },
    text: { heading: "#1E293B", body: "#334155", muted: "#475569" },
    decoration: { radius: "3rem", blur: "40px", shadow: "0 20px 60px rgba(100,116,139,0.05)", titleTracking: "tight" },
    gradient: "from-slate-100/80 via-blue-50/80 to-gray-100/80"
  },
  "Matcha Zen": {
    name: "抹茶禅",
    palette: { primary: "#588157", accent: "#588157", accentBg: "#DADEDC", surface: "#F1F8F2", card: "rgba(255, 255, 255, 0.5)" },
    text: { heading: "#344E41", body: "#3A5A40", muted: "#344E41" },
    decoration: { radius: "3rem", blur: "30px", shadow: "0 25px 70px rgba(58,90,64,0.08)", titleTracking: "normal" },
    gradient: "from-emerald-50/90 via-stone-50/90 to-teal-50/80"
  },
  "Lavender Mist": {
    name: "薰衣草",
    palette: { primary: "#7C3AED", accent: "#8B5CF6", accentBg: "#F3E8FF", surface: "#FAF9FF", card: "rgba(255, 255, 255, 0.55)" },
    text: { heading: "#2E1065", body: "#5B21B6", muted: "#4C1D95" },
    decoration: { radius: "3rem", blur: "40px", shadow: "0 30px 80px rgba(124,58,237,0.06)", titleTracking: "tight" },
    gradient: "from-purple-100/80 via-fuchsia-100/80 to-pink-100/80"
  },
  "Ocean Salt": {
    name: "海盐蓝",
    palette: { primary: "#0284C7", accent: "#0284C7", accentBg: "#E0F2FE", surface: "#F8FCFF", card: "rgba(255, 255, 255, 0.4)" },
    text: { heading: "#0C4A6E", body: "#0369A1", muted: "#075985" },
    decoration: { radius: "3rem", blur: "30px", shadow: "0 20px 60px rgba(14,165,233,0.07)", titleTracking: "wide" },
    gradient: "from-sky-100/80 via-cyan-50/80 to-blue-100/80"
  },
  "Rose Clay": {
    name: "玫瑰陶",
    palette: { primary: "#E11D48", accent: "#BE123C", accentBg: "#FFE4E6", surface: "#FFF5F5", card: "rgba(255, 255, 255, 0.45)" },
    text: { heading: "#4C0519", body: "#9F1239", muted: "#881337" },
    decoration: { radius: "3rem", blur: "40px", shadow: "0 35px 90px rgba(225,29,72,0.09)", titleTracking: "tighter" },
    gradient: "from-rose-100/80 via-red-50/80 to-pink-100/80"
  },
  "Sunset Glow": {
    name: "落日余晖",
    palette: { primary: "#D97706", accent: "#D97706", accentBg: "#FEF3C7", surface: "#FFFDF7", card: "rgba(255, 255, 255, 0.6)" },
    text: { heading: "#78350F", body: "#B45309", muted: "#92400E" },
    decoration: { radius: "3rem", blur: "30px", shadow: "0 25px 70px rgba(217,119,6,0.08)", titleTracking: "normal" },
    gradient: "from-orange-50/90 via-stone-50/90 to-amber-50/80"
  }
};

/**
 * Mapper function to maintain backward compatibility with current components
 */
const THEME_MAP = Object.keys(THEME_CONFIGS).reduce((acc, key) => {
  const config = THEME_CONFIGS[key];
  acc[key] = {
    bg: `bg-[var(--theme-surface)]`,
    text: `text-[var(--theme-primary)]`,
    accentBg: `bg-[var(--theme-accent-bg)]`,
    accentText: `text-[var(--theme-accent)]`,
    primaryBtn: `bg-white/40 backdrop-blur-md border border-white/60 text-[var(--theme-primary)] font-bold rounded-full px-10 py-3 shadow-sm hover:shadow-md transition-all`,
    cardBg: `bg-[var(--theme-card)] backdrop-blur-[var(--theme-blur)]`,
    cardBorder: "border-white/50",
    highlight: "bg-white/20",
    shadow: `shadow-[${config.decoration.shadow}]`,
    watermark: "text-gray-300",
    badgeBg: "bg-white/80",
    badgeText: `text-[var(--theme-muted)]`,
    titleText: `text-[var(--theme-heading)]`,
    tagBg: `bg-[var(--theme-accent-bg)]`,
    tagText: `text-[var(--theme-accent)]`,
    bodyText: `text-[var(--theme-body)]`,
    iconBg: `bg-[var(--theme-accent-bg)]`,
    iconText: `text-[var(--theme-accent)]`,
    quoteBg: "bg-white/20",
    quoteText: `text-[var(--theme-heading)]`,
    titleStyle: `font-black tracking-${config.decoration.titleTracking}`,
    igGradient: `bg-gradient-to-br ${config.gradient}`
  };
  return acc;
}, {});

const PLACEHOLDER_DATA = {
  "Ranking": {
    title: "2024 年度治愈系生活方式排行榜",
    intro: "在这个快节奏的时代，我们比任何时候都更需要寻找内心的宁静。",
    type: "Ranking",
    cover_image: { url: "", prompt: "" },
    items: [
      { id: "r1", title: "清晨冥想", tag: "深度静心", desc: "在日出时分静坐10分钟，观察呼吸的流动。", extra: { rank: 1, addictiveFactor: "静谧的力量" } },
      { id: "r2", title: "午后阅读", tag: "精神食粮", desc: "放下手机，翻开一本纸质书。", extra: { rank: 2, addictiveFactor: "跨越时空的共鸣" } },
      { id: "r3", title: "赤脚踏青", tag: "大地连接", desc: "脱掉鞋袜，让脚掌直接触碰泥土或草地。", extra: { rank: 3, addictiveFactor: "原始的自由感" } },
      { id: "r4", title: "整理空间", tag: "断舍离", desc: "清空一个抽屉或整理一片角落。", extra: { rank: 4, addictiveFactor: "掌控感的回归" } },
      { id: "r5", title: "慢煮时光", tag: "烟火气", desc: "为自己煮一壶茶或煲一锅汤。", extra: { rank: 5, addictiveFactor: "生活的质感" } },
      { id: "r6", title: "晚间散步", tag: "慢节奏", desc: "在落日余晖中随意行走。", extra: { rank: 6, addictiveFactor: "放松身心" } },
      { id: "r7", title: "书写日记", tag: "自我对话", desc: "记录当下的感受与思考。", extra: { rank: 7, addictiveFactor: "内心的宁静" } },
      { id: "r8", title: "深度睡眠", tag: "修复力", desc: "关掉灯光，彻底放松。", extra: { rank: 8, addictiveFactor: "能量补给" } }
    ],
    recommendations: [{ id: 1, title: "如何建立专属的早起仪式感", hot: true }],
    quizzes: [{ title: "测一测你属于哪种疗愈型人格", color: "bg-pink-100 text-pink-700" }],
    quote: "每个人都是一颗独立的星球，在寒冷的宇宙里，努力散发着微弱却坚定的光。",
    soul_warning: "记得在照顾所有人之前，先把自己照顾好。你的情绪价值不应该建立在自我损耗之上。"
  },
  "ImageExplainer": {
    title: "透过这几张图，看清你潜意识里的渴望",
    intro: "心理学家认为，视觉选择往往投射出我们内心深处最真实的一面。",
    type: "ImageExplainer",
    cover_image: { url: "", prompt: "Mystical forest, healing scene, dreamy vibe" },
    items: [
      { id: "i1", title: "迷雾森林", desc: "你目前可能处于某种迷茫期。", tag: "潜意识", extra: { warning: "别忽略信号" } },
      { id: "i2", title: "孤寂灯塔", desc: "你是一个独立且坚定的人。", tag: "独立", extra: { warning: "别总一个人扛" } },
      { id: "i3", title: "平静湖面", desc: "你内心渴望长久的安宁。", tag: "安宁", extra: { warning: "小心停滞不前" } },
      { id: "i4", title: "繁华闹市", desc: "你对社交和连接有强烈需求。", tag: "连接", extra: { warning: "别迷失在人群中" } }
    ],
    recommendations: [{ id: 1, title: "你最近的情绪，是在自救还是自耗？", hot: true }],
    quizzes: [{ title: "测一测你潜意识最深的执念", color: "bg-pink-100 text-pink-700" }],
    quote: "眼睛是灵魂的窗户，而潜意识则是推开窗户后，那个更深邃的房间。",
    soul_warning: "看清真相往往伴随着阵痛，但这正是成长的开始。不要害怕面对那个‘不完美’的自己。"
  },
  "LongForm": {
    title: "人工智能如何重塑未来的艺术创作？",
    intro: "艺术的边界正在经历前所未有的扩张与重组。",
    type: "LongForm",
    cover_image: { url: "", prompt: "AI art concept" },
    items: [
      { id: "l1", title: "技术的画布", desc: "AI成为了数字化‘超级画笔’。", image_prompt: "AI art concept" },
      { id: "l2", title: "创意的新源泉", desc: "算法与人类灵感的碰撞。" },
      { id: "l3", title: "审美范式的转移", desc: "新的艺术风格正在诞生。" },
      { id: "l4", title: "艺术的未来", desc: "人机协作将成为主流。" }
    ],
    recommendations: [{ id: 1, title: "当技术成为艺术家的第二大脑", hot: true }],
    quizzes: [{ title: "测一测你的创作人格", color: "bg-pink-100 text-pink-700" }],
    quote: "技术永远只是工具，唯有灵魂深处的颤动，才能赋予艺术真正的生命。",
    soul_warning: "在追求效率的时代，请警惕‘流水线式’的审美。不要让算法完全取代你独特的直觉。"
  },
  "StepsGuide": {
    title: "职场新人如何快速建立专业信任？",
    intro: "专业感不是演出来的，而是堆叠出来的逻辑闭环。",
    type: "StepsGuide",
    cover_image: { url: "", prompt: "Communication" },
    items: [
      { id: "s1", title: "凡事有交代", desc: "收到指令第一时间回复。", image_prompt: "Communication" },
      { id: "s2", title: "件件有着落", desc: "执行中定时汇报进度。", image_prompt: "Progress" },
      { id: "s3", title: "事事有回音", desc: "完成后主动确认结果。" },
      { id: "s4", title: "时间有预判", desc: "合理安排工作优先级。" },
      { id: "s5", title: "专业有沉淀", desc: "总结经验，不断复盘。" }
    ],
    recommendations: [{ id: 1, title: "为什么靠谱的人总能被看见", hot: true }],
    quizzes: [{ title: "测测你的职场信任值", color: "bg-pink-100 text-pink-700" }],
    quote: "职场是一场马拉松，暂时的领先并不代表终点，唯有始终如一的踏实才是护身符。",
    soul_warning: "过度追求‘专业感’可能会让你显得冷漠。在逻辑闭环之外，请保留一份属于人的温度。"
  },
  "Compare": {
    title: "极简主义 vs 极繁主义",
    intro: "生活的加法与减法。",
    type: "Compare",
    cover_image: { url: "", prompt: "Lifestyle" },
    items: [
      { id: "c1", title: "极简主义", desc: "剥离多余，留下核心。", tag: "Less is More", image_prompt: "Minimalism" },
      { id: "c2", title: "极繁主义", desc: "拥抱一切美好。", tag: "More is More", image_prompt: "Maximalism" }
    ],
    recommendations: [{ id: 1, title: "你真正需要的，不一定更多", hot: true }],
    quizzes: [{ title: "测一测你的生活方式", color: "bg-pink-100 text-pink-700" }],
    quote: "繁花与荒野，都有它们存在的意义。关键不在于你拥有多少，而在于你是否在其中感到自由。",
    soul_warning: "所有的‘主义’都只是路径，而不是终点。不要为了合群而强行改变自己的生存逻辑。"
  },
  "Checklist": {
    title: "出发去冰岛前核对清单",
    intro: "行前确认以下事项。",
    type: "Checklist",
    cover_image: { url: "", prompt: "Iceland landscape" },
    items: [
      { id: "ck1", title: "防水登山靴", desc: "冰岛的水是全方位的。" },
      { id: "ck2", title: "保暖内衣", desc: "层叠穿法是王道。" },
      { id: "ck3", title: "相机备用电池", desc: "低温环境下电量消耗快。" },
      { id: "ck4", title: "防水外套", desc: "遮风挡雨必不可少。" },
      { id: "ck5", title: "离线地图", desc: "部分地区信号微弱。" },
      { id: "ck6", title: "转换插头", desc: "欧标双圆孔。" },
      { id: "ck7", title: "急救包", desc: "安全第一。" },
      { id: "ck8", title: "好心情", desc: "这是最重要的。" }
    ],
    recommendations: [{ id: 1, title: "旅行前最容易忽略的事", hot: true }],
    quizzes: [{ title: "测一测你的旅行人格", color: "bg-pink-100 text-pink-700" }],
    quote: "出发的意义不在于抵达，而在于你决定推开门的那一刻。",
    soul_warning: "清单可以穷尽物资，但无法穷尽意外。保持随遇而安的心态，才是旅途中最坚硬的铠甲。",
    seo: { slug: "iceland-travel-checklist", title: "出发去冰岛前必看的 8 件事", description: "冰岛旅行终极核对清单，带你避坑。", keywords: "冰岛, 旅游, 清单" }
  }
};

const App = () => {
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

  useEffect(() => {
    const config = THEME_CONFIGS[styleType];
    if (config) {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary', config.palette.primary);
      root.style.setProperty('--theme-accent', config.palette.accent);
      root.style.setProperty('--theme-accent-bg', config.palette.accentBg);
      root.style.setProperty('--theme-surface', config.palette.surface);
      root.style.setProperty('--theme-card', config.palette.card);
      root.style.setProperty('--theme-heading', config.text.heading);
      root.style.setProperty('--theme-body', config.text.body);
      root.style.setProperty('--theme-muted', config.text.muted);
      root.style.setProperty('--theme-radius', config.decoration.radius);
      root.style.setProperty('--theme-blur', config.decoration.blur);
    }
  }, [styleType]);

  const handleTemplateChange = (type) => {
    setTemplateType(type);
    setArticleContent(PLACEHOLDER_DATA[type]);
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

    const promptText = `
Role: You are a Taiwan IG/Threads Million-follower Healing Emotional Expert (台湾 IG/Threads 百万粉疗愈系情感专家). 
Maintain a warm, soft, but crystal clear (温软清醒) tone. Your voice should feel like a late-night conversation that is both healing and enlightening. 

Subject: 【${topic}】. 
Language: ${language}. 
Template: ${templateType}.
Constraints: ${countConstraints}

Structure the response as a JSON object matching this schema:
${schemaPrompt}

Important Constraints:
- ${countConstraints}
- SEO: Generate a SEO-friendly slug (URL safe), title (under 60 chars), description (under 160 chars), and keywords.
- SEO Social: Add og_title, og_description for sharing.
- Content: Use warm, healing language. Avoid generic advice.
- Return ONLY the JSON object.`;

    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });
      const data = await resp.json();
      if (data.error) {
        setIsGeneratingContent(false);
        alert(`API Error: ${data.error.message}`);
        return;
      }
      const raw = data.candidates[0].content.parts[0].text;
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);

      // Ensure SEO data is present even if AI missed it. gggggggg
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

  // ==========================================
  // TEXT-TO-IMAGE (T2I) API INTEGRATION
  // ==========================================
  
  // Helper to call your backend's T2I API (Midjourney/DALL-E)
  const fetchT2IImage = async (promptText) => {
    // 研发注意：此处需要替换为真实的文生图后端接口
    console.log(`[T2I API] Sending prompt: "${promptText}"`);
    
    // 模拟网络请求延迟 (1.5秒)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 开发环境兜底逻辑：为了在没有真实 API 的情况下也能预览，我们暂时用 Unsplash 模拟返回图片流
    const mockStyleSuffix = styleType === "Matcha Zen" ? " zen, nature" : " cinematic";
    return `https://source.unsplash.com/featured/1200x675/?${encodeURIComponent(promptText + mockStyleSuffix)}`;
    
    /* 真实的对接代码示例：
    const response = await fetch('/api/v1/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptText, aspectRatio: '16:9' })
    });
    const data = await response.json();
    return data.imageUrl; 
    */
  };

  const generateImage = async () => {
    if (!articleContent.cover_image?.prompt && !topic) return;
    setIsGenerating(true);
    const promptToUse = articleContent.cover_image?.prompt || topic;
    
    try {
      const generatedUrl = await fetchT2IImage(promptToUse);
      setArticleContent(prev => ({
        ...prev,
        cover_image: { ...prev.cover_image, url: generatedUrl, prompt: promptToUse }
      }));
    } catch (err) {
      console.error("Cover image generation failed", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateItemImage = async (index, newPrompt) => {
    const item = articleContent.items[index];
    const promptToUse = newPrompt || item.image_prompt || topic;
    if (!promptToUse) return;

    try {
      const generatedUrl = await fetchT2IImage(promptToUse);
      const newContent = { ...articleContent };
      newContent.items[index] = { 
        ...newContent.items[index], 
        image_url: generatedUrl, 
        image_prompt: promptToUse 
      };
      setArticleContent(newContent);
    } catch (err) {
      console.error("Item image generation failed", err);
    }
  };

  const removeItemImage = (index) => {
    const newContent = { ...articleContent };
    newContent.items[index].image_url = "";
    setArticleContent(newContent);
  };

  const uploadItemImage = (index, fileData) => {
    const newContent = { ...articleContent };
    newContent.items[index].image_url = fileData;
    setArticleContent(newContent);
  };

  return (
    <div className={`min-h-screen ${activeTheme.bg} ${activeTheme.text} transition-all duration-1000 p-4 md:p-8 relative overflow-clip`}>
      <div className="noise-overlay" />
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

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
                <label className="text-xs font-bold opacity-70 mb-1 block">主题 (Topic)-version1</label>
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
        <div className="flex flex-col md:flex-row gap-8 items-start relative">
          <div className="flex-1 space-y-12 min-w-0">
            {/* JSON-LD Script for SEO */}
            <script type="application/ld+json">
              {JSON.stringify(generateJsonLd(articleContent))}
            </script>

            {/* Cover Section */}
            <div className="space-y-8 relative">
              {isGenerating && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-4xl">
                  <div className="w-12 h-12 border-4 border-(--theme-primary) border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
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
                  url={articleContent.cover_image?.url}
                  prompt={articleContent.cover_image?.prompt || topic}
                  onPromptChange={(val) => setArticleContent({
                    ...articleContent,
                    cover_image: { ...articleContent.cover_image, prompt: val }
                  })}
                  onGenerate={generateImage}
                  onRemove={() => setArticleContent({
                    ...articleContent,
                    cover_image: { ...articleContent.cover_image, url: "" }
                  })}
                  onUpload={(url) => setArticleContent({
                    ...articleContent,
                    cover_image: { ...articleContent.cover_image, url }
                  })}
                  isPreviewMode={isPreviewMode}
                  theme={activeTheme}
                  className="aspect-video"
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
          <div className="w-full md:w-[320px] shrink-0 space-y-8 md:sticky md:top-24">
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