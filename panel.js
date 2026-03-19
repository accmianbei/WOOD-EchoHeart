// ── I18N ──
const I18N = {
  zh: {
    sectionReply: "生成回复",
    copyBtn: "⎘ 复制",
    copyBtnCopied: "已复制",
    replyPlaceholder: "等待生成...",
    advancedLabel: "高级选项",
    labelPersonality: "人格",
    labelLength: "长度",
    labelTone: "语气",
    labelPrompt: "提示词",
    resetBtn: "重置",
    resetPrefsBtn: "恢复偏好",
    resetDone: "已恢复",
    sectionEmotion: "情绪风格",
    generateBtn: "生成回复",
    loadingText: "生成中...",
    loadingMsg: "正在生成回复...",
    toneGentle: "温和",
    toneIntense: "热烈",
    promptPlaceholder: "使用 {{原文}} 代表选中的文字",
    personalities: {
      朋友: "贴心朋友",
      导师: "智慧导师",
      职场同事: "职场同事",
      心理咨询师: "心理咨询师",
      家人: "温暖家人"
    },
    lengths: { 短: "短", 中: "中", 长: "长" },
    emotions: {
      温暖: "温暖", 共情: "共情", 鼓励: "鼓励", 幽默: "幽默",
      专业: "专业", 关怀: "关怀", 感谢: "感谢", 道歉: "道歉",
      愤怒: "愤怒", 反串: "反串"
    },
    errNoText: "请先在网页上选中文字，然后右键使用此功能",
    errNoKey: "请先点击右上角 ⚙️ 设置 API Key",
    errEmpty: "返回内容为空",
    errFail: "生成失败：",
    errCopy: "复制失败，请手动选中回复内容复制"
  },
  en: {
    sectionReply: "Reply",
    copyBtn: "⎘ Copy",
    copyBtnCopied: "Copied",
    replyPlaceholder: "Waiting for generation...",
    advancedLabel: "Advanced",
    labelPersonality: "Persona",
    labelLength: "Length",
    labelTone: "Tone",
    labelPrompt: "Prompt",
    resetBtn: "Reset",
    resetPrefsBtn: "Reset Prefs",
    resetDone: "Reset",
    sectionEmotion: "Emotion",
    generateBtn: "Generate Reply",
    loadingText: "Generating...",
    loadingMsg: "Generating reply...",
    toneGentle: "Gentle",
    toneIntense: "Intense",
    promptPlaceholder: "Use {{text}} to represent the selected text",
    personalities: {
      朋友: "Best Friend",
      导师: "Wise Mentor",
      职场同事: "Colleague",
      心理咨询师: "Therapist",
      家人: "Family"
    },
    lengths: { 短: "S", 中: "M", 长: "L" },
    emotions: {
      温暖: "Warm", 共情: "Empathy", 鼓励: "Cheer", 幽默: "Humor",
      专业: "Pro", 关怀: "Care", 感谢: "Thanks", 道歉: "Sorry",
      愤怒: "Angry", 反串: "Ironic Roleplay"
    },
    errNoText: "Please select text on a webpage first, then right-click to use this feature",
    errNoKey: "Please click the ⚙️ icon to set your API Key",
    errEmpty: "Empty response received",
    errFail: "Generation failed: ",
    errCopy: "Copy failed, please manually copy the reply"
  }
};

// ── State ──
let selectedText = "";
let currentEmotion = "温暖";
let currentLength = "中";
let currentTone = 3;
let currentPersonality = "朋友";
let generatedReply = "";
let promptDirty = false;
let currentLang = "zh";
let currentReplyLang = "zh";

const PANEL_PREFS_KEY = "replyPanelPrefs";
const DEFAULT_PANEL_PREFS = {
  emotion: "温暖",
  length: "中",
  tone: 3,
  personality: "朋友",
  replyLang: "zh",
  advancedOpen: false,
  promptDirty: false,
  promptText: ""
};

