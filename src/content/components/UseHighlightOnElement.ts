import {tryOnScopeDispose} from "@vueuse/core";
import {toValue, watch, type WatchSource} from "vue";

function addHighlight(el: HTMLElement | null | undefined) {
    if (!el) {
        return
    }
    el.dataset.originalOutline = el.style.outline || '';
    el.style.outline = 'highlight solid 4px';
}

export function clearHighlight(el: HTMLElement | null | undefined) {
    if (!el) {
        return
    }
    el.style.outline = el.dataset.originalOutline || '';
}

export function useHighlightOnElement(element: WatchSource<HTMLElement | undefined | null>) {
    tryOnScopeDispose(() => clearHighlight(toValue(element)))
    return watch(element, (el, prevEl) => {
        if (prevEl) {
            clearHighlight(prevEl)
        }

        addHighlight(el)
    })
}