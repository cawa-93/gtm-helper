import {getAllCombinations} from "./getAllCombinations.js";


function getSelectorByNthChild(element: HTMLElement) {
    const childList = element.parentElement?.children || [element]
    for (const childIndex in childList) {
        if (childList[childIndex] === element) {
            return `:nth-child(${parseInt(childIndex, 10) + 1})`
        }
    }

    return ''
}


function filterBlockedAttributes(attr: Attr) {
    return !['id', 'class', 'style'].includes(attr.name) && !['data-', 'aria-', 'on'].some(s => attr.name.startsWith(s))
}

function getElementSelectorParts(element: HTMLElement) {
    return {
        id: element.id,
        classes: Array.from(element.classList),
        attributes: Array.from(element.attributes)
            .filter(filterBlockedAttributes)
            .map((attr) => `[${attr.name}${attr.value ? `="${attr.value.replaceAll('"', '\\\\\\"')}"` : ''}]`),
        nthChild: getSelectorByNthChild(element) || ''
    }
}

function mergeClasses(classes: string[]): string {
    return classes.map(c => c.trim() ? `.${c}` : '').join('')
}

function mergeAttributes(attrs: string[]): string {
    return attrs.join('')
}

function isEnoughUniq(selector: string, maxElementsOnPage = 1) {
    return document.body.querySelectorAll(selector).length <= maxElementsOnPage
}

function getTagName(element: HTMLElement): string {
    return element.tagName.toLowerCase()
}

function getShortestElementSelector(element: HTMLElement, childSelector = '', maxElementsOnPage = 1) {
    const {id, classes, attributes, nthChild} = getElementSelectorParts(element)
    if (id) {
        return `#${id} ${childSelector}`
    }

    const nthChildIfNeeded = element.parentElement?.childElementCount > 1 ? nthChild : ''


    const fullSelector = getTagName(element) + mergeClasses(classes) + mergeAttributes(attributes) + nthChildIfNeeded + ` ${childSelector}`
    if (!isEnoughUniq(fullSelector, maxElementsOnPage)) {
        return fullSelector
    }


    for (const tagNameVariant of ['', getTagName(element)]) {
        for (const childPseudoSelectorVariant of [...new Set(['', nthChildIfNeeded])]) {
            for (const attributesCombination of attributes.length ? [[''], ...getAllCombinations([...new Set(attributes)])] : [['']]) {
                for (const classesCombination of classes.length ? [[''], ...getAllCombinations([...new Set(classes)])] : [['']]) {
                    const selector = tagNameVariant + mergeClasses(classesCombination) + mergeAttributes(attributesCombination) + childPseudoSelectorVariant + ` ${childSelector}`
                    if (!selector.trim() || selector.trim().startsWith('>')) {
                        continue
                    }
                    if (isEnoughUniq(selector, maxElementsOnPage)) {
                        return selector
                    }
                }
            }
        }
    }

    throw new Error(`Не вдалось порахувати мінімальну довжину для унікального селектора ${fullSelector}`)
}

export function getUniqSelector(element: HTMLElement, {maxElementsOnPage = 1, requireTagName = false} = {}): string {
    let selector = ''
    let elementToWork = element
    do {
        selector = getShortestElementSelector(elementToWork, selector ? `> ${selector}` : '', maxElementsOnPage);
        // console.log({selector, isEnoughUniq: isEnoughUniq(selector, maxElementsOnPage)})
        elementToWork = elementToWork.parentElement
    } while (!isEnoughUniq(selector, maxElementsOnPage) && elementToWork)

    if (requireTagName) {
        selector = selector.replace(/(>\s*)(?=[.:#\[][^>]*$)/, getTagName(element))
    }

    return selector
}