// ── DOM Refs ──
const replyBox = document.getElementById("replyBox");
const copyBtn = document.getElementById("copyBtn");
const copyText = document.getElementById("copyText");
const generateBtn = document.getElementById("generateBtn");
const generateIcon = document.getElementById("generateIcon");
const generateText = document.getElementById("generateText");
const advancedToggle = document.getElementById("advancedToggle");
const advancedPanel = document.getElementById("advancedPanel");
const toggleArrow = document.getElementById("toggleArrow");
const personalitySelect = document.getElementById("personalitySelect");
const toneSlider = document.getElementById("toneSlider");
const promptEditor = document.getElementById("promptEditor");
const resetPromptBtn = document.getElementById("resetPromptBtn");
const resetPrefsBtn = document.getElementById("resetPrefsBtn");

function getEmotionButtons() {
  return document.querySelectorAll(".emotion-btn");
}

function getLengthButtons() {
  return document.querySelectorAll(".length-btn");
}

function getReplyLangButtons() {
  return document.querySelectorAll(".lang-btn");
}

function setActiveEmotion(emotion) {
  getEmotionButtons().forEach((btn) => btn.classList.toggle("active", btn.dataset.emotion === emotion));
}

function setActiveLength(length) {
  getLengthButtons().forEach((btn) => btn.classList.toggle("active", btn.dataset.length === length));
}

function setActiveReplyLang(lang) {
  getReplyLangButtons().forEach((btn) => btn.classList.toggle("active", btn.dataset.replyLang === lang));
}

function setAdvancedOpen(isOpen) {
  advancedPanel.classList.toggle("open", isOpen);
  toggleArrow.classList.toggle("open", isOpen);
}

function savePanelPreferences() {
  chrome.storage.local.set({
    [PANEL_PREFS_KEY]: {
      emotion: currentEmotion,
      length: currentLength,
      tone: currentTone,
      personality: currentPersonality,
      replyLang: currentReplyLang,
      advancedOpen: advancedPanel.classList.contains("open"),
      promptDirty,
      promptText: promptEditor.value
    }
  });
}

function flashButtonText(button, nextText, delay = 1600) {
  const previousText = button.textContent;
  button.textContent = nextText;
  clearTimeout(button._flashTimer);
  button._flashTimer = setTimeout(() => {
    button.textContent = previousText;
  }, delay);
}

function applyPanelPreferences(savedPrefs = {}) {
  const prefs = { ...DEFAULT_PANEL_PREFS, ...savedPrefs };
  currentEmotion = prefs.emotion;
  currentLength = prefs.length;
  currentTone = Number(prefs.tone) || DEFAULT_PANEL_PREFS.tone;
  currentPersonality = prefs.personality;
  currentReplyLang = prefs.replyLang;
  promptDirty = !!prefs.promptDirty;

  personalitySelect.value = currentPersonality;
  toneSlider.value = String(currentTone);
  setActiveEmotion(currentEmotion);
  setActiveLength(currentLength);
  setActiveReplyLang(currentReplyLang);
  setAdvancedOpen(!!prefs.advancedOpen);

  if (promptDirty && prefs.promptText) {
    promptEditor.value = prefs.promptText;
    promptEditor.classList.add("dirty");
  } else {
    promptDirty = false;
    promptEditor.classList.remove("dirty");
    syncPromptEditor();
  }
}

