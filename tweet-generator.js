const TWEET_I18N = {
  zh: {
    heroEyebrow: "主动创作工具",
    heroTitle: "推特段子生成器",
    heroDesc: "选择或输入 RSS 源，抓取真实热点，用关键词权重让模型先打分，再从 Top 10 候选池里抽卡生成段子。",
    backLink: "返回设置",
    sourceKicker: "素材源",
    sourceTitle: "RSS 订阅池",
    presetLabel: "预设来源",
    presetPlaceholder: "选择一个预设 RSS 源",
    customLabel: "或手动输入 RSS 链接",
    rssInputPlaceholder: "https://example.com/feed.xml",
    addSourceBtn: "添加",
    loadFeedBtn: "读取所有源",
    loadFeedBtnLoading: "读取中...",
    sourceHint: "关键词权重会先参与事件打分，再把候选事件发送给 LLM 排序，最后从 Top 10 候选池里随机抽一条生成段子。",
    sourceEmpty: "还没有 RSS 源 tag。先加几个你常看的订阅源。",
    eventListTitle: "Top 10 事件池",
    eventStatusWaiting: "等待读取",
    eventStatusLoadingFeeds: "抓取 RSS 中",
    eventStatusScoring: "LLM 打分中",
    eventStatusReady: "已更新",
    eventStatusError: "读取失败",
    composeKicker: "创作台",
    composeTitle: "推文抽卡",
    selectedEventLabel: "当前事件",
    previewEmpty: "RSS 有图时会显示在这里",
    tweetLengthLabel: "段子长度",
    emotionLabel: "情绪风格",
    advancedLabel: "高级设置",
    promptLabel: "提示词草稿",
    keywordWeightLabel: "新闻关键词权重",
    keywordWeightHint: "像打 tag 一样维护关键词，权重越高，事件打分和生成时越优先关注相关信息。",
    addKeywordBtn: "添加",
    keywordPlaceholder: "输入关键词，如 Trump",
    keywordEmpty: "还没有关键词 tag。加几个你想优先盯住的名字、公司或议题。",
    generateTweetBtn: "开始抽卡",
    generatingBtn: "生成中...",
    rerollTweetBtn: "再抽一次",
    downloadImageBtn: "下载图片",
    sendTweetBtn: "发送推特",
    copyTweetBtn: "复制结果",
    outputTitle: "抽卡结果",
    outputStatusIdle: "未生成",
    outputStatusGenerating: "生成中",
    outputStatusReady: "已出卡",
    outputStatusError: "生成失败",
    outputPlaceholder: "先读取 RSS 源并完成事件打分，然后点击“开始抽卡”生成真实段子。",
    copied: "已复制",
    errNoKey: "请先在设置页配置 API Key",
    errNoSource: "请先添加至少一个 RSS 源",
    errNoEvents: "没有读到可用事件，请检查 RSS 源",
    errGeneratePrefix: "生成失败：",
    errLoadPrefix: "读取失败：",
    lengths: { 短: "短", 中: "中", 长: "长" },
    emotions: {
      幽默: "幽默",
      愤怒: "愤怒",
      反串: "反串",
      鼓励: "鼓励",
      专业: "专业",
      温暖: "温暖"
    },
    metaScore: "分数",
    metaMatched: "命中",
    metaNoMatch: "未命中关键词"
  },
  en: {
    heroEyebrow: "Active Creation",
    heroTitle: "Tweet Bit Generator",
    heroDesc: "Select or paste RSS sources, fetch live events, have keyword weights guide LLM scoring, then draw one event from the Top 10 pool for generation.",
    backLink: "Back to Settings",
    sourceKicker: "Source",
    sourceTitle: "RSS Source Pool",
    presetLabel: "Preset Source",
    presetPlaceholder: "Choose a preset RSS source",
    customLabel: "Or paste a custom RSS URL",
    rssInputPlaceholder: "https://example.com/feed.xml",
    addSourceBtn: "Add",
    loadFeedBtn: "Load All Sources",
    loadFeedBtnLoading: "Loading...",
    sourceHint: "Keyword weights influence event scoring first. The candidates are then ranked by the LLM, and one event is drawn from the Top 10 pool for generation.",
    sourceEmpty: "No RSS source tags yet. Add a few feeds you want this workspace to watch.",
    eventListTitle: "Top 10 Event Pool",
    eventStatusWaiting: "Waiting",
    eventStatusLoadingFeeds: "Fetching RSS",
    eventStatusScoring: "LLM Scoring",
    eventStatusReady: "Updated",
    eventStatusError: "Load Failed",
    composeKicker: "Composer",
    composeTitle: "Tweet Draw",
    selectedEventLabel: "Current Event",
    previewEmpty: "RSS images will show up here when available",
    tweetLengthLabel: "Draft Length",
    emotionLabel: "Emotion",
    advancedLabel: "Advanced Settings",
    promptLabel: "Prompt Draft",
    keywordWeightLabel: "News Keyword Weights",
    keywordWeightHint: "Maintain keyword tags here. Higher weights make both scoring and generation prioritize related entities or topics.",
    addKeywordBtn: "Add",
    keywordPlaceholder: "Add a keyword, like Trump",
    keywordEmpty: "No keyword tags yet. Add names, companies, or issues you want the model to watch harder.",
    generateTweetBtn: "Start Draw",
    generatingBtn: "Generating...",
    rerollTweetBtn: "Roll Again",
    downloadImageBtn: "Download Image",
    sendTweetBtn: "Post to X",
    copyTweetBtn: "Copy Result",
    outputTitle: "Draw Result",
    outputStatusIdle: "Idle",
    outputStatusGenerating: "Generating",
    outputStatusReady: "Card Drawn",
    outputStatusError: "Generation Failed",
    outputPlaceholder: "Load and score RSS sources first, then click “Start Draw” to generate a real tweet draft.",
    copied: "Copied",
    errNoKey: "Please configure your API key in settings first",
    errNoSource: "Add at least one RSS source first",
    errNoEvents: "No usable events were found. Check your RSS sources.",
    errGeneratePrefix: "Generation failed: ",
    errLoadPrefix: "Load failed: ",
    lengths: { 短: "S", 中: "M", 长: "L" },
    emotions: {
      幽默: "Humor",
      愤怒: "Angry",
      反串: "Ironic",
      鼓励: "Cheer",
      专业: "Pro",
      温暖: "Warm"
    },
    metaScore: "Score",
    metaMatched: "Matched",
    metaNoMatch: "No keyword hit"
  }
};

