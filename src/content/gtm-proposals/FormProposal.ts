import {Proposal} from "./Proposal.js";

export class FormProposal extends Proposal {
    constructor(selectorValue: string) {
        super('form', 'cssSelector', selectorValue);
    }
}