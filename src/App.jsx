import React, { useState } from 'react';
import { Sparkles, Camera, Share2, Heart, Award, Ghost, Sun, Send, Star, Coffee, BookOpen, Layout, ChevronRight, MessageCircle, Flame, Palette, Globe, Layers, Upload } from 'lucide-react';
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
    primaryBtn: "bg-white/60 backdrop-blur-md border border-white/80 text-[#2C3E50] shadow-sm hover:shadow-md transition-all",
    cardBg: "bg-white/90 backdrop-blur-3xl", cardBorder: "border-white/90", highlight: "bg-gray-100/40", shadow: "shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]",
    watermark: "text-[#ABB2B9]", badgeBg: "bg-white/80", badgeText: "text-[#2C3E50]", titleText: "text-[#1B2631]", tagBg: "bg-[#D5D8DC]", tagText: "text-[#5D6D7E]", bodyText: "text-[#2E4053]", iconBg: "bg-[#D5D8DC]", iconText: "text-[#2C3E50]", quoteBg: "bg-white/80", quoteText: "text-[#1B2631]"
  },
  "Matcha Zen": {
    bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#D5DBDB_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#A9DFBF_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#7DCEA0_0%,_transparent_50%)] bg-[#E9F7EF]",
    text: "text-[#186A3B]",
    accentBg: "bg-[#D4EFDF]", accentText: "text-[#1E8449]",
    primaryBtn: "bg-[#1E8449] text-white shadow-sm hover:brightness-110 transition-all",
    cardBg: "bg-white/95 backdrop-blur-2xl", cardBorder: "border-[#A9DFBF]", highlight: "bg-[#F4FBF7]", shadow: "shadow-[0_20px_50px_-12px_rgba(30,132,73,0.15)]",
    watermark: "text-[#A9DFBF]", badgeBg: "bg-[#D4EFDF]", badgeText: "text-[#186A3B]", titleText: "text-[#0B5345]", tagBg: "bg-[#D4EFDF]", tagText: "text-[#1E8449]", bodyText: "text-[#145A32]", iconBg: "bg-[#D4EFDF]", iconText: "text-[#1E8449]", quoteBg: "bg-[#D4EFDF]/80", quoteText: "text-[#186A3B]"
  },
  "Lavender Mist": {
    bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#E8DAEF_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#D2B4DE_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#BB8FCE_0%,_transparent_50%)] bg-[#F4ECF7]",
    text: "text-[#4A235A]",
    accentBg: "bg-[#EBDEF0]", accentText: "text-[#7D3C98]",
    primaryBtn: "bg-white/60 backdrop-blur-md border border-purple-200 text-[#7D3C98] shadow-sm hover:shadow-md transition-all",
    cardBg: "bg-white/95 backdrop-blur-3xl", cardBorder: "border-purple-100", highlight: "bg-[#FDFEFE]", shadow: "shadow-[0_20px_50px_-12px_rgba(125,60,152,0.15)]",
    watermark: "text-[#D2B4DE]", badgeBg: "bg-white/90", badgeText: "text-[#4A235A]", titleText: "text-[#2E1537]", tagBg: "bg-[#EBDEF0]", tagText: "text-[#7D3C98]", bodyText: "text-[#512E5F]", iconBg: "bg-[#EBDEF0]", iconText: "text-[#7D3C98]", quoteBg: "bg-[#EBDEF0]/80", quoteText: "text-[#4A235A]"
  },
  "Ocean Salt": {
    bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#D6EAF8_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#AED6F1_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#85C1E9_0%,_transparent_50%)] bg-[#EBF5FB]",
    text: "text-[#1B4F72]",
    accentBg: "bg-[#D4E6F1]", accentText: "text-[#2E86C1]",
    primaryBtn: "bg-white/60 backdrop-blur-md border border-blue-100 text-[#2E86C1] shadow-sm hover:shadow-md transition-all",
    cardBg: "bg-white/95 backdrop-blur-2xl", cardBorder: "border-blue-100", highlight: "bg-blue-50/30", shadow: "shadow-[0_20px_50px_-12px_rgba(46,134,193,0.15)]",
    watermark: "text-[#AED6F1]", badgeBg: "bg-[#D4E6F1]", badgeText: "text-[#1B4F72]", titleText: "text-[#154360]", tagBg: "bg-white/90", tagText: "text-[#2E86C1]", bodyText: "text-[#21618C]", iconBg: "bg-blue-50/50", iconText: "text-[#2E86C1]", quoteBg: "bg-blue-50/80", quoteText: "text-[#1B4F72]"
  },
  "Rose Clay": {
    bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#FADBD8_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#F5B7B1_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#F1948A_0%,_transparent_50%)] bg-[#FDEDEC]",
    text: "text-[#78281F]",
    accentBg: "bg-[#F9EBEA]", accentText: "text-[#943126]",
    primaryBtn: "bg-[#943126] text-white shadow-sm hover:bg-[#7B241C] transition-all",
    cardBg: "bg-white/95 backdrop-blur-3xl", cardBorder: "border-rose-100", highlight: "bg-[#FEF9F9]", shadow: "shadow-[0_20px_50px_-12px_rgba(148,49,38,0.18)]",
    watermark: "text-[#F5B7B1]", badgeBg: "bg-[#F9EBEA]", badgeText: "text-[#78281F]", titleText: "text-[#641E16]", tagBg: "bg-[#F9EBEA]", tagText: "text-[#943126]", bodyText: "text-[#7B241C]", iconBg: "bg-[#F9EBEA]", iconText: "text-[#943126]", quoteBg: "bg-[#F9EBEA]/80", quoteText: "text-[#78281F]"
  },
  "Sunset Glow": {
    bg: "mesh-bg bg-[radial-gradient(at_0%_0%,_#FEF5E7_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#FDEBD0_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#FAD7A0_0%,_transparent_50%)] bg-[#FEF9E7]",
    text: "text-[#7E5109]",
    accentBg: "bg-[#FEF5E7]", accentText: "text-[#B7950B]",
    primaryBtn: "bg-gradient-to-br from-[#D4AC0D] to-[#B7950B] text-white shadow-sm hover:brightness-110 transition-all",
    cardBg: "bg-white/95 backdrop-blur-2xl", cardBorder: "border-orange-100", highlight: "bg-[#FFFDF9]", shadow: "shadow-[0_20px_50px_-12px_rgba(183,149,11,0.15)]",
    watermark: "text-[#FDEBD0]", badgeBg: "bg-[#FEF5E7]", badgeText: "text-[#7E5109]", titleText: "text-[#7D6608]", tagBg: "bg-[#FEF5E7]", tagText: "text-[#B7950B]", bodyText: "text-[#9A7D0A]", iconBg: "bg-[#FEF5E7]", iconText: "text-[#B7950B]", quoteBg: "bg-[#FEF5E7]/80", quoteText: "text-[#7E5109]"
  }
};