// ── Apply Language ──
function applyLang(lang) {
  const t = I18N[lang] || I18N.zh;
  currentLang = lang;

  // Static labels via data-i18n
  document.querySelector('.reply-header .section-label').textContent = t.sectionReply;
  copyText.textContent = t.copyBtn;
  if (replyBox.classList.contains('empty')) replyBox.textContent = t.replyPlaceholder;
  document.querySelector('.adv-label').textContent = t.advancedLabel;
  document.querySelector('.emotion-body .section-label').textContent = t.sectionEmotion;
  generateText.textContent = t.generateBtn;
  resetPromptBtn.textContent = t.resetBtn;
  resetPrefsBtn.textContent = t.resetPrefsBtn;
  promptEditor.placeholder = t.promptPlaceholder;

  // data-i18n option labels
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t['label' + key.charAt(0).toUpperCase() + key.slice(1)]) {
      el.textContent = t['label' + key.charAt(0).toUpperCase() + key.slice(1)];
    }
  });

  // Tone labels
  const toneLabels = document.querySelectorAll('.slider-label');
  if (toneLabels[0]) toneLabels[0].textContent = t.toneGentle;
  if (toneLabels[1]) toneLabels[1].textContent = t.toneIntense;

  // Personality options
  personalitySelect.querySelectorAll('option').forEach(opt => {
    const key = opt.value;
    if (t.personalities[key]) opt.textContent = t.personalities[key];
  });

  // Length buttons
  document.querySelectorAll('.length-btn').forEach(btn => {
    const key = btn.dataset.length;
    if (t.lengths[key]) btn.textContent = t.lengths[key];
  });

  // Emotion labels
  document.querySelectorAll('.emotion-btn').forEach(btn => {
    const key = btn.dataset.emotion;
    if (t.emotions[key]) btn.querySelector('.emo-label').textContent = t.emotions[key];
  });

// Rebuild prompt if not dirty
  if (!promptDirty) syncPromptEditor();
}

// ── Init ──
async function init() {
  const [{ selectedText: text }, { uiLang = "zh", theme = "dark" }, { [PANEL_PREFS_KEY]: panelPrefs = DEFAULT_PANEL_PREFS }] = await Promise.all([
    chrome.storage.session.get("selectedText"),
    chrome.storage.sync.get(["uiLang", "theme"]),
    chrome.storage.local.get(PANEL_PREFS_KEY)
  ]);

  selectedText = text || "";
  document.documentElement.dataset.theme = theme;
  applyLang(uiLang);
  applyPanelPreferences(panelPrefs);
}

// ── Emotion buttons ──
document.querySelectorAll(".emotion-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentEmotion = btn.dataset.emotion;
    setActiveEmotion(currentEmotion);
    syncPromptEditor();
    savePanelPreferences();
  });
});

// ── Length buttons ──
document.querySelectorAll(".length-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLength = btn.dataset.length;
    setActiveLength(currentLength);
    syncPromptEditor();
    savePanelPreferences();
  });
});

// ── Personality select ──
personalitySelect.addEventListener("change", () => {
  currentPersonality = personalitySelect.value;
  syncPromptEditor();
  savePanelPreferences();
});

// ── Tone slider ──
toneSlider.addEventListener("input", () => {
  currentTone = parseInt(toneSlider.value);
  syncPromptEditor();
  savePanelPreferences();
});

// ── Reply language toggle ──
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentReplyLang = btn.dataset.replyLang;
    setActiveReplyLang(currentReplyLang);
    syncPromptEditor();
    savePanelPreferences();
  });
});

// ── Advanced toggle ──
advancedToggle.addEventListener("click", () => {
  const isOpen = advancedPanel.classList.toggle("open");
  toggleArrow.classList.toggle("open", isOpen);
  savePanelPreferences();
});

// ── Copy helper (with execCommand fallback) ──
function copyTextFallback(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  if (!ok) throw new Error("execCommand failed");
}

// ── Copy button ──
copyBtn.addEventListener("click", async () => {
  if (!generatedReply) return;
  const t = I18N[currentLang] || I18N.zh;
  try {
    try {
      await navigator.clipboard.writeText(generatedReply);
    } catch {
      copyTextFallback(generatedReply);
    }
    copyBtn.classList.add("copied");
    copyText.textContent = t.copyBtnCopied;
    setTimeout(() => {
      copyText.textContent = t.copyBtn;
      copyBtn.classList.remove("copied");
    }, 2000);
  } catch {
    showCopyError(t.errCopy);
  }
});

