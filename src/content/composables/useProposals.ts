import {computed, MaybeRef, toValue} from "vue";
import {Proposal} from "../gtm-proposals/Proposal.js";
import {
    getClickProposals,
    getClickLinkProposals,
    getFormProposals,
    getVisibleProposals
} from "../gtm-trigger-strategies/bySelector.js";

const strategies: ((element: HTMLElement) => Proposal[])[] = [
    getFormProposals,
    getClickLinkProposals,
    getClickProposals,
    getVisibleProposals,
];

export function useProposals(element: MaybeRef<HTMLElement>) {
    return computed(() => strategies.flatMap(s => s(toValue(element))))
}