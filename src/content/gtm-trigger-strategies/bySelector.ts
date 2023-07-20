import {isClickable} from "../utils/isClickable.js";
import {ClickProposal} from "../gtm-proposals/ClickProposal.js";
import {VisibilityProposal} from "../gtm-proposals/VisibilityProposal.js";
import {ClickLinkProposal} from "../gtm-proposals/ClickLinkProposal.js";
import {FormProposal} from "../gtm-proposals/FormProposal.js";


function getClassList(element: HTMLElement) {
    return [...element.classList].map(c => '.' + c).join('')
}

function getSelectorByAttributes(element: HTMLElement) {
    return Array.from(element.attributes).map(a => ['id', 'class', 'style', 'data-original-outline'].includes(a.name) ? '' : `[${a.name}${a.value ? `="${a.value}"` : ''}]`).join('')
}

function getSelectorByNthChild(element: HTMLElement) {
    const childList = element.parentElement?.children || [element]
    for (const childIndex in childList) {
        if (childList[childIndex] === element) {
            return `:nth-child(${parseInt(childIndex, 10) + 1})`
        }
    }

    return ''
}

function* getSelector(element: HTMLElement, requireTagName = false) {
    if (element.id) {
        return `#${element.id}`
    }

    let selector = ''

    for (const fn of [getClassList, getSelectorByAttributes, getSelectorByNthChild]) {
        selector += fn(element)
        if (!requireTagName && selector) {
            yield selector
        }
        yield element.tagName.toLowerCase() + selector
    }

    return selector
}

function mergeSelectors(selectors: string[]) {
    return selectors.filter(s => !!s.trim()).join(' > ')
}


function getUniqSelector(element: HTMLElement, {maxElementsOnPage = 1, requireTagName = false} = {}): string {
    let childSelector = '';
    let elementInIteration = element

    while (true) {
        let elementSelector = '';

        for (const s of getSelector(elementInIteration, requireTagName && !childSelector)) {
            elementSelector = s
            const selector = mergeSelectors([elementSelector, childSelector])

            if (document.body.querySelectorAll(selector).length <= maxElementsOnPage) {
                return selector
            }
        }

        childSelector = mergeSelectors([elementSelector, childSelector])

        if (!element.parentElement) {
            return childSelector
        }

        elementInIteration = element.parentElement
    }

    // let elementInIteration = element
    // let selector = ''
    // while (document.body.querySelectorAll(selector).length > maxElementsOnPage && elementInIteration.parentElement) {
    //     // selector = getSelector(elementInIteration.parentElement) + ' > ' + selector
    //     for (const s of getSelector(elementInIteration)) {
    //         if (document.body.querySelectorAll(s + ' > ' + selector).length <= maxElementsOnPage) {
    //             return s + ' > ' + selector
    //         }
    //     }
    //     selector = ''
    //     elementInIteration = elementInIteration.parentElement
    // }
    //
    // return selector
}


export function getClickProposals(element: HTMLElement): ClickProposal[] {
    console.log({isClickable: isClickable(element)})
    if (!isClickable(element)) {
        return []
    }

    const resolvedElementSelector = getUniqSelector(element)

    const resolvedElementSelectorWithChildren = `${resolvedElementSelector}, ${resolvedElementSelector} *`

    return [new ClickProposal('cssSelector', resolvedElementSelectorWithChildren)]
}

export function getClickLinkProposals(element: HTMLElement): ClickLinkProposal[] {
    if (!isClickable(element) || !(element instanceof HTMLAnchorElement)) {
        return []
    }

    const resolvedElementSelector = getUniqSelector(element, {requireTagName: true})

    return [new ClickLinkProposal(resolvedElementSelector)]
}


export function getFormProposals(element: HTMLElement): FormProposal[] {
    if (!(element instanceof HTMLFormElement)) {
        return []
    }

    const resolvedElementSelector = getUniqSelector(element, {requireTagName: true})

    return [new FormProposal(resolvedElementSelector)]
}

export function getVisibleProposals(element: HTMLElement): VisibilityProposal[] {
    const resolvedElementSelector = getUniqSelector(element)
    return [new VisibilityProposal(resolvedElementSelector)]
}