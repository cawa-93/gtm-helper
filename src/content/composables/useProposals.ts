import {computed, MaybeRefOrGetter, toValue} from "vue";
import {Proposal} from "../gtm-proposals/Proposal.js";
import {
    getClickLinkProposals,
    getClickProposals,
    getFormProposals,
    getVisibleProposals
} from "../gtm-trigger-strategies/bySelector.js";

const strategies: ((element: HTMLElement) => Proposal[])[] = [
    getFormProposals,
    getClickLinkProposals,
    getClickProposals,
    getVisibleProposals,
];

export function useProposals(element: MaybeRefOrGetter<HTMLElement>) {
    return computed(() => {
        return strategies.flatMap(s => s(toValue(element)));
    })
}