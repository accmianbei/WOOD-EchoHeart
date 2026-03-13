const input = document.getElementById("apiKeyInput");
const modelInput = document.getElementById("modelInput");
const providerSelect = document.getElementById("providerSelect");
const toggleBtn = document.getElementById("toggleVisibility");
const saveBtn = document.getElementById("saveBtn");
const statusEl = document.getElementById("status");
const hintText = document.getElementById("hintText");

// ── I18N ──
const OPTIONS_I18N = {
  zh: {
    subtitle: "配置你的 API 连接",
    labelProvider: "API 提供商",
    labelModel: "模型名称",
    labelKey: "API KEY",
    modelPlaceholder: (m) => `留空使用默认：${m}`,
    saveBtn: "保存设置",
    errNoKey: "⚠️ 请输入 API Key",
    saved: "保存成功 (´▽`ʃ♡ƪ)",
    hints: {
      claude:   { pre: "在 ", linkText: "Anthropic Console",    url: "https://console.anthropic.com/account/keys",              post: " 获取 API Key。", note: "Key 仅保存在本地，不会上传到任何服务器。" },
      deepseek: { pre: "在 ", linkText: "DeepSeek Platform",    url: "https://platform.deepseek.com/api_keys",                  post: " 获取 API Key。", note: "Key 仅保存在本地，不会上传到任何服务器。" },
      openai:   { pre: "在 ", linkText: "OpenAI Platform",      url: "https://platform.openai.com/api-keys",                    post: " 获取 API Key。", note: "Key 仅保存在本地，不会上传到任何服务器。" },
      gemini:   { pre: "在 ", linkText: "Google AI Studio",     url: "https://aistudio.google.com/app/apikey",                  post: " 获取 API Key。", note: "Key 仅保存在本地，不会上传到任何服务器。" },
      grok:     { pre: "在 ", linkText: "xAI Console",          url: "https://console.x.ai/",                                   post: " 获取 API Key。", note: "Key 仅保存在本地，不会上传到任何服务器。" },
      glm:      { pre: "在 ", linkText: "智谱开放平台",           url: "https://open.bigmodel.cn/usercenter/apikeys",             post: " 获取 API Key。", note: "Key 仅保存在本地，不会上传到任何服务器。" },
      qwen:     { pre: "在 ", linkText: "阿里云百炼",             url: "https://bailian.console.aliyun.com/?apiKey=1#/api-key",  post: " 获取 API Key。", note: "Key 仅保存在本地，不会上传到任何服务器。" },
      moonshot: { pre: "在 ", linkText: "Moonshot 开放平台",      url: "https://platform.moonshot.cn/console/api-keys",          post: " 获取 API Key。", note: "Key 仅保存在本地，不会上传到任何服务器。" }
    },
    usageTitle: "// 使用方式",
    usageSteps: ["在网页选中一段文字", "右键 → 生成情感回复", "选择情绪风格，点击生成", "一键复制回复内容"],
    followText: "觉得好用？关注作者，获取更新动态 ♡"
  },
  en: {
    subtitle: "Configure your API connection",
    labelProvider: "API Provider",
    labelModel: "Model Name",
    labelKey: "API KEY",
    modelPlaceholder: (m) => `Leave blank for default: ${m}`,
    saveBtn: "Save Settings",
    errNoKey: "⚠️ Please enter your API Key",
    saved: "Saved successfully (´▽`ʃ♡ƪ)",
    hints: {
      claude:   { pre: "Get your API Key from ", linkText: "Anthropic Console",    url: "https://console.anthropic.com/account/keys",              post: ".", note: "Key is stored locally only, never uploaded to any server." },
      deepseek: { pre: "Get your API Key from ", linkText: "DeepSeek Platform",    url: "https://platform.deepseek.com/api_keys",                  post: ".", note: "Key is stored locally only, never uploaded to any server." },
      openai:   { pre: "Get your API Key from ", linkText: "OpenAI Platform",      url: "https://platform.openai.com/api-keys",                    post: ".", note: "Key is stored locally only, never uploaded to any server." },
      gemini:   { pre: "Get your API Key from ", linkText: "Google AI Studio",     url: "https://aistudio.google.com/app/apikey",                  post: ".", note: "Key is stored locally only, never uploaded to any server." },
      grok:     { pre: "Get your API Key from ", linkText: "xAI Console",          url: "https://console.x.ai/",                                   post: ".", note: "Key is stored locally only, never uploaded to any server." },
      glm:      { pre: "Get your API Key from ", linkText: "Zhipu AI Platform",    url: "https://open.bigmodel.cn/usercenter/apikeys",             post: ".", note: "Key is stored locally only, never uploaded to any server." },
      qwen:     { pre: "Get your API Key from ", linkText: "Alibaba Bailian",      url: "https://bailian.console.aliyun.com/?apiKey=1#/api-key",  post: ".", note: "Key is stored locally only, never uploaded to any server." },
      moonshot: { pre: "Get your API Key from ", linkText: "Moonshot Platform",    url: "https://platform.moonshot.cn/console/api-keys",          post: ".", note: "Key is stored locally only, never uploaded to any server." }
    },
    usageTitle: "// How to use",
    usageSteps: ["Select some text on any webpage", "Right-click → Generate Emotional Reply", "Choose an emotion style and click Generate", "Copy the reply with one click"],
    followText: "Enjoying it? Follow the author for updates ♡"
  }
};