const PLACEHOLDER_DATA = {
  "Ranking": {
    title: "2024 年度治愈系生活方式排行榜",
    intro: "在这个快节奏的时代，我们比任何时候都更需要寻找内心的宁静。以下是经过深度调研得出的最能提升生活幸福感的治愈行为。",
    type: "Ranking",
    rankings: [
      { rank: 1, sign: "清晨冥想", tag: "深度静心", desc: "在日出时分静坐10分钟，观察呼吸的流动。这不仅是身体的唤醒，更是灵魂的洗礼。", addictiveFactor: "静谧的力量" },
      { rank: 2, sign: "午后阅读", tag: "精神食粮", desc: "放下手机，翻开一本纸质书。在墨香中与伟大的灵魂对话，感受时光的缓慢流淌。", addictiveFactor: "跨越时空的共鸣" },
      { rank: 3, sign: "赤脚踏青", tag: "大地连接", desc: "脱掉鞋袜，让脚掌直接触碰泥土或草地。感受地球的频率，释放积压的静电与压力。", addictiveFactor: "原始的自由感" },
      { rank: 4, sign: "整理空间", tag: "断舍离", desc: "清空一个抽屉或整理一片角落。在梳理外界秩序的同时，内心也会随之变得明亮通透。", addictiveFactor: "掌控感的回归" },
      { rank: 5, sign: "慢煮时光", tag: "烟火气", desc: "为自己煮一壶茶或煲一锅汤。听水沸腾的声音，看热气升腾，在等待中习得耐心。", addictiveFactor: "生活的质感" }
    ],
    outro: "治愈不在远方，而在你关注当下的每一个瞬间。",
    recommendations: [
      { id: 1, title: "如何建立专属的早起仪式感", views: "1.2k", hot: true },
      { id: 2, title: "冥想对焦虑症的科学改善建议", views: "856", hot: false }
    ]
  },
  "ImageExplainer": {
    title: "透过这几张图，看清你潜意识里的渴望",
    intro: "心理学家认为，视觉选择往往投射出我们内心深处最真实的一面。请观察以下场景...",
    type: "ImageExplainer",
    items: [
      { title: "迷雾森林", interpretation: "你目前可能处于某种迷茫期，但内心依然保有探索未知的勇气。", image_prompt: "Mystical forest with fog, ethereal lighting, concept art" },
      { title: "孤寂灯塔", interpretation: "你是一个独立且坚定的人，在风浪中总能为他人提供方向。", image_prompt: "Lighthouse on a rocky cliff at night, dramatic waves, cinematic" },
      { title: "黄金麦田", interpretation: "你渴望收获与稳定，内心充盈着对丰盛生命的期待。", image_prompt: "Golden wheat field at sunset, soft breeze, realistic painting" },
      { title: "无尽星空", interpretation: "你拥有极大的想象力与探索欲，不甘于平庸的生活。", image_prompt: "Infinite starry night sky, galaxy, high resolution, space art" }
    ],
    outro: "无论看到什么，那都是你内心世界的投影。"
  },
  "LongForm": {
    title: "人工智能如何重塑未来的艺术创作？",
    intro: "从达芬奇到生成式AI，艺术的边界正在经历前所未有的扩张与重组。",
    type: "LongForm",
    sections: [
      { subtitle: "技术的画布：AI作为新型画笔", content: "AI并非取代艺术家，而是成为了一种具备无限可能的数字化‘超级画笔’。它通过神经网络提取人类审美规律，再以超越人类的速度进行解构与重组..." },
      { subtitle: "版权与灵魂：艺术的主体性之争", content: "当算法能够创作出足以乱真的杰作，我们不禁要问：艺术的本质是结果的呈现，还是创作过程中那抹独一无二的人性光辉？" },
      { subtitle: "共生的未来：人类与算法的合奏", content: "未来的艺术或许不再是个体的英雄主义，而是人类灵感与机器算力的共生演化。我们正在进入一个全民创作的黄金时代。" }
    ],
    outro: "在算法与灵感的交汇处，新的文明正在萌芽。"
  },
  "StepsGuide": {
    title: "职场新人如何快速建立专业信任？",
    intro: "专业感不是演出来的，而是通过一件件靠谱的小事堆叠出来的逻辑闭环。",
    type: "StepsGuide",
    steps: [
      { title: "凡事有交代，件件有着落", desc: "收到指令第一时间回复，执行中定时汇报进度，完成后主动确认结果。" },
      { title: "结构化表达，高效沟通", desc: "结论先行，理由随后。用数字说话，用逻辑说服。让合作者感到清晰透明。" },
      { title: "管理预期，严守Deadline", desc: "宁可承诺80分交出100分，也不要承诺120分最后只给90分。守时是职场的生命线。" },
      { title: "复盘思维，快速迭代", desc: "不掉进同一个坑里。每次任务结束后反思优化路径，展现出可见的成长速度。" },
      { title: "细节控：文件命名与归档", desc: "从一个清晰的文件名开始。让别人找你拿资料时，永远能在3秒内定位准确版本。" }
    ],
    outro: "信任是职场最昂贵的通货。"
  },
  "Compare": {
    title: "极简主义 vs 极繁主义：哪种更适合你？",
    intro: "生活的加法与减法，本质上是对生命重心的不同选择。",
    type: "Compare",
    optionA: { title: "极简主义 (Minimalism)", desc: "剥离多余的杂质，只留下最核心的本质。强调自由、专注与极致的秩序感。", tag: "Less is More" },
    optionB: { title: "极繁主义 (Maximalism)", desc: "热烈地拥抱一切美好。色彩的碰撞、物件的堆叠，是生命张力的肆意流淌。", tag: "More is More" },
    outro: "风格没有高低，只有适不适合当下的你。"
  },
  "Checklist": {
    title: "出发去冰岛前，请核对这份‘灵魂清单’",
    intro: "为了不让遗憾留在北大西洋的冷风里，请在行前确认以下事项。",
    type: "Checklist",
    items: [
      { title: "防水性能极佳的登山靴", desc: "相信我，冰岛的水是全方位的，脚部的干燥决定了你的心情。" },
      { title: "捕捉极光的长曝光相机", desc: "虽然肉眼可见，但镜头能帮你铭记那抹转瞬即逝的绿光。" },
      { title: "一张无限流量的当地卡", desc: "在荒原中导航是生存技能，也是分享震撼瞬间的前提。" },
      { title: "一份对未知的敬畏心", desc: "自然的力量无法撼动，请随时关注天气预报并尊重禁区。" },
      { title: "足以循环一整天的氛围歌单", desc: "在1号公路上驰骋时，音乐是唯一的伴侣。" }
    ],
    outro: "祝你在世界的尽头，找回失落的自己。"
  }
};


