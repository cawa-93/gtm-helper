interface Strategy {
    getProposals(element: HTMLElement): Proposal[]
}

export type TriggerType = 'formSubmit' | 'linkClick' | 'click'

export type SelectorType = 'cssSelector'

export type Proposal = {
    triggerType: TriggerType,
    selectorType: SelectorType,
    selectorValue: string
}