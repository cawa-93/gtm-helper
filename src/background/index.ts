// const chrome = globalThis.browser || globalThis.chrome;


/**
 * Перевіряє чи на сторінці вже зареєстровано елемент <gtm-helper>
 * Функція може повертати виключно примітивні значення. Інакше результат може не передатись між контекстами назад в serviceWorker.js
 */
function isInit(): boolean {
    try {
        return !!customElements?.get('gtm-helper')
    } catch (_) {
        return false
    }
}

function startIfNotStarted() {
    console.log('startIfNotStarted', document.documentElement.querySelector('gtm-helper'))
    if (document.documentElement.querySelector('gtm-helper')) {
        return
    }
    
    document.documentElement.style.position = 'relative'
    document.documentElement.appendChild(new (customElements.get('gtm-helper')!)())
}

chrome.action.onClicked.addListener(async (tab) => {

    console.log('CLICKED', tab?.id)

    if (!tab.id) {
        return
    }

    const result = await chrome.scripting.executeScript({target: {tabId: tab.id}, func: isInit})

    console.log({
        isInit: result[0].result
    })

    if (!result[0].result) {
        await chrome.scripting.executeScript({
            target: {tabId: tab.id}, files: ["./src/content/main.js"]
        })
    }

    await chrome.scripting.executeScript({target: {tabId: tab.id}, func: startIfNotStarted})

});