const LANGUAGE_CONFIG = {
 "繁体中文": { code: "zh-Hant", contentLabel: "繁體中文", audienceLabel: "台灣與繁體中文讀者" },
 "简体中文": { code: "zh-Hans", contentLabel: "简体中文", audienceLabel: "简体中文读者" },
 "English": { code: "en", contentLabel: "English", audienceLabel: "English-speaking readers" },
 "日本語": { code: "ja", contentLabel: "日本語", audienceLabel: "Japanese readers" }
};

const TEMPLATE_IMAGE_PROMPT_RULES = {
 Ranking: "Create symbolic editorial visuals for ranked items. Focus on emotional metaphor, premium magazine composition, soft atmospheric lighting, and strong focal hierarchy.",
 ImageExplainer: "Create symbolic, dreamy, psychological visuals that feel introspective, mystical, and emotionally projective rather than literal.",
 LongForm: "Create cinematic editorial chapter visuals with layered storytelling, elegant composition, and feature-image quality.",
 StepsGuide: "Create clean, actionable editorial visuals with structured composition, clear subject emphasis, and soft luxury mood.",
 Compare: "Create dual-concept comparison visuals with mirrored composition, balanced contrast, and clear emotional differentiation.",
 Checklist: "Create organized, practical lifestyle visuals with planning aesthetics, soft luxury mood, and clear subject arrangement."
};

const STYLE_IMAGE_PROMPT_RULES = {
 "Snow Alabaster": "Use icy alabaster tones, silver-blue mist, translucent air, premium minimalism, and refined editorial negative space.",
 "Matcha Zen": "Use desaturated sage, cool herbal greens, quiet zen stillness, diffused daylight, and calm natural editorial texture.",
 "Lavender Mist": "Use moonlit lavender haze, cool lilac gradients, dreamy softness, ethereal glow, and poetic editorial styling.",
 "Ocean Salt": "Use sea-salt blue, misty aqua, airy transparency, water-soft atmosphere, and fresh editorial clarity.",
 "Rose Clay": "Use dusty rose, cool mauve clay, muted blush fog, elegant warmth, and refined feminine restraint.",
 "Sunset Glow": "Use cool champagne beige, misted gold, pale apricot neutrals, and understated editorial warmth."
};

