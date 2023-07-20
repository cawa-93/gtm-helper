import {Proposal} from "./Proposal.js";

export class ClickLinkProposal extends Proposal {
    constructor(public selectorValue: string) {
        super('click-link', 'cssSelector', selectorValue);
    }
}