// ── Prompt templates ──
function buildTemplate() {
  if (currentLang === 'en') return buildTemplateEn();
  const lengthMap = { 短: "10-18字", 中: "30-45字", 长: "100-130字" };
  const toneMap = { 1: "非常温和、轻声细语", 2: "温和亲切", 3: "自然真诚", 4: "热情积极", 5: "非常热烈、充满激情" };
  const personalityPrompts = {
    朋友: "你是一个贴心的好朋友，语气亲密自然，像在和老朋友聊天",
    导师: "你是一位睿智的导师，给予有深度的见解和引导，语气温和有力",
    职场同事: "你是一位专业的职场同事，回复得体、礼貌而有建设性",
    心理咨询师: "你是一位专业的心理咨询师，善于倾听、理解和给予情感支持",
    家人: "你是温暖的家人，充满爱意和关怀，语气温柔体贴"
  };
  const emotionPrompts = {
    温暖: "整体氛围要温柔、柔和，让人感到被安稳接住",
    共情: "重点放在理解对方处境和情绪上，让回复有陪伴感但不过度说教",
    鼓励: "传达支持、打气和向前看的力量，让人读完更有劲",
    幽默: "可以轻松俏皮一点，带一点幽默感，但不要油腻或冒犯",
    专业: "表达要清晰、克制、得体，给人可靠和有分寸的感觉",
    关怀: "语气要细腻体贴，像在认真照顾对方的情绪和状态",
    感谢: "把谢意说得真诚具体，让人感到被珍惜、被看见",
    道歉: "道歉要诚恳负责，不找借口，表达修复关系的态度",
    愤怒: "情绪上要明确带有不满和火气，态度强硬、有压迫感；可以尖锐，但不要爆粗口、不要低俗辱骂，也不要失控到完全不可沟通",
    反串: "用一本正经却带点阴阳怪气的方式表达，表面像在顺着对方，实际是在反着说、轻轻讽刺；要有戏谑感和反差感，但不要过度粗俗"
  };
  return `${personalityPrompts[currentPersonality] || personalityPrompts["朋友"]}。

对方说了以下这段话：
"""
{{原文}}
"""

请以"${currentEmotion}"的情绪风格，用${toneMap[currentTone]}的语气，生成一条长度控制在${lengthMap[currentLength]}的回复。
情绪要求：${emotionPrompts[currentEmotion] || `整体体现明显的"${currentEmotion}"情绪特征`}。

要求：
- 回复要自然真诚，有人情味
- 不要用"我理解你的感受"这类套话
- 直接给出回复内容，不需要任何前缀或说明
- ${currentReplyLang === 'en' ? 'Reply in English' : '使用中文回复'}`;
}

function buildTemplateEn() {
  const lengthMap = { 短: "10-18 characters", 中: "30-45 characters", 长: "100-130 characters" };
  const toneMap = { 1: "very gentle and soft", 2: "gentle and warm", 3: "natural and sincere", 4: "enthusiastic and positive", 5: "very passionate and energetic" };
  const personalityPrompts = {
    朋友: "You are a caring best friend, speaking naturally and intimately, like talking to an old friend",
    导师: "You are a wise mentor, offering deep insights and guidance with a warm yet firm tone",
    职场同事: "You are a professional colleague, responding appropriately and constructively",
    心理咨询师: "You are a professional therapist, skilled at listening, understanding, and providing emotional support",
    家人: "You are a warm family member, full of love and care, speaking gently and tenderly"
  };
  const emotionPrompts = {
    温暖: "Keep the overall feeling warm, soft, and emotionally reassuring",
    共情: "Focus on understanding the other person's situation and emotions without sounding formulaic",
    鼓励: "Convey support, confidence, and uplifting energy that helps the reader feel stronger",
    幽默: "Be light and playful with a sense of humor, but never cringey or offensive",
    专业: "Keep the expression clear, measured, and appropriate, with a reliable tone",
    关怀: "Sound attentive, gentle, and sincerely caring toward the other person's emotional state",
    感谢: "Express gratitude in a sincere and specific way that makes the other person feel appreciated",
    道歉: "Apologize with sincerity and accountability, without making excuses",
    愤怒: "Make the reply clearly angry, dissatisfied, and forceful, with real edge and pressure; it can be sharp, but avoid profanity, cheap insults, or fully uncontrolled rage",
    反串: "Use a straight-faced but sarcastic roleplay style: sound as if you are agreeing on the surface while actually mocking or reversing the meaning in a sly, teasing way, without becoming too vulgar"
  };
  return `${personalityPrompts[currentPersonality] || personalityPrompts["朋友"]}.

The other person said:
"""
{{text}}
"""

Please generate a reply in a "${I18N.en.emotions[currentEmotion] || currentEmotion}" emotional style, with a ${toneMap[currentTone]} tone, and keep the reply within ${lengthMap[currentLength]}.
Emotion guidance: ${emotionPrompts[currentEmotion] || `Show a clear "${I18N.en.emotions[currentEmotion] || currentEmotion}" emotional signature`}.

Requirements:
- The reply should feel natural and sincere
- Avoid clichés like "I understand how you feel"
- Provide only the reply content without any prefix or explanation
- ${currentReplyLang === 'zh' ? 'Reply in Chinese (中文)' : 'Reply in English'}`;
}

