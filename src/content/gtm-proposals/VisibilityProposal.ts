import {Proposal} from "./Proposal.js";

export class VisibilityProposal extends Proposal {
    constructor(public selectorValue: string) {
        super('visibility', 'cssSelector', selectorValue);
    }
}