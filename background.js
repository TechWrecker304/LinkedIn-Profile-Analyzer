chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.url.match(/https:\/\/www\.linkedin\.com\/in\/.+/)) {
    chrome.tabs.executeScript(details.tabId, {
      file: 'content.js',
    });
  }
});
