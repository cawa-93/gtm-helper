import {SelectorType, TriggerType} from "../gtm-trigger-strategies/contracts.js";

export class Proposal {
    constructor(public triggerType: TriggerType, public selectorType: SelectorType, public selectorValue: string) {
    }
}