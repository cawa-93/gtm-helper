interface Strategy {
    getProposals(element: HTMLElement): Proposal[]
}

export type TriggerType = 'click' | 'click-link' | 'visibility' | 'form' | 'video'

export type SelectorType = 'cssSelector' | 'id'

export type Proposal = {
    triggerType: TriggerType,
    selectorType: SelectorType,
    selectorValue: string
}