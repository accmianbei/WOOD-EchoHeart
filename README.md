<div align="center">

**[中文](#-木头--wood-echoheart)** | **[English](#-wood--wood-echoheart-1)**

</div>

---

# 木头 — WOOD-EchoHeart

> 选中网页文字，右键一键生成有温度的 AI 回复。

Chrome 扩展（Manifest V3），支持 8 种主流 AI 提供商，中英双语界面。

---

## 功能特性

- **右键触发**：选中任意网页文字 → 右键 → 生成情感回复
- **10 种情绪风格**：温暖 / 共情 / 鼓励 / 幽默 / 专业 / 关怀 / 感谢 / 道歉 / 愤怒 / 反串
- **5 种人格角色**：贴心朋友 / 智慧导师 / 职场同事 / 心理咨询师 / 温暖家人
- **自由调节**：回复长度（短/中/长）、语气强度（温和↔热烈）、回复语言（中/英）
- **自定义 Prompt**：完整编辑提示词，用 `{{原文}}` / `{{text}}` 引用选中文字
- **一键复制**：生成后直接复制到剪贴板
- **可拖拽面板**：浮层显示在鼠标附近，可拖动
- **RSS 推文创作工具**：读取 RSS 热点，按关键词和 LLM 排序，从 Top 10 事件池抽卡生成推文草稿
- **深色/浅色主题**，中英双语 UI

---

## 支持的 AI 提供商

| 提供商 | 默认模型 |
|--------|----------|
| DeepSeek | deepseek-chat |
| Claude (Anthropic) | claude-sonnet-4-6 |
| OpenAI | gpt-4o-mini |
| Gemini (Google) | gemini-2.0-flash |
| Grok (xAI) | grok-3-mini |
| GLM (智谱) | glm-4-flash |
| Qwen (通义千问) | qwen-turbo |
| Moonshot (Kimi) | moonshot-v1-8k |

---

## 安装方法

1. 下载或克隆本仓库
2. 打开 Chrome，进入 `chrome://extensions`
3. 开启右上角「开发者模式」
4. 点击「加载已解压的扩展程序」，选择本项目文件夹
5. 点击扩展图标（工具栏的木头图标）→ 配置 API Key

---

## 使用方法

1. 在任意网页选中一段文字
2. 右键菜单 → **生成情感回复**
3. 在弹出面板中选择情绪风格
4. 点击「生成回复」
5. 点击「复制」，粘贴即用

---

## 推特段子生成器

设置页内置了一个独立的「推特段子生成器」页面，可以基于 RSS 热点快速生成推文草稿。

### 使用说明

1. 打开扩展设置页，进入 **推特段子生成器**
2. 选择预设 RSS 源，或手动添加自己的 RSS 链接
3. 点击 **读取所有源**，系统会抓取 RSS 条目并建立事件池
4. 关键词权重会先参与事件打分，再交给 LLM 做二次排序
5. 生成时会从排序后的 **Top 10 事件池** 中随机抽取 1 条事件
6. 点击 **开始抽卡** 生成推文，点击 **再抽一次** 可以重新抽取

### 生成规则

- 抽卡对象不是全部 RSS 条目随机，而是排序后的 **Top 10 事件池**
- 预览图来自当前抽中事件对应 RSS 条目的图片字段，不是另外随机抽图
- 图片优先从 `media:content`、`media:thumbnail`、`enclosure[type^='image']` 提取
- 如果 RSS 没有标准图片字段，会继续尝试从 `description` / `content` 中的 `<img>` 提取
- 正文分段优先由模型决定：短推文允许单段，中长推文优先 2-3 段
- 前端只做轻量整理：会把正文和最后一行 `#tag` 分开；只有正文明显偏长且句子足够多时，才会兜底补一个自然分段

### 使用建议

- 想围绕特定人物、公司或议题写推文时，先给对应关键词更高权重
- 想提高图片命中率时，优先选择本身带媒体字段的 RSS 源
- 如果你手动修改了提示词草稿，生成时会优先使用你改过的内容

---

## 文件结构

```
├── manifest.json      # 扩展配置（MV3）
├── background.js      # Service Worker：注册右键菜单，传递选中文字
├── content.js         # Content Script：在页面中注入可拖拽浮层面板
├── panel.html/js/css  # 主面板 UI：情绪选择、高级选项、生成回复
├── options.html/js    # 设置页：API Key、提供商、模型、语言、主题
├── tweet-generator.*  # 推特段子生成器：RSS 事件池、Top 10 抽卡、图片预览、推文生成
└── icons/             # 扩展图标
```

---

## 隐私说明

- API Key 仅保存在浏览器本地（`chrome.storage.sync`），不会上传到任何服务器
- 选中的文字通过 `chrome.storage.session` 在本地传递，不经过第三方
- API 请求直接从浏览器发送至各 AI 服务商

---

## 关注作者

觉得好用？欢迎关注获取更新 ♡

**𝕏 [@acc_mianbei](https://x.com/acc_mianbei)**

---
---

# 🪵 Wood — WOOD-EchoHeart

> Select text on any webpage, right-click, and generate a warm AI reply in one step.

A Chrome Extension (Manifest V3) supporting 8 major AI providers with a bilingual (EN/CN) interface.

---

## Features

- **Right-click trigger**: Select any text on a webpage → Right-click → Generate emotional reply
- **10 emotion styles**: Warm / Empathetic / Encouraging / Humorous / Professional / Caring / Grateful / Apologetic / Angry / Ironic Roleplay
- **5 personality roles**: Caring Friend / Wise Mentor / Colleague / Therapist / Warm Family Member
- **Fine-grained control**: Reply length (Short/Medium/Long), tone intensity (Gentle ↔ Passionate), reply language (CN/EN)
- **Custom Prompt**: Edit the full prompt template; reference selected text with `{{原文}}` / `{{text}}`
- **One-click copy**: Copy the generated reply directly to clipboard
- **Draggable panel**: Floating overlay near the cursor, repositionable
- **RSS tweet drafting tool**: Load live RSS events, rank them with keyword weights plus LLM scoring, and draw from the Top 10 pool for tweet drafts
- **Dark/Light theme** with bilingual UI

---

## Supported AI Providers

| Provider | Default Model |
|----------|---------------|
| DeepSeek | deepseek-chat |
| Claude (Anthropic) | claude-sonnet-4-6 |
| OpenAI | gpt-4o-mini |
| Gemini (Google) | gemini-2.0-flash |
| Grok (xAI) | grok-3-mini |
| GLM (Zhipu) | glm-4-flash |
| Qwen (Alibaba) | qwen-turbo |
| Moonshot (Kimi) | moonshot-v1-8k |

---

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the project folder
5. Click the extension icon in the toolbar → Configure your API Key in settings

---

## How to Use

1. Select any text on a webpage
2. Right-click → **Generate Emotional Reply**
3. Choose an emotion style in the popup panel
4. Click **Generate Reply**
5. Click **Copy** and paste wherever you need it

---

## Tweet Bit Generator

The settings page also includes a dedicated Tweet Bit Generator that turns RSS-driven events into tweet drafts.

### Usage

1. Open the extension settings page and enter **Tweet Bit Generator**
2. Choose a preset RSS source or add your own feed URL
3. Click **Load All Sources** to build an event pool from live RSS items
4. Keyword weights score events first, then the LLM ranks the candidates again
5. Each generation randomly draws 1 event from the ranked **Top 10 event pool**
6. Click **Start Draw** to generate a draft, or **Roll Again** to redraw

### Generation Rules

- The draw is not random across all RSS items; it draws from the ranked **Top 10 pool**
- The preview image comes from the RSS item tied to the currently drawn event rather than a separate random pick
- Image extraction prefers `media:content`, `media:thumbnail`, and `enclosure[type^='image']`
- If the feed does not expose a standard image field, the generator falls back to parsing `<img>` from `description` / `content`
- Paragraphing is primarily decided by the model: short posts can stay in one paragraph, while medium and long posts usually use 2-3 paragraphs
- The frontend only applies light cleanup: it separates the body from the final `#hashtags`, and only adds a fallback paragraph break when the body is clearly long enough

---

## File Structure

```
├── manifest.json      # Extension config (MV3)
├── background.js      # Service Worker: registers context menu, passes selected text
├── content.js         # Content Script: injects draggable floating panel into pages
├── panel.html/js/css  # Main panel UI: emotion picker, advanced options, reply output
├── options.html/js    # Settings page: API Key, provider, model, language, theme
├── tweet-generator.*  # Tweet Bit Generator: RSS event pool, Top 10 draw, image preview, tweet generation
└── icons/             # Extension icons
```

---

## Privacy

- Your API Key is stored locally in the browser only (`chrome.storage.sync`) and is never sent to any external server
- Selected text is passed locally via `chrome.storage.session` without involving any third party
- API requests are sent directly from your browser to the respective AI provider

---

## Follow the Author

Find it useful? Follow for updates ♡

**𝕏 [@acc_mianbei](https://x.com/acc_mianbei)**