const PROVIDER_DEFAULTS = {
  claude:    "claude-sonnet-4-6",
  deepseek:  "deepseek-chat",
  openai:    "gpt-4o-mini",
  gemini:    "gemini-2.0-flash",
  grok:      "grok-3-mini",
  glm:       "glm-4-flash",
  qwen:      "qwen-turbo",
  moonshot:  "moonshot-v1-8k"
};

let currentLang = "zh";

function applyOptionsLang(lang) {
  const t = OPTIONS_I18N[lang] || OPTIONS_I18N.zh;
  currentLang = lang;

  document.querySelector('.logo-text p').textContent = t.subtitle;
  document.querySelector('label[for="providerSelect"]').textContent = t.labelProvider;
  document.querySelector('label[for="modelInput"]').textContent = t.labelModel;
  document.querySelector('label[for="apiKeyInput"]').textContent = t.labelKey;
  saveBtn.textContent = t.saveBtn;

  const infoBox = document.querySelector('.info-box');
  infoBox.textContent = "";
  const titleEl = document.createElement("strong");
  titleEl.textContent = t.usageTitle;
  infoBox.appendChild(titleEl);
  t.usageSteps.forEach((step, i) => {
    infoBox.appendChild(document.createElement("br"));
    infoBox.appendChild(document.createTextNode(`${i + 1}. ${step}`));
  });

  document.querySelector('.follow-text').textContent = t.followText;
  updateProviderUI(providerSelect.value);
}

function updateProviderUI(provider) {
  const t = OPTIONS_I18N[currentLang] || OPTIONS_I18N.zh;
  const defaultModel = PROVIDER_DEFAULTS[provider] || "deepseek-chat";
  const placeholderMap = {
    claude:   "sk-ant-...",
    deepseek: "sk-...",
    openai:   "sk-...",
    gemini:   "AIza...",
    grok:     "xai-...",
    glm:      "...",
    qwen:     "sk-...",
    moonshot: "sk-..."
  };
  input.placeholder = placeholderMap[provider] || "sk-...";
  modelInput.placeholder = t.modelPlaceholder(defaultModel);

  const h = t.hints[provider] || t.hints.deepseek;
  hintText.textContent = "";
  hintText.appendChild(document.createTextNode(h.pre));
  const a = document.createElement("a");
  a.href = h.url;
  a.target = "_blank";
  a.textContent = h.linkText;
  hintText.appendChild(a);
  hintText.appendChild(document.createTextNode(h.post));
  hintText.appendChild(document.createElement("br"));
  hintText.appendChild(document.createTextNode(h.note));
}

chrome.storage.sync.get(["apiKey", "provider", "model", "uiLang", "theme"], ({ apiKey, provider = "deepseek", model, uiLang = "zh", theme = "dark" }) => {
  providerSelect.value = provider;
  if (apiKey) input.value = apiKey;
  if (model) modelInput.value = model;
  applyOptionsLang(uiLang);
  setActiveLang(uiLang);
  applyTheme(theme);
});

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('[data-theme-val]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.themeVal === theme);
  });
}

document.querySelectorAll('[data-theme-val]').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.themeVal;
    applyTheme(theme);
    chrome.storage.sync.set({ theme });
  });
});

function setActiveLang(lang) {
  document.querySelectorAll('.lang-toggle-btn[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.lang-toggle-btn[data-lang]').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    setActiveLang(lang);
    applyOptionsLang(lang);
    chrome.storage.sync.set({ uiLang: lang });
  });
});

providerSelect.addEventListener("change", () => {
  updateProviderUI(providerSelect.value);
  input.value = "";
});

toggleBtn.addEventListener("click", () => {
  const isPass = input.type === "password";
  input.type = isPass ? "text" : "password";
  toggleBtn.textContent = isPass ? "(>_<)" : "(o_o)";
});

saveBtn.addEventListener("click", () => {
  const t = OPTIONS_I18N[currentLang] || OPTIONS_I18N.zh;
  const key = input.value.trim();
  if (!key) {
    statusEl.textContent = t.errNoKey;
    statusEl.className = "status error";
    return;
  }
  chrome.storage.sync.set({
    apiKey: key,
    provider: providerSelect.value,
    model: modelInput.value.trim()
  }, () => {
    statusEl.textContent = t.saved;
    statusEl.className = "status success";
    setTimeout(() => { statusEl.textContent = ""; }, 3000);
  });
});

const scrollTimers = new WeakMap();

function markScrolling(target) {
  target.classList.add("is-scrolling");
  clearTimeout(scrollTimers.get(target));
  scrollTimers.set(target, setTimeout(() => target.classList.remove("is-scrolling"), 800));
}

window.addEventListener("scroll", () => {
  markScrolling(document.documentElement);
}, { passive: true });

document.addEventListener("scroll", (event) => {
  const target = event.target === document ? document.documentElement : event.target;
  if (target && target.classList) {
    markScrolling(target);
  }
}, { passive: true, capture: true });