function syncPromptEditor() {
  if (!promptDirty) {
    promptEditor.value = buildTemplate();
  }
}

promptEditor.addEventListener("input", () => {
  promptDirty = true;
  promptEditor.classList.add("dirty");
  savePanelPreferences();
});

resetPromptBtn.addEventListener("click", () => {
  promptDirty = false;
  promptEditor.classList.remove("dirty");
  syncPromptEditor();
  savePanelPreferences();
});

resetPrefsBtn.addEventListener("click", async () => {
  await chrome.storage.local.remove(PANEL_PREFS_KEY);
  applyPanelPreferences(DEFAULT_PANEL_PREFS);
  savePanelPreferences();
  flashButtonText(resetPrefsBtn, (I18N[currentLang] || I18N.zh).resetDone);
});

// ── Provider configs ──
const PROVIDERS = {
  claude: {
    label: "Claude",
    url: "https://api.anthropic.com/v1/messages",
    defaultModel: "claude-sonnet-4-6",
    buildRequest(apiKey, model, prompt) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: { model, max_tokens: 512, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) { return data.content?.[0]?.text || ""; }
  },
  deepseek: {
    label: "DeepSeek",
    url: "https://api.deepseek.com/chat/completions",
    defaultModel: "deepseek-chat",
    buildRequest(apiKey, model, prompt) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: { model, max_tokens: 512, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) { return data.choices?.[0]?.message?.content || ""; }
  },
  openai: {
    label: "OpenAI",
    url: "https://api.openai.com/v1/chat/completions",
    defaultModel: "gpt-4o-mini",
    buildRequest(apiKey, model, prompt) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: { model, max_tokens: 512, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) { return data.choices?.[0]?.message?.content || ""; }
  },
  gemini: {
    label: "Gemini",
    url: "https://generativelanguage.googleapis.com/v1beta/models/",
    defaultModel: "gemini-2.0-flash",
    buildRequest(apiKey, model, prompt) {
      return {
        url: `${this.url}${model}:generateContent?key=${apiKey}`,
        headers: { "Content-Type": "application/json" },
        body: { contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 512 } }
      };
    },
    parseReply(data) { return data.candidates?.[0]?.content?.parts?.[0]?.text || ""; }
  },
  grok: {
    label: "Grok",
    url: "https://api.x.ai/v1/chat/completions",
    defaultModel: "grok-3-mini",
    buildRequest(apiKey, model, prompt) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: { model, max_tokens: 512, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) { return data.choices?.[0]?.message?.content || ""; }
  },
  glm: {
    label: "GLM",
    url: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
    defaultModel: "glm-4-flash",
    buildRequest(apiKey, model, prompt) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: { model, max_tokens: 512, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) { return data.choices?.[0]?.message?.content || ""; }
  },
  qwen: {
    label: "Qwen",
    url: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    defaultModel: "qwen-turbo",
    buildRequest(apiKey, model, prompt) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: { model, max_tokens: 512, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) { return data.choices?.[0]?.message?.content || ""; }
  },
  moonshot: {
    label: "Moonshot",
    url: "https://api.moonshot.cn/v1/chat/completions",
    defaultModel: "moonshot-v1-8k",
    buildRequest(apiKey, model, prompt) {
      return {
        url: this.url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: { model, max_tokens: 512, messages: [{ role: "user", content: prompt }] }
      };
    },
    parseReply(data) { return data.choices?.[0]?.message?.content || ""; }
  }
};

