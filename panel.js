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
      专业: "专业", 关怀: "关怀", 感谢: "感谢", 道歉: "道歉"
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
      专业: "Pro", 关怀: "Care", 感谢: "Thanks", 道歉: "Sorry"
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
  const [{ selectedText: text }, { uiLang = "zh", theme = "dark" }] = await Promise.all([
    chrome.storage.session.get("selectedText"),
    chrome.storage.sync.get(["uiLang", "theme"])
  ]);

  selectedText = text || "";
  document.documentElement.dataset.theme = theme;
  applyLang(uiLang);
}

// ── Emotion buttons ──
document.querySelectorAll(".emotion-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".emotion-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentEmotion = btn.dataset.emotion;
    syncPromptEditor();
  });
});

// ── Length buttons ──
document.querySelectorAll(".length-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".length-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentLength = btn.dataset.length;
    syncPromptEditor();
  });
});

// ── Personality select ──
personalitySelect.addEventListener("change", () => {
  currentPersonality = personalitySelect.value;
  syncPromptEditor();
});

// ── Tone slider ──
toneSlider.addEventListener("input", () => {
  currentTone = parseInt(toneSlider.value);
  syncPromptEditor();
});

// ── Reply language toggle ──
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentReplyLang = btn.dataset.replyLang;
    syncPromptEditor();
  });
});

// ── Advanced toggle ──
advancedToggle.addEventListener("click", () => {
  const isOpen = advancedPanel.classList.toggle("open");
  toggleArrow.classList.toggle("open", isOpen);
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
  const lengthMap = { 短: "1-2句话", 中: "3-5句话", 长: "5-8句话" };
  const toneMap = { 1: "非常温和、轻声细语", 2: "温和亲切", 3: "自然真诚", 4: "热情积极", 5: "非常热烈、充满激情" };
  const personalityPrompts = {
    朋友: "你是一个贴心的好朋友，语气亲密自然，像在和老朋友聊天",
    导师: "你是一位睿智的导师，给予有深度的见解和引导，语气温和有力",
    职场同事: "你是一位专业的职场同事，回复得体、礼貌而有建设性",
    心理咨询师: "你是一位专业的心理咨询师，善于倾听、理解和给予情感支持",
    家人: "你是温暖的家人，充满爱意和关怀，语气温柔体贴"
  };
  return `${personalityPrompts[currentPersonality] || personalityPrompts["朋友"]}。

对方说了以下这段话：
"""
{{原文}}
"""

请以"${currentEmotion}"的情绪风格，用${toneMap[currentTone]}的语气，生成一段${lengthMap[currentLength]}的回复。

要求：
- 回复要自然真诚，有人情味
- 不要用"我理解你的感受"这类套话
- 直接给出回复内容，不需要任何前缀或说明
- ${currentReplyLang === 'en' ? 'Reply in English' : '使用中文回复'}`;
}

function buildTemplateEn() {
  const lengthMap = { 短: "1-2 sentences", 中: "3-5 sentences", 长: "5-8 sentences" };
  const toneMap = { 1: "very gentle and soft", 2: "gentle and warm", 3: "natural and sincere", 4: "enthusiastic and positive", 5: "very passionate and energetic" };
  const personalityPrompts = {
    朋友: "You are a caring best friend, speaking naturally and intimately, like talking to an old friend",
    导师: "You are a wise mentor, offering deep insights and guidance with a warm yet firm tone",
    职场同事: "You are a professional colleague, responding appropriately and constructively",
    心理咨询师: "You are a professional therapist, skilled at listening, understanding, and providing emotional support",
    家人: "You are a warm family member, full of love and care, speaking gently and tenderly"
  };
  return `${personalityPrompts[currentPersonality] || personalityPrompts["朋友"]}.

The other person said:
"""
{{text}}
"""

Please generate a reply in a "${I18N.en.emotions[currentEmotion] || currentEmotion}" emotional style, with a ${toneMap[currentTone]} tone, in ${lengthMap[currentLength]}.

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
});

resetPromptBtn.addEventListener("click", () => {
  promptDirty = false;
  promptEditor.classList.remove("dirty");
  syncPromptEditor();
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
