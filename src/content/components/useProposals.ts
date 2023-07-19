import {computed, MaybeRef, toValue} from "vue";
import {Proposal} from "../Proposal.js";
import {bySelector} from "../gtm-trigger-strategies/bySelector.js";

const strategies: ((element: HTMLElement) => Proposal[])[] = [
    bySelector
];

export function useProposals(element: MaybeRef<HTMLElement>) {
    return computed(() => strategies.flatMap(s => s(toValue(element))))
}