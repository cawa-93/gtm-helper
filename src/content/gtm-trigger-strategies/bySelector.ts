import {Proposal} from "../Proposal.js";
import {TriggerType} from "./contracts.js";

export function bySelector(element: HTMLElement): Proposal[] {

    const triggerType: TriggerType = element.tagName === 'FORM' ? 'formSubmit' : element.tagName === 'A' ? 'linkClick' : 'click'

    const selectorValue = element.id ? `${element.id}` : [...element.classList].map(c => '.' + c).join('')


    return [new Proposal(triggerType, 'cssSelector', selectorValue)]
}