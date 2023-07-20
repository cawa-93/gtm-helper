import {Proposal} from "./Proposal.js";

export class VideoProposal extends Proposal {
    constructor(public selectorValue: string) {
        super('video', 'cssSelector', selectorValue);
    }
}