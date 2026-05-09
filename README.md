# 🌸 AskSoul Engine - 综合手册 (完整版)

本项目是 AskSoul 的核心内容渲染与生成引擎。它不仅是一个前端展示框架，更是一套集成了 AI 文案生成、自动化视觉创作与多语言本土化能力的完整内容生产解决方案。

---

## 第一部分：运营与内容创作者指南

### 一、引擎核心定位与多语言超能力
AskSoul Engine 是一个专为情感、心理学、MBTI、生活方式领域打造的“配置化内容渲染引擎”。你只需要输入一个主题，剩下的文案撰写、版式布局、配图生成全部由 AI 自动化完成。

🌍 **多语言 (Localization) 机制**
与传统的翻译软件不同，引擎具备原生本土化能力。当你选择“日本語”或“English”时，AI 不是在做生硬的字面翻译，而是以该语言母语者的思维方式和文化背景直接进行创作。
*   **示例**：输入主题“如何面对失败”，选择日语，AI 可能会引入“侘寂 (Wabi-sabi)”的观念；选择英语，可能会采用更积极向上的“Growth Mindset”视角。

### 二、六大核心模板与 Prompt 指南
引擎内置了 6 套高转化率内容模板。以下是系统后台对各模板设定的强制 Prompt 约束：

1. **排行榜 (Ranking)**
   - **场景**：《2024 最治愈的生活方式 TOP 8》
   - **约束**：`Generate EXACTLY 8 items. Each item's description must be 120-150 words for deep emotional insight.`
2. **图片解读 (ImageExplainer)**
   - **场景**：《透过这 4 张图，看清你潜意识的渴望》
   - **约束**：`Generate EXACTLY 4 items. Each interpretation must be 100-150 words to explain the hidden emotion.`
3. **长文散文 (LongForm)**
   - **场景**：《深夜情绪自救指南》
   - **约束**：`Generate EXACTLY 4 chapters. Each chapter content MUST be 200-300 words with elegant prose.`
4. **步骤指南 (StepsGuide)**
   - **场景**：《建立深度关系的 5 个步骤》
   - **约束**：`Generate EXACTLY 5 steps. Each step description should be around 100 words.`
5. **对比碰撞 (Compare)**
   - **场景**：《极简主义 vs 极繁主义》
   - **约束**：`Generate 2 options (A and B). Each 'desc' block MUST be detailed (150-200 words).`
6. **核对清单 (Checklist)**
   - **场景**：《独居女孩必备安全清单》
   - **约束**：`Generate EXACTLY 8 items. Each item description should be short but impactful.`

### 三、文生图 (Text-to-Image) 全自动工作流
1. **配图产生**：AI 在写文章时会根据语境自动提炼关键词（如：“A peaceful lake at dawn”），并发送给后端绘画 AI（Midjourney/DALL-E）进行绘制。
2. **精准控制**：
   - **修改重绘**：通过图片下方的“Vision Concept”框修改英文关键词，点击 `Regenerate AI` 即可重画。
   - **本地上传**：点击 `Replace Local` 可手动上传图片。
   - **来源追溯**：悬浮图片左上角显示 `AI Generated` 或 `Local Source`。

### 四、全局 AI 人格共创机制
系统底层设定了 **System Prompt**，决定了 AI 说话的总基调：
> **角色**：台湾 IG/Threads 百万粉疗愈系情感专家。
> **基调**：温软清醒。就像一场深夜的谈话，既有治愈感，又有启发性。

### 五、SEO 实操建议
系统自动生成 slug、title 和 description 并注入 JSON-LD。分享到社交媒体前，请人工检查**大标题**和底部的**“灵魂警示语 (Soul Warning)”**，这是抓取摘要的关键，直接影响点击率。

---

## 第二部分：研发交付与架构说明

### 1. 项目快速启动
*   **核心框架**：React 19 + Vite
*   **样式方案**：Tailwind CSS v4
*   **安装依赖**：`npm install`
*   **本地开发**：`npm run dev`
*   **环境配置**：配置 `.env.local` 文件，填入 `VITE_GEMINI_API_KEY`。

### 2. 核心对接：文生图 (T2I) 接口
研发团队需在 `src/App.jsx` 的 `fetchT2IImage` 函数中替换真实的后端接口逻辑。
```javascript
const fetchT2IImage = async (promptText) => {
  const response = await fetch('/api/v1/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: promptText, aspectRatio: '16:9' })
  });
  const data = await response.json();
  return data.imageUrl; 
};
```

### 3. 多语言实现机制
本项目采用 LLM 原生本土化策略，而非传统的 i18n 静态词典。通过在请求中动态注入 `Language: ${language}` 约束，让 AI 直接以目标语言的文化语境进行创作。

### 4. 统一数据规范 (Unified JSON Schema)
所有模板共享标准数据结构，便于后端统一建模：
```typescript
interface Article {
  type: string;             // 模板类型
  title: string;            // 文章大标题
  intro: string;            // 导语
  cover_image: { url: string; prompt: string; };
  items: Array<{
    id: string; title: string; desc: string; 
    image_url?: string; image_prompt?: string; 
    tag?: string; extra?: any;
  }>;
  quote?: string;           // 结尾引言
  soul_warning?: string;    // 结尾警示语
  seo: { slug: string; title: string; description: string; keywords: string; };
}
```

### 5. 样式与 SEO
*   **Theme Token**：通过 CSS Variables 实现动态换肤。
*   **结构化数据**：自动生成符合 Schema.org 规范的 `application/ld+json` 脚本。

---
**AskSoul Engine - 2024 Version**
