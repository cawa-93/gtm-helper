<script lang="ts" setup>
import {useProposals} from "../composables/useProposals.js";
import ProposalDetails from "./ProposalDetails.vue";
import {computed} from "vue";
import {VisibilityProposal} from "../gtm-proposals/VisibilityProposal.js";
import {FormProposal} from "../gtm-proposals/FormProposal.js";
import {getMessage} from "vite-plugin-vue-chrome-i18n/getMessage.js";

const props = defineProps<{
  element: HTMLElement
}>()

const proposals = useProposals(() => props.element)

type Definition = { title: string, value: string }

const proposalsDefinitions = computed(() => proposals.value.map((proposal): Definition[] => {
  switch (proposal.constructor) {
    case VisibilityProposal :
      return [
        {title: getMessage('selection_method'), value: getMessage('css_selector')},
        {title: getMessage('element_selector'), value: proposal.selectorValue},
      ]
    case FormProposal :
      return [
        {title: `Form Elements > ${getMessage('match_css_selector')}`, value: proposal.selectorValue}
      ]
    default :
      return [
        {title: `Click Elements > ${getMessage('match_css_selector')}`, value: proposal.selectorValue}
      ]
  }
}))
</script>

<template>
  <section>
    <template v-if="proposals.length > 0">
      <ProposalDetails
          v-for="(proposal, index) of proposals"
          :key="index"
          :definitions="proposalsDefinitions[index]"
          :proposal="proposal"/>
    </template>
    <div v-else>
      {{ getMessage('no_proposals') }}
    </div>
  </section>
</template>


<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="uk">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "no_proposals": {
    "message": "На жаль, для вибраного елементу не вдалось знайти жодних пропозицій"
  },
  "match_css_selector": {
    "message": "відповідає вибору CSS"
  },
  "selection_method": {
    "message": "Спосіб вибору",
    "description": "Тексти з налаштувань тригера «Видимість елемента»"
  },
  "css_selector": {
    "message": "Селектор CSS",
    "description": "Тексти з налаштувань тригера «Видимість елемента»"
  },
  "element_selector": {
    "message": "Засіб вибору елементів",
    "description": "Тексти з налаштувань тригера «Видимість елемента»"
  }
}
</chrome-i18n>


<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="en">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "no_proposals": {
    "message": "Unfortunately, no proposals could be found for the selected element"
  },
  "match_css_selector": {
    "message": "matches CSS selector"
  },
  "selection_method": {
    "message": "Selection Method",
    "description": "Texts from the «Element visibility» trigger settings"
  },
  "css_selector": {
    "message": "CSS Selector",
    "description": "Texts from the «Element visibility» trigger settings"
  },
  "element_selector": {
    "message": "Element Selector ",
    "description": "Texts from the «Element visibility» trigger settings"
  }
}
</chrome-i18n>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>