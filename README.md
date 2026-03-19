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

## 文件结构

```
├── manifest.json      # 扩展配置（MV3）
├── background.js      # Service Worker：注册右键菜单，传递选中文字
├── content.js         # Content Script：在页面中注入可拖拽浮层面板
├── panel.html/js/css  # 主面板 UI：情绪选择、高级选项、生成回复
├── options.html/js    # 设置页：API Key、提供商、模型、语言、主题
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

## File Structure

```
├── manifest.json      # Extension config (MV3)
├── background.js      # Service Worker: registers context menu, passes selected text
├── content.js         # Content Script: injects draggable floating panel into pages
├── panel.html/js/css  # Main panel UI: emotion picker, advanced options, reply output
├── options.html/js    # Settings page: API Key, provider, model, language, theme
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
