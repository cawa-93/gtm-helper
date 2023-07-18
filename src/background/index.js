const chrome =  globalThis.browser || globalThis.chrome;
console.log('IN BG')
chrome.action.onClicked.addListener((tab) => {
    console.log('onClicked', tab, chrome.scripting.executeScript)
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["./src/content/main.js"]
    }, () => {
        console.log(chrome.runtime.lastError)
    })
});