const slugify = (value = "") => {
 return value
 .toLowerCase()
 .trim()
 .replace(/['’]/g, "")
 .replace(/[^a-z0-9\s-]/g, " ")
 .replace(/\s+/g, "-")
 .replace(/-+/g, "-")
 .replace(/^-|-$/g, "")
 .slice(0,80);
};

const getSeoLengthGuide = (language) => {
 if (language === "English") {
 return { title: "Recommended50–70 characters", description: "Recommended120–160 characters" };
 }
 return { title: "建议28–42 个字", description: "建议70–120 个字" };
};

const buildTemplateSchemaPrompt = (templateType) => {
 if (templateType === "Ranking") return `{"title":"Article title","intro":"Intro paragraph","type":"Ranking","lang":"Language code","seo":{"title":"SEO title","description":"SEO description","slug":"english-seo-slug"},"rankings":[{"rank":1,"sign":"Item name","tag":"Short label","desc":"Description","addictiveFactor":"Short takeaway","image_prompt":"Detailed English image prompt"}],"outro":"Closing paragraph","recommendations":[{"title":"Recommended reading title"}],"quizzes":[{"title":"Quiz title"}]} Requirement: rankings should usually contain8 to16 items. Keep Top3 especially striking and clickable.`;
 if (templateType === "ImageExplainer") return `{"title":"Article title","intro":"Intro paragraph","type":"ImageExplainer","lang":"Language code","seo":{"title":"SEO title","description":"SEO description","slug":"english-seo-slug"},"items":[{"title":"Result title","tag":"Short label","interpretation":"Interpretation","warning":"Short warning","quote":"Closing quote","image_prompt":"Detailed English image prompt"}],"outro":"Closing paragraph","recommendations":[{"title":"Recommended reading title"}],"quizzes":[{"title":"Quiz title"}]} Requirement: items should usually contain4 to6 results.`;
 if (templateType === "LongForm") return `{"title":"Article title","intro":"Intro paragraph","type":"LongForm","lang":"Language code","seo":{"title":"SEO title","description":"SEO description","slug":"english-seo-slug"},"sections":[{"subtitle":"Section subtitle","content":"Section content","image_prompt":"Detailed English image prompt"}],"outro":"Closing paragraph","recommendations":[{"title":"Recommended reading title"}],"quizzes":[{"title":"Quiz title"}]} Requirement: sections should usually contain4 to6 chapters.`;
 if (templateType === "StepsGuide") return `{"title":"Article title","intro":"Intro paragraph","type":"StepsGuide","lang":"Language code","seo":{"title":"SEO title","description":"SEO description","slug":"english-seo-slug"},"steps":[{"title":"Step title","desc":"Step description","image_prompt":"Detailed English image prompt"}],"outro":"Closing paragraph","recommendations":[{"title":"Recommended reading title"}],"quizzes":[{"title":"Quiz title"}]} Requirement: steps should usually contain5 to8 steps.`;
 if (templateType === "Compare") return `{"title":"Article title","intro":"Intro paragraph","type":"Compare","lang":"Language code","seo":{"title":"SEO title","description":"SEO description","slug":"english-seo-slug"},"optionA":{"title":"A title","desc":"A description","tag":"A tag","image_prompt":"Detailed English image prompt"},"optionB":{"title":"B title","desc":"B description","tag":"B tag","image_prompt":"Detailed English image prompt"},"outro":"Closing paragraph","recommendations":[{"title":"Recommended reading title"}],"quizzes":[{"title":"Quiz title"}]} Requirement: optionA and optionB should feel balanced and easy to compare.`;
 return `{"title":"Article title","intro":"Intro paragraph","type":"Checklist","lang":"Language code","seo":{"title":"SEO title","description":"SEO description","slug":"english-seo-slug"},"items":[{"title":"Checklist item","desc":"Short explanation"}],"outro":"Closing paragraph","recommendations":[{"title":"Recommended reading title"}],"quizzes":[{"title":"Quiz title"}]} Requirement: items should usually contain8 to12 checklist points.`;
};

const buildImagePromptInstruction = (templateType, styleType, topic) => {
 return `Image prompts must always be written in English. Mention the topic "${topic}" naturally. Follow this template guidance: ${TEMPLATE_IMAGE_PROMPT_RULES[templateType] || "Create a premium editorial visual."} Also follow this style guidance: ${STYLE_IMAGE_PROMPT_RULES[styleType] || "Use soft premium editorial styling."} Include composition, mood, lighting, subject clarity, texture, and aspect ratio hints suitable for social content cover generation.`;
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

  const [articleContent, setArticleContent] = useState({ ...PLACEHOLDER_DATA["Ranking"], cover_image_prompt: "" });

  const handleTemplateChange = (type) => {
    setTemplateType(type);
    setArticleContent({ ...PLACEHOLDER_DATA[type], cover_image_prompt: "" });
    setImageUrl(""); 
  };

  const activeTheme = THEME_MAP[styleType] || THEME_MAP["Snow Alabaster"];
 const seoGuide = getSeoLengthGuide(language);
 const seoTitleLength = articleContent?.seo?.title?.length ||0;
 const seoDescriptionLength = articleContent?.seo?.description?.length ||0;
 const seoMissing = {
 slug: !articleContent?.seo?.slug,
 title: !articleContent?.seo?.title,
 description: !articleContent?.seo?.description,
 };

  const handleContentUpdate = (newContent) => {
    setArticleContent(newContent);
  };

  const generateArticle = async () => {
 if (!topic) return;
 setIsGeneratingContent(true);
 const apiKey = "AIzaSyAK3JJ2jXvVCpCfWJSxcGkdM8L41qP-Lj0";
 const languageConfig = LANGUAGE_CONFIG[language] || LANGUAGE_CONFIG["繁体中文"];
 const schemaPrompt = buildTemplateSchemaPrompt(templateType);
 const imagePromptInstruction = buildImagePromptInstruction(templateType, styleType, topic);
 const coverImagePrompt = `${topic}, hero cover image, ${templateType} article, ${styleType} visual theme, premium editorial composition, soft cinematic lighting, dreamy atmosphere, high-end social content cover, highly detailed`;

 const prompt = `You are building a scalable social-content article for batch publishing workflows.
Topic: ${topic}
Template: ${templateType}
Target language: ${languageConfig.contentLabel}
Target audience: ${languageConfig.audienceLabel}
Language code: ${languageConfig.code}
Visual theme: ${styleType}

Core requirements:
1. Write the article body, recommendations, quiz titles, and all user-facing copy in ${languageConfig.contentLabel}.
2. Keep the emotional tone highly shareable, catchy, warm, self-aware, and suitable for social-platform topics such as MBTI, zodiac, love psychology, emotional insight, and personality tests.
3. Preserve strong structure and readability. Add breathing room. Avoid giant walls of text.
4. SEO slug must always be English only, lowercase, hyphenated, and suitable for URLs.
5. SEO title and SEO description must be in ${languageConfig.contentLabel}.
6. ${imagePromptInstruction}
7. Use strong structure, but keep item counts flexible within the recommended range for this template instead of forcing identical outputs every time.

Return strict JSON only. No markdown. Follow this schema exactly:
${schemaPrompt}`;

 try {
 const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 contents: [{ parts: [{ text: prompt }] }],
 generationConfig: { temperature:0.85 }
 })
 });

 const data = await response.json();
 if (data.error) throw new Error(`API 错误: ${data.error.message}`);

 const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
 const jsonStr = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
 const newContent = JSON.parse(jsonStr);

 newContent.lang = languageConfig.code;
 if (!newContent.seo) newContent.seo = {};
 newContent.seo.slug = slugify(newContent.seo.slug || topic);
 newContent.cover_image_prompt = newContent.cover_image_prompt || coverImagePrompt;

 if (newContent.rankings?.length) {
 newContent.rankings = newContent.rankings.map((item, idx) => ({
 ...item,
 rank: item.rank || idx +1,
 image_prompt: item.image_prompt || `${topic}, premium editorial ranking visual, ${styleType}, soft atmospheric lighting, cinematic composition, highly detailed`
 }));
 }

 if (newContent.items?.length) {
 newContent.items = newContent.items.map((item) => ({
 ...item,
 image_prompt: item.image_prompt || `${topic}, symbolic psychological visual, ${styleType}, dreamy editorial mood, soft glow, emotional metaphor, highly detailed`
 }));
 }

 if (newContent.sections?.length) {
 newContent.sections = newContent.sections.map((section) => ({
 ...section,
 image_prompt: section.image_prompt || `${topic}, premium editorial chapter visual, ${styleType}, cinematic storytelling, layered composition, highly detailed`
 }));
 }

 if (newContent.steps?.length) {
 newContent.steps = newContent.steps.map((step) => ({
 ...step,
 image_prompt: step.image_prompt || `${topic}, clean instructional editorial visual, ${styleType}, elegant layout, soft luxury lighting, highly detailed`
 }));
 }

 if (newContent.optionA) {
 newContent.optionA.image_prompt = newContent.optionA.image_prompt || `${topic}, side A comparison visual, ${styleType}, contrasted editorial concept, highly detailed`;
 }
 if (newContent.optionB) {
 newContent.optionB.image_prompt = newContent.optionB.image_prompt || `${topic}, side B comparison visual, ${styleType}, contrasted editorial concept, highly detailed`;
 }

 if (newContent.quizzes && Array.isArray(newContent.quizzes)) {
 newContent.quizzes = newContent.quizzes.map((q) => ({
 ...q, color: "bg-pink-100 text-pink-700", icon: <Heart className="w-4 h-4" />
 }));
 } else if (newContent.quizzes && typeof newContent.quizzes === 'object') {
 newContent.quizzes = [{
 ...newContent.quizzes, color: "bg-pink-100 text-pink-700", icon: <Heart className="w-4 h-4" />
 }];
 }

 if (!newContent.recommendations || !Array.isArray(newContent.recommendations)) {
 newContent.recommendations = articleContent.recommendations || [];
 }
 if (!newContent.quizzes || !Array.isArray(newContent.quizzes)) {
 newContent.quizzes = articleContent.quizzes || [];
 }
 if (!newContent.type) newContent.type = templateType;

 setArticleContent(newContent);
 console.log("SEO 数据已生成:", newContent.seo);
 } catch (err) {
 console.error("生成失败:", err);
 alert("生成失败详细信息: " + err.message);
 } finally {
 setIsGeneratingContent(false);
 }
 };

 const generateImage = async () => {
    if (!topic) return;
    setIsGenerating(true);
    
    // 使用更可靠的 Unsplash 关键词匹配方式
    const styleKeywords = styleType.replace(' ', ',');
    const randomSeed = Math.floor(Math.random() * 1000);
    const mockImageUrl = `https://images.unsplash.com/photo-1518005020481-a78a88974554?auto=format&fit=crop&q=80&w=1200&h=675&sig=${randomSeed}&${topic},${styleKeywords}`;
    
    setTimeout(() => {
      setImageUrl(mockImageUrl);
      setIsGenerating(false);
    }, 800);
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className={`min-h-screen ${activeTheme.bg} ${activeTheme.text} transition-all duration-[1400ms] p-4 md:p-8 relative overflow-hidden`}>
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* 顶部发布控制条 */}
        <div className={`sticky top-4 z-50 flex items-center justify-between ${activeTheme.cardBg} rounded-full px-6 py-3 ${activeTheme.shadow} border ${activeTheme.cardBorder} backdrop-blur-[26px] supports-[backdrop-filter]:bg-white/36 transition-all duration-500`}>
          <div className="flex items-center gap-3">
            <span className="font-serif-display text-xl italic tracking-wider">AskSoul</span>
            <div className={`w-px h-4 ${activeTheme.accentBg} opacity-50`}></div>
            <span className="font-bold tracking-widest uppercase text-[10px] opacity-60">Engine</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex rounded-full p-1 bg-white/28 ring-1 ring-white/45 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
              <button 
                onClick={() => setIsPreviewMode(false)}
                className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${!isPreviewMode ? activeTheme.primaryBtn : 'text-gray-500 hover:bg-black/5'}`}
              >
                Edit
              </button>
              <button 
                onClick={() => setIsPreviewMode(true)}
                className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${isPreviewMode ? activeTheme.primaryBtn : 'text-gray-500 hover:bg-black/5'}`}
              >
                Preview
              </button>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(articleContent, null, 2));
                alert("数据已复制到剪贴板！(Data Copied!)");
              }}
              className={`px-5 py-2 rounded-full border border-gray-300 text-sm font-bold shadow-sm hover:bg-black/5 transition-all flex items-center gap-2`}
            >
              <Share2 className="w-4 h-4" /> Export
            </button>
            <button className={`px-6 py-2 rounded-full ${activeTheme.primaryBtn} text-sm font-black shadow-lg hover:scale-105 transition-transform flex items-center gap-2`}>
              <Send className="w-4 h-4" /> Publish
            </button>
          </div>
        </div>

        {/* 控制面板 - 预览模式下隐藏 */}
        {!isPreviewMode && (
          <div className="relative group mb-8">
              <div className={`relative ${activeTheme.cardBg} rounded-[2rem] p-6 ${activeTheme.shadow} border ${activeTheme.cardBorder} transition-all duration-500`}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                
                <div className="md:col-span-1">
                  <label className="text-xs font-bold opacity-70 mb-1 block">主题 (Topic)</label>
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="输入你想生成的主题..."
                    className={`w-full px-4 py-3 ${activeTheme.highlight} border ${activeTheme.cardBorder} rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                  />
                </div>
                
                <div>
                  <label className="text-xs font-bold opacity-70 mb-1 flex items-center gap-1"><Layers className="w-3 h-3"/> 模板</label>
                  <select value={templateType} onChange={e=>handleTemplateChange(e.target.value)} className={`w-full px-4 py-3 ${activeTheme.highlight} border ${activeTheme.cardBorder} rounded-xl focus:outline-none`}>
                    <option value="Ranking">排行榜 (Ranking)</option>
                    <option value="ImageExplainer">图片解读 (ImageExplainer)</option>
                    <option value="LongForm">长文 (LongForm)</option>
                    <option value="StepsGuide">步骤指南 (StepsGuide)</option>
                    <option value="Compare">对比 (Compare)</option>
                    <option value="Checklist">清单 (Checklist)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold opacity-70 mb-1 flex items-center gap-1"><Palette className="w-3 h-3"/> 风格</label>
                  <select value={styleType} onChange={e=>setStyleType(e.target.value)} className={`w-full px-4 py-3 ${activeTheme.highlight} border ${activeTheme.cardBorder} rounded-xl focus:outline-none`}>
                    {Object.keys(THEME_MAP).map(key => <option key={key} value={key}>{key}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold opacity-70 mb-1 flex items-center gap-1"><Globe className="w-3 h-3"/> 语言</label>
                  <select value={language} onChange={e=>setLanguage(e.target.value)} className={`w-full px-4 py-3 ${activeTheme.highlight} border ${activeTheme.cardBorder} rounded-xl focus:outline-none`}>
                    <option value="繁体中文">繁体中文</option>
                    <option value="简体中文">简体中文</option>
                    <option value="English">English</option>
                    <option value="日本語">日本語</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button 
                    onClick={generateArticle}
                    disabled={isGeneratingContent || !topic}
                    className={`w-full py-3 ${activeTheme.primaryBtn} rounded-xl font-black disabled:opacity-50 transition-all flex items-center justify-center gap-2`}
                  >
                    {isGeneratingContent ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : <Send className="w-4 h-4" />}
                    一键生成
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* 顶部标题区 (独立成行) */}
          <div className="lg:col-span-8 lg:col-start-1">
            <header className={`text-center space-y-7 mb-14 ${isPreviewMode ? "pt-10 md:pt-16 pb-6" : ""}`}>
              <div className={`inline-flex items-center px-5 py-2 rounded-full ${activeTheme.accentBg} ${activeTheme.accentText} text-[11px] md:text-xs font-semibold border ${activeTheme.cardBorder} shadow-sm tracking-[0.18em] uppercase backdrop-blur-xl ${isPreviewMode ? "scale-105" : ""}`}>
                <Sun className="w-4 h-4 mr-2" />
                AskSoul 专栏
              </div>
              {isPreviewMode ? (
                <h1 className={`text-[2.35rem] md:text-[4.5rem] font-semibold leading-[1.04] tracking-[-0.035em] px-4 max-w-4xl mx-auto text-inherit ${isPreviewMode ? "drop-shadow-[0_18px_40px_rgba(255,255,255,0.18)]" : ""}` }>
                  {articleContent.title}
                </h1>
              ) : (
                <input 
                  value={articleContent.title || ""} 
                  onChange={(e) => handleContentUpdate({...articleContent, title: e.target.value})}
                  className="w-full text-center bg-transparent border-b border-white/35 focus:border-white/60 outline-none text-[2.2rem] md:text-[4rem] font-semibold leading-[1.08] tracking-[-0.03em] px-4 pb-4 text-inherit"
                  placeholder="文章主标题"
                />
              )}
            </header>
          </div>

          {/* 左侧主要内容区 (和右侧侧边栏同起点) */}
          <div className="lg:col-span-8 lg:col-start-1 lg:row-start-2 space-y-8">

            {/* 封面图 */}
            <div className={`relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden ${activeTheme.cardBg} border-4 ${activeTheme.cardBorder} ${activeTheme.shadow} flex items-center justify-center group`}>
              {imageUrl ? (
                <img src={imageUrl} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="text-center p-6 opacity-70">
                  <Camera className="w-12 h-12 mx-auto mb-4" />
                  <p className="font-bold">点击生成符合【{styleType}】风格的封面</p>
                </div>
              )}
            </div>

            {!isPreviewMode && (
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <button onClick={generateImage} disabled={isGenerating} className={`flex-1 w-full py-4 ${activeTheme.primaryBtn} rounded-2xl font-black shadow-lg transform active:scale-95 transition-all flex justify-center items-center gap-2`}>
                  <Sparkles className="w-5 h-5" />
                  {imageUrl ? "重新生成封面" : "生成 AI 封面"}
                </button>
                <div className="flex-1 relative w-full">
                  <input type="file" accept="image/*" onChange={handleCoverUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" title="上传本地图片" />
                  <div className={`w-full py-4 bg-black/5 hover:bg-black/10 rounded-2xl font-black transition-all flex justify-center items-center gap-2 border border-dashed border-gray-300`}>
                    <Upload className="w-5 h-5 opacity-60" /> 
                    <span className="opacity-80">本地上传 <span className="text-[10px] font-normal tracking-widest">(1200x675px)</span></span>
                  </div>
                </div>
              </div>
            )}

            <div className={`rounded-[3rem] ${activeTheme.cardBg} ${activeTheme.shadow} border ${activeTheme.cardBorder} relative transition-all duration-700 overflow-visible flex flex-col premium-card-shadow`}>
              
              {/* 内容区域 */}
              <div className="p-6 md:p-12 space-y-16 relative z-10">
                {isPreviewMode ? (
                  <div className="max-w-3xl mx-auto mb-10">
                    <p className={`text-xl md:text-2xl leading-[1.8] font-serif font-medium pl-8 border-l-4 ${activeTheme.accentText} border-opacity-30 opacity-90 italic whitespace-pre-wrap`}>
                      {articleContent.intro}
                    </p>
                  </div>
                ) : (
                  <div className="max-w-3xl mx-auto mb-10">
                    <textarea 
                      value={articleContent.intro || ""} 
                      onChange={(e) => handleContentUpdate({...articleContent, intro: e.target.value})}
                      className={`w-full bg-transparent border-none focus:outline-none text-xl md:text-2xl leading-[1.8] font-serif font-medium pl-8 border-l-4 ${activeTheme.accentText} border-opacity-30 opacity-90 italic resize-none min-h-[100px] whitespace-pre-wrap`}
                      placeholder="引导语"
                    />
                  </div>
                )}

                {/* 多态渲染核心 */}
                {articleContent.type === "Ranking" && <RankingTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
                {articleContent.type === "ImageExplainer" && <ImageExplainerTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
                {articleContent.type === "LongForm" && <LongFormTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
                {articleContent.type === "StepsGuide" && <StepsGuideTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
                {articleContent.type === "Compare" && <CompareTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
                {articleContent.type === "Checklist" && <ChecklistTemplate content={articleContent} theme={activeTheme} onUpdate={handleContentUpdate} isPreviewMode={isPreviewMode} />}
              </div>

              {/* 底部收纳区域 - AskSoul.me */}
              <div className={`mt-auto px-10 py-12 border-t ${activeTheme.cardBorder} flex flex-col items-center gap-8 transition-colors duration-500`}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className={`w-12 h-1.5 ${activeTheme.accentBg} rounded-full opacity-20`}></div>
                  <p className={`text-[10px] font-black tracking-[0.5em] uppercase ${activeTheme.accentText} opacity-40 font-serif-display italic`}>AskSoul.me</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("文章链接已复制到剪贴板！");
                    }}
                    className={`flex items-center gap-3 px-10 py-5 rounded-full ${activeTheme.badgeBg} ${activeTheme.badgeText} text-[10px] font-black uppercase tracking-widest shadow-2xl border border-white/50 hover:scale-105 active:scale-95 transition-all`}
                  >
                    <Share2 className="w-4 h-4" /> Share This Story
                  </button>
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-5 rounded-full ${isLiked ? 'bg-rose-500 text-white' : activeTheme.accentBg + ' ' + activeTheme.accentText} shadow-xl border border-white/50 hover:rotate-12 active:scale-75 transition-all group`}
                  >
                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : 'group-hover:fill-current'} transition-colors`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 右侧侧边栏 */}
          <div className="lg:col-span-4 lg:col-start-9 lg:row-start-2 space-y-8 lg:sticky lg:top-24 z-20">

            {/* SEO 设置面板 */}
            {!isPreviewMode && articleContent.seo && (
              <div className={`${activeTheme.cardBg} rounded-[2.5rem] p-7 border ${activeTheme.cardBorder} ${activeTheme.shadow} transition-colors duration-500`}>
                <div className="flex items-center gap-2 mb-6">
                  <div className={`p-2 ${activeTheme.accentBg} rounded-xl ${activeTheme.accentText}`}>
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="font-black">SEO Metadata</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase opacity-50 block mb-1">URL Slug <span className="normal-case tracking-normal">(English only)</span></label>
                    <input 
                      type="text" 
                      value={articleContent.seo.slug || ""}
                      onChange={(e) => handleContentUpdate({...articleContent, seo: {...articleContent.seo, slug: slugify(e.target.value)}})}
                      className="w-full bg-black/5 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase opacity-50 block mb-1">SEO Title</label>
 <p className="text-[10px] opacity-50 mb-1">{seoGuide.title} · 当前 {seoTitleLength}</p>
                    <input 
                      type="text" 
                      value={articleContent.seo.title || ""}
                      onChange={(e) => handleContentUpdate({...articleContent, seo: {...articleContent.seo, title: e.target.value}})}
                      className="w-full bg-black/5 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase opacity-50 block mb-1">Meta Description</label>
 <p className="text-[10px] opacity-50 mb-1">{seoGuide.description} · 当前 {seoDescriptionLength}</p>
                    <textarea 
                      value={articleContent.seo.description || ""}
                      onChange={(e) => handleContentUpdate({...articleContent, seo: {...articleContent.seo, description: e.target.value}})}
                      className="w-full bg-black/5 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none min-h-[60px]"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className={`${activeTheme.cardBg} rounded-[2.5rem] p-7 border ${activeTheme.cardBorder} ${activeTheme.shadow} transition-colors duration-500`}>
              <div className="flex items-center gap-2 mb-6">
                <div className={`p-2 ${activeTheme.accentBg} rounded-xl ${activeTheme.accentText}`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-black">热门推荐</h3>
              </div>
              <div className="space-y-6">
                {articleContent.recommendations?.map((item, idx) => (
                  <div key={idx} className={`group cursor-pointer border-b ${activeTheme.cardBorder} pb-4 last:border-0 last:pb-0`}>
                    <div className="flex items-start gap-2 mb-1">
                      {item.hot && <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>}
                      <p className={`text-sm font-bold leading-relaxed group-hover:${activeTheme.accentText} transition-colors line-clamp-2`}>
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${activeTheme.cardBg} rounded-[2.5rem] p-7 border ${activeTheme.cardBorder} ${activeTheme.shadow} transition-colors duration-500`}>
              <div className="flex items-center gap-2 mb-6">
                <div className={`p-2 ${activeTheme.accentBg} rounded-xl ${activeTheme.accentText}`}>
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="font-black">心灵测验</h3>
              </div>
              <div className="space-y-4">
                {articleContent.quizzes?.map((quiz, idx) => (
                  <div key={idx} className={`${quiz.color || 'bg-blue-100 text-blue-700'} p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:scale-105 transition-all`}>
                    <span className="font-bold text-sm">{quiz.title}</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
