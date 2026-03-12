const MENU_TITLES = {
  zh: "生成情感回复",
  en: "Generate Emotional Reply"
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "ai-emotional-reply",
    title: MENU_TITLES.zh,
    contexts: ["selection"]
  });
  chrome.storage.sync.get("uiLang", ({ uiLang = "zh" }) => {
    if (uiLang && uiLang !== "zh") {
      chrome.contextMenus.update("ai-emotional-reply", {
        title: MENU_TITLES[uiLang] || MENU_TITLES.zh
      });
    }
  });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.uiLang) {
    const lang = changes.uiLang.newValue;
    chrome.contextMenus.update("ai-emotional-reply", {
      title: MENU_TITLES[lang] || MENU_TITLES.zh
    });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "ai-emotional-reply") {
    const selectedText = info.selectionText;
    chrome.storage.session.set({ selectedText }, () => {
      chrome.tabs.sendMessage(tab.id, { action: "showPanel" }, () => {
        if (chrome.runtime.lastError) {
          // Content script not yet injected (e.g. tab existed before extension reload)
          chrome.scripting.executeScript(
            { target: { tabId: tab.id }, files: ["content.js"] },
            () => {
              if (!chrome.runtime.lastError) {
                chrome.tabs.sendMessage(tab.id, { action: "showPanel" });
              }
            }
          );
        }
      });
    });
  }
});