// ── Generate ──
async function generate() {
  const t = I18N[currentLang] || I18N.zh;

  if (!selectedText) {
    showError(t.errNoText);
    return;
  }

  const { apiKey, provider = "claude", model } = await chrome.storage.sync.get(["apiKey", "provider", "model"]);
  if (!apiKey) {
    showError(t.errNoKey);
    return;
  }

  const providerCfg = PROVIDERS[provider] || PROVIDERS.claude;
  const activeModel = model || providerCfg.defaultModel;

  setLoadingState(true);

  try {
    // Support both {{原文}} and {{text}} variable names
    const finalPrompt = promptEditor.value
      .replace(/\{\{原文\}\}|\{\{text\}\}/g, selectedText) || buildPromptDirect();

    const { url, headers, body } = providerCfg.buildRequest(apiKey, activeModel, finalPrompt);
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
    generatedReply = providerCfg.parseReply(data);

    if (!generatedReply) throw new Error(t.errEmpty);

    showReply(generatedReply);
  } catch (e) {
    showError(`${t.errFail}${e.message}`);
  } finally {
    setLoadingState(false);
  }
}

// Build prompt with selectedText directly injected (fallback)
function buildPromptDirect() {
  return buildTemplate().replace(/\{\{原文\}\}|\{\{text\}\}/g, selectedText);
}

// ── UI Helpers ──
function setLoadingState(loading) {
  const t = I18N[currentLang] || I18N.zh;
  generateBtn.disabled = loading;
  if (loading) {
    generateText.textContent = t.loadingText;
    replyBox.className = "reply-box loading";
    replyBox.innerHTML = `<div class="dots"><span></span><span></span><span></span></div><span>${t.loadingMsg}</span>`;
    copyBtn.disabled = true;
  } else {
    generateText.textContent = t.generateBtn;
  }
}

function showReply(text) {
  replyBox.className = "reply-box";
  replyBox.textContent = text;
  copyBtn.disabled = false;
}

function showError(msg) {
  replyBox.className = "reply-box";
  replyBox.innerHTML = `<span class="error-text">⚠️ ${msg}</span>`;
  copyBtn.disabled = true;
}

let _copyToastTimer = null;
function showCopyError(msg) {
  const toast = document.getElementById("copyToast");
  toast.textContent = `⚠️ ${msg}`;
  toast.classList.add("visible");
  clearTimeout(_copyToastTimer);
  _copyToastTimer = setTimeout(() => toast.classList.remove("visible"), 3000);
}

// ── Close button ──
document.getElementById("closeBtn").addEventListener("click", () => {
  window.parent.postMessage("closePanel", "*");
});

// ── Bind generate ──
generateBtn.addEventListener("click", generate);

// ── Scrollbar highlight on scroll ──
(function () {
  const timers = new WeakMap();
  function onScroll(e) {
    const el = (e.target === document || e.target === window)
      ? document.documentElement
      : e.target;
    el.classList.add("is-scrolling");
    clearTimeout(timers.get(el));
    timers.set(el, setTimeout(() => el.classList.remove("is-scrolling"), 800));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("scroll", onScroll, { passive: true, capture: true });
})();

// ── Start ──
init();
