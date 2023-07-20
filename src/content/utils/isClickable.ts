export function isClickable(element: HTMLElement): boolean {
    // console.log(`!element || element.ariaDisabled === 'true' || element.hidden || element.ariaHidden === 'true'`, !element || element.ariaDisabled === 'true' || element.hidden || element.ariaHidden === 'true')
    if (!element || element.ariaDisabled === 'true' || element.hidden || element.ariaHidden === 'true') {
        return false
    }

    // console.log(`element.onclick || element.role === 'button'`, element.onclick || element.role === 'button')
    if (element.onclick || element.role === 'button') {
        return true
    }

    // console.log(`element instanceof HTMLAnchorElement || element instanceof HTMLAreaElement`, element instanceof HTMLAnchorElement || element instanceof HTMLAreaElement)
    if (element instanceof HTMLAnchorElement || element instanceof HTMLAreaElement) {
        return !!element.href
    }

    // console.log(`element instanceof HTMLButtonElement || element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement`, element instanceof HTMLButtonElement || element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement)
    if (element instanceof HTMLButtonElement || element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
        return !element.disabled
    }


    // console.log(`element instanceof HTMLIFrameElement || element instanceof HTMLObjectElement`, element instanceof HTMLIFrameElement || element instanceof HTMLObjectElement)
    if (element instanceof HTMLIFrameElement || element instanceof HTMLObjectElement) {
        return true
    }

    if (element instanceof HTMLLabelElement) {
        return element.hasAttribute('for') || !!element.querySelector('input, textarea, select')
    }

    return element.tabIndex >= 0
}