const DEFAULT_KEYWORDS = [
  { label: "Trump", weight: 10 },
  { label: "Google", weight: 8 },
  { label: "OpenAI", weight: 9 }
];

const DEFAULT_SOURCES = [
  { label: "New York Times", url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml" },
  { label: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml" }
];

const DEFAULT_EVENTS = [
  {
    id: "event-demo-0",
    title: {
      zh: "某公司凌晨发布离谱更新，评论区瞬间炸锅",
      en: "A company's midnight update backfired and the comment section exploded"
    },
    desc: {
      zh: "适合测试科技热点吐槽型推文。",
      en: "Good for testing tech-news roast style tweet drafts."
    },
    meta: {
      zh: "示例事件 · 科技 · 1 小时前",
      en: "Sample Event · Tech · 1 hour ago"
    },
    imageUrl: "",
    link: "",
    score: 0,
    matchedKeywords: []
  },
  {
    id: "event-demo-1",
    title: {
      zh: "国际赛场逆转翻盘，网友开始集体造梗",
      en: "A dramatic comeback on the international stage sent everyone into meme mode"
    },
    desc: {
      zh: "适合测试体育或娱乐热梗型推文。",
      en: "Good for testing sports or entertainment meme-driven tweet drafts."
    },
    meta: {
      zh: "示例事件 · 体育 · 3 小时前",
      en: "Sample Event · Sports · 3 hours ago"
    },
    imageUrl: "",
    link: "",
    score: 0,
    matchedKeywords: []
  },
  {
    id: "event-demo-2",
    title: {
      zh: "一条政策新闻引发两极反应，各路博主疯狂跟进",
      en: "A policy headline split public opinion and every creator rushed in with a take"
    },
    desc: {
      zh: "适合测试反串、讽刺、犀利点评方向。",
      en: "Good for testing ironic, sarcastic, or sharp commentary angles."
    },
    meta: {
      zh: "示例事件 · 社会 · 5 小时前",
      en: "Sample Event · Society · 5 hours ago"
    },
    imageUrl: "",
    link: "",
    score: 0,
    matchedKeywords: []
  }
];

const PROVIDERS = {
  claude: {
    defaultModel: "claude-sonnet-4-6",
    url: "https://api.anthropic.com/v1/messages",
    buildRequest(apiKey, model, prompt, maxTokens = 1024) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: { model, max_tokens: maxTokens, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) {
      return data.content?.[0]?.text || "";
    }
  },
  deepseek: {
    defaultModel: "deepseek-chat",
    url: "https://api.deepseek.com/chat/completions",
    buildRequest(apiKey, model, prompt, maxTokens = 1024) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: { model, max_tokens: maxTokens, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) {
      return data.choices?.[0]?.message?.content || "";
    }
  },
  openai: {
    defaultModel: "gpt-4o-mini",
    url: "https://api.openai.com/v1/chat/completions",
    buildRequest(apiKey, model, prompt, maxTokens = 1024) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: { model, max_tokens: maxTokens, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) {
      return data.choices?.[0]?.message?.content || "";
    }
  },
  gemini: {
    defaultModel: "gemini-2.0-flash",
    url: "https://generativelanguage.googleapis.com/v1beta/models/",
    buildRequest(apiKey, model, prompt, maxTokens = 1024) {
      return {
        url: `${this.url}${model}:generateContent?key=${apiKey}`,
        headers: { "Content-Type": "application/json" },
        body: { contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: maxTokens } }
      };
    },
    parseReply(data) {
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    }
  },
  grok: {
    defaultModel: "grok-3-mini",
    url: "https://api.x.ai/v1/chat/completions",
    buildRequest(apiKey, model, prompt, maxTokens = 1024) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: { model, max_tokens: maxTokens, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) {
      return data.choices?.[0]?.message?.content || "";
    }
  },
  glm: {
    defaultModel: "glm-4-flash",
    url: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
    buildRequest(apiKey, model, prompt, maxTokens = 1024) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: { model, max_tokens: maxTokens, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) {
      return data.choices?.[0]?.message?.content || "";
    }
  },
  qwen: {
    defaultModel: "qwen-turbo",
    url: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    buildRequest(apiKey, model, prompt, maxTokens = 1024) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: { model, max_tokens: maxTokens, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) {
      return data.choices?.[0]?.message?.content || "";
    }
  },
  moonshot: {
    defaultModel: "moonshot-v1-8k",
    url: "https://api.moonshot.cn/v1/chat/completions",
    buildRequest(apiKey, model, prompt, maxTokens = 1024) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: { model, max_tokens: maxTokens, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) {
      return data.choices?.[0]?.message?.content || "";
    }
  }
};

const rssPreset = document.getElementById("rssPreset");
const rssInput = document.getElementById("rssInput");
const addSourceBtn = document.getElementById("addSourceBtn");
const sourceTags = document.getElementById("sourceTags");
const loadFeedBtn = document.getElementById("loadFeedBtn");
const eventList = document.getElementById("eventList");
const eventStatus = document.getElementById("eventStatus");
const imagePreview = document.getElementById("imagePreview");
const selectedEventTitle = document.getElementById("selectedEventTitle");
const selectedEventDesc = document.getElementById("selectedEventDesc");
const tweetLength = document.getElementById("tweetLength");
const tweetPrompt = document.getElementById("tweetPrompt");
const advancedToggle = document.getElementById("advancedToggle");
const advancedPanel = document.getElementById("advancedPanel");
const keywordInput = document.getElementById("keywordInput");
const keywordWeightInput = document.getElementById("keywordWeightInput");
const addKeywordBtn = document.getElementById("addKeywordBtn");
const keywordTags = document.getElementById("keywordTags");
const generateTweetBtn = document.getElementById("generateTweetBtn");
const rerollTweetBtn = document.getElementById("rerollTweetBtn");
const downloadImageBtn = document.getElementById("downloadImageBtn");
const sendTweetBtn = document.getElementById("sendTweetBtn");
const copyTweetBtn = document.getElementById("copyTweetBtn");
const tweetOutput = document.getElementById("tweetOutput");
const outputStatus = document.getElementById("outputStatus");

let currentLang = "zh";
let currentEmotion = "幽默";
let keywordWeights = DEFAULT_KEYWORDS.map((item) => ({ ...item }));
let sourcePool = DEFAULT_SOURCES.map((item) => ({ ...item }));
let events = DEFAULT_EVENTS.map((item) => ({ ...item }));
let currentDrawEventId = null;
let promptDirty = false;

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme || "dark";
}

