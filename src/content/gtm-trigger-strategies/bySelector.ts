import {isClickable} from "../utils/isClickable.js";
import {ClickProposal} from "../gtm-proposals/ClickProposal.js";
import {VisibilityProposal} from "../gtm-proposals/VisibilityProposal.js";
import {ClickLinkProposal} from "../gtm-proposals/ClickLinkProposal.js";
import {FormProposal} from "../gtm-proposals/FormProposal.js";
import {getUniqSelector} from "../utils/getUniqSelector.js";


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