const chrome = globalThis.browser || globalThis.chrome;


/**
 *
 * @returns {boolean} Функція може повертати виключно примітивні значення. Інакше результат може не передатись між контекстами назад в serviceWorker.js
 */
function isInit() {
    try {
        return !!customElements?.get('gtm-helper')
    } catch (_) {
        return false
    }
}

function startIfNotStarted() {
    if (document.documentElement.querySelector('gtm-helper')) {
        return
    }

    document.documentElement.style.position = 'relative'
    document.documentElement.appendChild(new (customElements.get('gtm-helper'))())
}

chrome.action.onClicked.addListener(async (tab) => {

    const result = await chrome.scripting.executeScript({target: {tabId: tab.id}, func: isInit})

    if (!result[0].result) {
        await chrome.scripting.executeScript({
            target: {tabId: tab.id}, files: ["./src/content/main.js"]
        })
    }

    await chrome.scripting.executeScript({target: {tabId: tab.id}, func: startIfNotStarted})

});