function getStrings() {
  return TWEET_I18N[currentLang] || TWEET_I18N.zh;
}

function escapeHtml(text) {
  return String(text || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function extractJsonBlock(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON returned");
  return JSON.parse(match[0]);
}

function decodeHtmlEntities(text) {
  const div = document.createElement("div");
  div.innerHTML = text || "";
  return div.textContent || "";
}

function stripHtml(html) {
  return decodeHtmlEntities(String(html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function truncate(text, max = 240) {
  const clean = String(text || "").trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

function getRelativeTime(dateString) {
  if (!dateString) return { zh: "刚刚", en: "just now" };
  const target = new Date(dateString);
  if (Number.isNaN(target.getTime())) return { zh: "刚刚", en: "just now" };
  const diff = Math.max(0, Date.now() - target.getTime());
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return { zh: `${days} 天前`, en: `${days} day${days > 1 ? "s" : ""} ago` };
  if (hours > 0) return { zh: `${hours} 小时前`, en: `${hours} hour${hours > 1 ? "s" : ""} ago` };
  if (minutes > 0) return { zh: `${minutes} 分钟前`, en: `${minutes} minute${minutes > 1 ? "s" : ""} ago` };
  return { zh: "刚刚", en: "just now" };
}

function renderPreviewMedia(event) {
  const t = getStrings();
  if (event?.imageUrl) {
    imagePreview.innerHTML = `<img src="${escapeHtml(event.imageUrl)}" alt="preview" />`;
    downloadImageBtn.disabled = false;
  } else {
    imagePreview.innerHTML = `<div class="preview-empty" id="previewEmpty">${t.previewEmpty}</div>`;
    downloadImageBtn.disabled = true;
  }
}

function getSelectedEvent() {
  const drawn = events.find((item) => item.id === currentDrawEventId);
  const fallback = events[0];
  const active = drawn || fallback;
  return active ? {
    title: active.title[currentLang] || active.title.zh,
    desc: active.desc[currentLang] || active.desc.zh
  } : { title: "", desc: "" };
}

function getCurrentEventObject() {
  return events.find((item) => item.id === currentDrawEventId) || events[0] || null;
}

function getKeywordLines() {
  if (!keywordWeights.length) return currentLang === "en" ? "- none" : "- 无";
  return keywordWeights.map((item) => `- ${item.label}: ${item.weight}/10`).join("\n");
}

function getSourceLines() {
  if (!sourcePool.length) return currentLang === "en" ? "- none" : "- 无";
  return sourcePool.map((item) => `- ${item.label}: ${item.url}`).join("\n");
}

function buildDefaultPrompt(event) {
  const builder = currentLang === "en" ? buildDefaultPromptEn : buildDefaultPromptZh;
  return builder(event);
}

function buildDefaultPromptZh(event) {
  const lengthMap = { 短: "60-90字", 中: "100-220字", 长: "220-420字" };
  return `你是一个很会写中文互联网推文段子的内容作者。

请围绕下面这条事件，生成 1 条适合发在 X / Twitter 上的中文段子型推文。

RSS 订阅池：
${getSourceLines()}

事件标题：
${event.title.zh}

事件补充：
${event.desc.zh}

生成设定：
- 情绪风格偏"${currentEmotion}"
- 长度控制在"${lengthMap[tweetLength.value] || lengthMap.中}"
- 结果要像抽卡一样有随机感和惊喜感，但仍然可发

新闻关键词权重：
${getKeywordLines()}

要求：
- 优先围绕高分事件最有传播性的矛盾点出梗
- 如果事件涉及高权重关键词，优先围绕它们组织吐槽点、观点落点和梗感
- 如果事件和关键词无关，不要硬蹭
- 要有网感、节奏感和可传播性
- 可以适度玩梗，但不要低俗
- 如果正文偏长，优先分成 2-3 个自然段，段与段之间空一行；如果正文本来就短，可以只写 1 段；不要写"第一段/第二段"
- 先输出正文，再单独一行输出 2-4 个适合推特传播的 tag
- tag 使用 # 开头，尽量短，不要刷屏
- 不要输出任何前缀、标题、解释或分段说明`;
}

function buildDefaultPromptEn(event) {
  const lengthMap = { 短: "60-90 characters", 中: "100-220 characters", 长: "220-420 characters" };
  return `You are a sharp social writer crafting tweet-ready bits.

Generate exactly 1 tweet-style post about this event for X / Twitter.

RSS source pool:
${getSourceLines()}

Title:
${event.title.en}

Extra context:
${event.desc.en}

Generation settings:
- emotional style: "${TWEET_I18N.en.emotions[currentEmotion] || currentEmotion}"
- target length: "${lengthMap[tweetLength.value] || lengthMap.中}"
- the result should feel like a lucky draw: surprising, varied, but still postable

News keyword weights:
${getKeywordLines()}

Requirements:
- anchor the joke in the event's sharpest, most shareable contradiction
- if the event touches high-weight keywords, prioritize them when choosing the angle, punchline, or framing
- if the event has nothing to do with those keywords, do not force them in
- make it punchy, internet-native, and shareable
- light meme energy is fine, but avoid being crude
- if the post is medium or long, prefer 2-3 natural paragraphs with a blank line between them; if it is naturally short, a single paragraph is fine; do not use labels like "Paragraph 1"
- output the main post first, then one final line with 2-4 Twitter-ready hashtags
- hashtags should start with # and stay compact
- do not output any title, prefix, explanation, or extra formatting`;
}

function refreshPrompt(force = false) {
  if (promptDirty && !force) return;
  const event = getCurrentEventObject();
  tweetPrompt.value = event ? buildDefaultPrompt(event) : "";
}

function scoreEventLocally(event) {
  const text = [event.title.zh, event.title.en, event.desc.zh, event.desc.en].join(" ").toLowerCase();
  const matchedKeywords = keywordWeights
    .map((item) => ({ ...item, matched: text.includes(item.label.toLowerCase()) }))
    .filter((item) => item.matched)
    .sort((a, b) => b.weight - a.weight);
  const score = matchedKeywords.reduce((sum, item) => sum + item.weight, 0);
  return {
    ...event,
    score,
    matchedKeywords: matchedKeywords.map((item) => item.label),
    scoreReason: matchedKeywords.length ? matchedKeywords.map((item) => item.label).join(", ") : ""
  };
}

function syncSelectedEvent() {
  const target = getCurrentEventObject();
  if (!target) {
    selectedEventTitle.textContent = "";
    selectedEventDesc.textContent = "";
    renderPreviewMedia(null);
    return;
  }
  selectedEventTitle.textContent = target.title[currentLang] || target.title.zh;
  selectedEventDesc.textContent = target.desc[currentLang] || target.desc.zh;
  renderPreviewMedia(target);
}

function renderEvents() {
  eventList.innerHTML = "";
  const t = getStrings();
  const topEvents = events.slice(0, 10);

  topEvents.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = `event-item${index === 0 ? " active" : ""}`;
    button.type = "button";

    const title = document.createElement("span");
    title.className = "event-item-title";
    title.textContent = item.title[currentLang] || item.title.zh;
    button.appendChild(title);

    const meta = document.createElement("span");
    meta.className = "event-item-meta";
    const scoreText = `${t.metaScore} ${item.score || 0}`;
    const matchText = item.matchedKeywords?.length
      ? `${t.metaMatched} ${item.matchedKeywords.join(" / ")}`
      : t.metaNoMatch;
    meta.textContent = `${item.meta[currentLang] || item.meta.zh} · ${scoreText} · ${matchText}`;
    button.appendChild(meta);

    eventList.appendChild(button);
  });

  if (!currentDrawEventId || !events.some((item) => item.id === currentDrawEventId)) {
    currentDrawEventId = events[0]?.id || null;
  }
  syncSelectedEvent();
}

function renderSourceTags() {
  const t = getStrings();
  sourceTags.innerHTML = "";
  if (!sourcePool.length) {
    const empty = document.createElement("div");
    empty.className = "tag-empty";
    empty.textContent = t.sourceEmpty;
    sourceTags.appendChild(empty);
    return;
  }

  sourcePool.forEach((item) => {
    const chip = document.createElement("div");
    chip.className = "tag-chip";

    const label = document.createElement("span");
    label.textContent = item.label;
    label.title = item.url;
    chip.appendChild(label);

    const removeBtn = document.createElement("button");
    removeBtn.className = "tag-remove";
    removeBtn.type = "button";
    removeBtn.textContent = "×";
    removeBtn.addEventListener("click", () => {
      sourcePool = sourcePool.filter((entry) => entry.url !== item.url);
      renderSourceTags();
      refreshPrompt(true);
    });
    chip.appendChild(removeBtn);

    sourceTags.appendChild(chip);
  });
}

function renderKeywordTags() {
  const t = getStrings();
  keywordTags.innerHTML = "";
  if (!keywordWeights.length) {
    const empty = document.createElement("div");
    empty.className = "tag-empty";
    empty.textContent = t.keywordEmpty;
    keywordTags.appendChild(empty);
    return;
  }

  keywordWeights.forEach((item) => {
    const chip = document.createElement("div");
    chip.className = "tag-chip";

    const label = document.createElement("span");
    label.innerHTML = `${escapeHtml(item.label)} <strong>${item.weight}</strong>`;
    chip.appendChild(label);

    const removeBtn = document.createElement("button");
    removeBtn.className = "tag-remove";
    removeBtn.type = "button";
    removeBtn.textContent = "×";
    removeBtn.addEventListener("click", () => {
      keywordWeights = keywordWeights.filter((entry) => entry.label !== item.label);
      renderKeywordTags();
      events = events.map(scoreEventLocally).sort((a, b) => b.score - a.score);
      renderEvents();
      refreshPrompt(true);
    });
    chip.appendChild(removeBtn);

    keywordTags.appendChild(chip);
  });
}

function addSourceTag() {
  const url = rssInput.value.trim();
  if (!url) return;
  const existing = sourcePool.find((item) => item.url.toLowerCase() === url.toLowerCase());
  if (!existing) {
    const label = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    sourcePool.push({ label, url });
  }
  rssInput.value = "";
  rssPreset.value = "";
  renderSourceTags();
  refreshPrompt(true);
}

function addKeywordTag() {
  const label = keywordInput.value.trim();
  const weight = Math.max(1, Math.min(10, Number(keywordWeightInput.value) || 1));
  if (!label) return;

  const existing = keywordWeights.find((item) => item.label.toLowerCase() === label.toLowerCase());
  if (existing) {
    existing.label = label;
    existing.weight = weight;
  } else {
    keywordWeights.push({ label, weight });
  }

  keywordInput.value = "";
  keywordWeightInput.value = "8";
  renderKeywordTags();
  events = events.map(scoreEventLocally).sort((a, b) => b.score - a.score);
  renderEvents();
  refreshPrompt(true);
}

function applyLang(lang) {
  currentLang = lang;
  const t = getStrings();

  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  document.getElementById("heroEyebrow").textContent = t.heroEyebrow;
  document.getElementById("heroTitle").textContent = t.heroTitle;
  document.getElementById("heroDesc").textContent = t.heroDesc;
  document.getElementById("backLink").textContent = t.backLink;
  document.getElementById("sourceKicker").textContent = t.sourceKicker;
  document.getElementById("sourceTitle").textContent = t.sourceTitle;
  document.getElementById("presetLabel").textContent = t.presetLabel;
  rssPreset.options[0].textContent = t.presetPlaceholder;
  document.getElementById("customLabel").textContent = t.customLabel;
  rssInput.placeholder = t.rssInputPlaceholder;
  addSourceBtn.textContent = t.addSourceBtn;
  loadFeedBtn.textContent = loadFeedBtn.disabled ? t.loadFeedBtnLoading : t.loadFeedBtn;
  document.getElementById("sourceHint").textContent = t.sourceHint;
  document.getElementById("eventListTitle").textContent = t.eventListTitle;
  document.getElementById("composeKicker").textContent = t.composeKicker;
  document.getElementById("composeTitle").textContent = t.composeTitle;
  document.getElementById("selectedEventLabel").textContent = t.selectedEventLabel;
  document.getElementById("tweetLengthLabel").textContent = t.tweetLengthLabel;
  document.getElementById("emotionLabel").textContent = t.emotionLabel;
  document.getElementById("advancedLabel").textContent = t.advancedLabel;
  document.getElementById("promptLabel").textContent = t.promptLabel;
  document.getElementById("keywordWeightLabel").textContent = t.keywordWeightLabel;
  document.getElementById("keywordWeightHint").textContent = t.keywordWeightHint;
  keywordInput.placeholder = t.keywordPlaceholder;
  addKeywordBtn.textContent = t.addKeywordBtn;
  generateTweetBtn.textContent = generateTweetBtn.disabled ? t.generatingBtn : t.generateTweetBtn;
  rerollTweetBtn.textContent = t.rerollTweetBtn;
  downloadImageBtn.textContent = t.downloadImageBtn;
  sendTweetBtn.textContent = t.sendTweetBtn;
  copyTweetBtn.textContent = copyTweetBtn.disabled ? t.copyTweetBtn : t.copied;
  document.getElementById("outputTitle").textContent = t.outputTitle;
  document.title = `${t.heroTitle} — 木头`;
  document.querySelector('#tweetLength option[value="短"]').textContent = t.lengths.短;
  document.querySelector('#tweetLength option[value="中"]').textContent = t.lengths.中;
  document.querySelector('#tweetLength option[value="长"]').textContent = t.lengths.长;
  document.querySelectorAll('#emotionGrid .emotion-btn').forEach((btn) => {
    const key = btn.dataset.emotion;
    if (t.emotions[key]) btn.textContent = t.emotions[key];
  });
  if (!tweetOutput.dataset.generated) {
    tweetOutput.textContent = t.outputPlaceholder;
  }
  if (!outputStatus.dataset.ready) {
    outputStatus.textContent = t.outputStatusIdle;
  }

  renderSourceTags();
  renderKeywordTags();
  renderEvents();
  syncSelectedEvent();
  if (!promptDirty) refreshPrompt(true);
}

function triggerImageDownload(url) {
  const link = document.createElement("a");
  link.href = url;
  link.download = "";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function getProviderCredentials() {
  return chrome.storage.sync.get(["apiKey", "provider", "model"]);
}

async function callProvider(prompt, maxTokens = 1024) {
  const t = getStrings();
  const { apiKey, provider = "claude", model } = await getProviderCredentials();
  if (!apiKey) throw new Error(t.errNoKey);
  const providerCfg = PROVIDERS[provider] || PROVIDERS.claude;
  const activeModel = model || providerCfg.defaultModel;
  const { url, headers, body } = providerCfg.buildRequest(apiKey, activeModel, prompt, maxTokens);
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${response.status}`);
  }
  const data = await response.json();
  const output = providerCfg.parseReply(data);
  if (!output) throw new Error("Empty response");
  return output;
}

function parseXml(text) {
  const xml = new DOMParser().parseFromString(text, "text/xml");
  if (xml.querySelector("parsererror")) throw new Error("Invalid XML");
  return xml;
}

function getNodeText(parent, selectors) {
  for (const selector of selectors) {
    const node = parent.querySelector(selector);
    if (node?.textContent?.trim()) return node.textContent.trim();
  }
  return "";
}

function extractImageUrlFromHtml(html) {
  const match = String(html || "").match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] || "";
}

function extractItemImage(item) {
  const mediaContent = item.querySelector("media\\:content, content");
  if (mediaContent?.getAttribute("url")) return mediaContent.getAttribute("url");
  const mediaThumb = item.querySelector("media\\:thumbnail, thumbnail");
  if (mediaThumb?.getAttribute("url")) return mediaThumb.getAttribute("url");
  const enclosure = item.querySelector("enclosure[type^='image']");
  if (enclosure?.getAttribute("url")) return enclosure.getAttribute("url");
  const htmlContent = getNodeText(item, ["content\\:encoded", "description", "summary", "content"]);
  return extractImageUrlFromHtml(htmlContent);
}

function buildEventMeta(sourceLabel, publishedAt) {
  const relative = getRelativeTime(publishedAt);
  return {
    zh: `${sourceLabel} · ${relative.zh}`,
    en: `${sourceLabel} · ${relative.en}`
  };
}

function mapFeedItems(xml, source) {
  const isAtom = !!xml.querySelector("feed > entry");
  const itemNodes = Array.from(xml.querySelectorAll(isAtom ? "feed > entry" : "channel > item"));
  return itemNodes.slice(0, 8).map((item, index) => {
    const title = truncate(getNodeText(item, ["title"]) || source.label, 180);
    const rawDesc = getNodeText(item, isAtom ? ["summary", "content"] : ["description", "content\\:encoded"]);
    const desc = truncate(stripHtml(rawDesc) || title, 280);
    const linkNode = isAtom ? item.querySelector("link[rel='alternate'], link[href]") : item.querySelector("link");
    const link = linkNode?.getAttribute("href") || linkNode?.textContent?.trim() || "";
    const publishedAt = getNodeText(item, isAtom ? ["updated", "published"] : ["pubDate", "dc\\:date"]);
    const imageUrl = extractItemImage(item);
    return {
      id: `${source.label}-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`,
      title: { zh: title, en: title },
      desc: { zh: desc, en: desc },
      meta: buildEventMeta(source.label, publishedAt),
      imageUrl,
      link,
      score: 0,
      matchedKeywords: [],
      scoreReason: ""
    };
  });
}

async function fetchSourceEvents(source) {
  const response = await fetch(source.url, { method: "GET" });
  if (!response.ok) throw new Error(`${source.label}: HTTP ${response.status}`);
  const text = await response.text();
  const xml = parseXml(text);
  return mapFeedItems(xml, source);
}

function buildScoringPrompt(candidates) {
  const keywords = keywordWeights.length
    ? keywordWeights.map((item) => `- ${item.label}: ${item.weight}/10`).join("\n")
    : "- none";

  const eventBlock = candidates.map((event) => {
    const title = event.title.en || event.title.zh;
    const desc = event.desc.en || event.desc.zh;
    const source = event.meta.en || event.meta.zh;
    return `ID: ${event.id}
Title: ${title}
Description: ${desc}
Meta: ${source}`;
  }).join("\n\n");

  return `You are ranking RSS news items for a tweet joke generator.

Score each candidate event from 0 to 100.
Primary signal: keyword weights.
Secondary signals: recognizability, conflict, meme potential, and shareability.
Do not invent new IDs.

Keyword weights:
${keywords}

Candidates:
${eventBlock}

Return strict JSON only in this shape:
{"scores":[{"id":"event-id","score":88,"reason":"short reason"}]}`;
}

async function scoreEventsWithLLM(candidates) {
  const scoringPrompt = buildScoringPrompt(candidates);
  const raw = await callProvider(scoringPrompt, 1400);
  const parsed = extractJsonBlock(raw);
  const scoreMap = new Map(
    (parsed.scores || []).map((item) => [item.id, {
      score: Number(item.score) || 0,
      reason: String(item.reason || "")
    }])
  );

  return candidates.map((event) => {
    const local = scoreEventLocally(event);
    const llm = scoreMap.get(event.id);
    return {
      ...local,
      score: llm ? llm.score : local.score,
      scoreReason: llm?.reason || local.scoreReason
    };
  }).sort((a, b) => b.score - a.score);
}

function setEventStatus(statusKey) {
  const t = getStrings();
  eventStatus.textContent = t[statusKey] || statusKey;
}

function setOutputStatus(statusKey) {
  const t = getStrings();
  outputStatus.textContent = t[statusKey] || statusKey;
  outputStatus.dataset.ready = statusKey === "outputStatusReady" ? "true" : "";
}

async function loadAndScoreFeeds() {
  const t = getStrings();
  if (!sourcePool.length) {
    setEventStatus("eventStatusError");
    tweetOutput.textContent = t.errNoSource;
    return;
  }

  loadFeedBtn.disabled = true;
  loadFeedBtn.textContent = t.loadFeedBtnLoading;
  setEventStatus("eventStatusLoadingFeeds");

  try {
    const settled = await Promise.allSettled(sourcePool.map(fetchSourceEvents));
    const feedEvents = settled.flatMap((result) => result.status === "fulfilled" ? result.value : []);
    if (!feedEvents.length) throw new Error(t.errNoEvents);

    setEventStatus("eventStatusScoring");
    let rankedEvents;
    try {
      rankedEvents = await scoreEventsWithLLM(feedEvents.slice(0, 24));
    } catch {
      rankedEvents = feedEvents.map(scoreEventLocally).sort((a, b) => b.score - a.score);
    }

    events = rankedEvents;
    currentDrawEventId = events[0]?.id || null;
    renderEvents();
    refreshPrompt(true);
    setEventStatus("eventStatusReady");
  } catch (error) {
    setEventStatus("eventStatusError");
    tweetOutput.textContent = `${t.errLoadPrefix}${error.message}`;
    setOutputStatus("outputStatusError");
  } finally {
    loadFeedBtn.disabled = false;
    loadFeedBtn.textContent = t.loadFeedBtn;
  }
}

function getPromptForGeneration(event) {
  if (!promptDirty) return buildDefaultPrompt(event);
  return tweetPrompt.value.trim() || buildDefaultPrompt(event);
}

function splitIntoParagraphs(body) {
  const cleanBody = String(body || "").trim();
  const sentences = cleanBody
    .split(/(?<=[。！？!?\.])\s*/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  if (cleanBody.length < 110 || sentences.length < 4) return cleanBody;

  const totalLength = sentences.reduce((sum, sentence) => sum + sentence.length, 0);
  const midpoint = totalLength / 2;
  let runningLength = 0;
  let splitIndex = -1;

  for (let index = 0; index < sentences.length - 1; index += 1) {
    runningLength += sentences[index].length;
    const leftLength = runningLength;
    const rightLength = totalLength - runningLength;
    if (runningLength >= midpoint && leftLength >= 40 && rightLength >= 40) {
      splitIndex = index + 1;
      break;
    }
  }

  if (splitIndex <= 0 || splitIndex >= sentences.length) return cleanBody;
  return `${sentences.slice(0, splitIndex).join("")}\n\n${sentences.slice(splitIndex).join("")}`;
}

function formatGeneratedTweet(rawText) {
  const normalized = String(rawText || "").replace(/\r\n/g, "\n").trim();
  if (!normalized) return "";

  const lines = normalized.split("\n").map((line) => line.trim());
  const compactLines = lines.filter(Boolean);
  const hashtagLine = compactLines.at(-1)?.startsWith("#") ? compactLines.at(-1) : "";
  const bodyLines = hashtagLine ? compactLines.slice(0, -1) : compactLines;
  let body = bodyLines.join("\n");

  if (body && !body.includes("\n\n")) {
    body = splitIntoParagraphs(body);
  }

  if (!hashtagLine) return body || normalized;
  return body ? `${body}\n\n${hashtagLine}` : hashtagLine;
}

async function drawResult(isReroll = false) {
  const t = getStrings();
  const candidatePool = events.slice(0, Math.min(10, events.length));
  const picked = candidatePool[Math.floor(Math.random() * candidatePool.length)] || events[0];
  if (!picked) {
    tweetOutput.textContent = t.errNoEvents;
    setOutputStatus("outputStatusError");
    return;
  }

  currentDrawEventId = picked.id;
  syncSelectedEvent();
  if (!promptDirty) refreshPrompt(true);

  generateTweetBtn.disabled = true;
  rerollTweetBtn.disabled = true;
  generateTweetBtn.textContent = t.generatingBtn;
  setOutputStatus("outputStatusGenerating");
  sendTweetBtn.disabled = true;
  copyTweetBtn.disabled = true;

  try {
    const finalPrompt = getPromptForGeneration(picked);
    const generated = await callProvider(finalPrompt, 700);
    tweetOutput.textContent = formatGeneratedTweet(generated);

    tweetOutput.dataset.generated = "true";
    setOutputStatus("outputStatusReady");
    copyTweetBtn.disabled = false;
    sendTweetBtn.disabled = false;
    copyTweetBtn.textContent = t.copyTweetBtn;
  } catch (error) {
    tweetOutput.textContent = `${t.errGeneratePrefix}${error.message}`;
    setOutputStatus("outputStatusError");
  } finally {
    generateTweetBtn.disabled = false;
    rerollTweetBtn.disabled = false;
    generateTweetBtn.textContent = t.generateTweetBtn;
  }
}

document.getElementById("emotionGrid").querySelectorAll(".emotion-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".emotion-btn").forEach((node) => node.classList.remove("active"));
    btn.classList.add("active");
    currentEmotion = btn.dataset.emotion;
    refreshPrompt(true);
  });
});

tweetPrompt.addEventListener("input", () => {
  promptDirty = true;
});

tweetLength.addEventListener("change", () => {
  refreshPrompt(true);
});

advancedToggle.addEventListener("click", () => {
  const open = advancedPanel.classList.toggle("open");
  advancedToggle.classList.toggle("open", open);
});

rssPreset.addEventListener("change", () => {
  if (rssPreset.value) rssInput.value = rssPreset.value;
});

addSourceBtn.addEventListener("click", addSourceTag);
rssInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addSourceTag();
  }
});

loadFeedBtn.addEventListener("click", loadAndScoreFeeds);

addKeywordBtn.addEventListener("click", addKeywordTag);
keywordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addKeywordTag();
  }
});

generateTweetBtn.addEventListener("click", () => {
  drawResult(false);
});

rerollTweetBtn.addEventListener("click", () => {
  drawResult(true);
});

copyTweetBtn.addEventListener("click", async () => {
  if (copyTweetBtn.disabled) return;
  await navigator.clipboard.writeText(tweetOutput.textContent);
  copyTweetBtn.textContent = getStrings().copied;
  setTimeout(() => {
    copyTweetBtn.textContent = getStrings().copyTweetBtn;
  }, 1600);
});

sendTweetBtn.addEventListener("click", () => {
  if (sendTweetBtn.disabled) return;
  const text = tweetOutput.textContent.trim();
  if (!text) return;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
});

downloadImageBtn.addEventListener("click", () => {
  if (downloadImageBtn.disabled) return;
  const event = getCurrentEventObject();
  if (!event?.imageUrl) return;
  triggerImageDownload(event.imageUrl);
});

chrome.storage.sync.get(["uiLang", "theme"], ({ uiLang = "zh", theme = "dark" }) => {
  currentLang = uiLang;
  applyTheme(theme);
  applyLang(uiLang);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "sync") return;
  if (changes.theme) applyTheme(changes.theme.newValue || "dark");
  if (changes.uiLang) applyLang(changes.uiLang.newValue || "zh");
});
