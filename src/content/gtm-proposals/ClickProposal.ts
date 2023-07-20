import {Proposal} from "./Proposal.js";
import {SelectorType} from "../gtm-trigger-strategies/contracts.js";

export class ClickProposal extends Proposal {
    constructor(selectorType: SelectorType, selectorValue: string) {
        super('click', selectorType, selectorValue);
    }
}