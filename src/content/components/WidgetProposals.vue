<script lang="ts" setup>
import {useProposals} from "../composables/useProposals.js";
import ProposalDetails from "./ProposalDetails.vue";
import {computed} from "vue";
import {VisibilityProposal} from "../gtm-proposals/VisibilityProposal.js";
import {IconEye, IconLink, IconMouse, IconPlaylistCheck} from "@iconify-prerendered/vue-mdi";
import {ClickLinkProposal} from "../gtm-proposals/ClickLinkProposal.js";
import {ClickProposal} from "../gtm-proposals/ClickProposal.js";
import {FormProposal} from "../gtm-proposals/FormProposal.js";

const props = defineProps<{
  element: HTMLElement
}>()

const proposals = useProposals(props.element)

type Definition = { title: string, value: string }

const proposalsDefinitions = computed(() => proposals.value.map((proposal): Definition[] => {
  switch (proposal.constructor) {
    case VisibilityProposal :
      return [
        {title: 'Selection Method', value: 'CSS Selector'},
        {title: 'Element Selector ', value: proposal.selectorValue},
      ]
    case FormProposal :
      return [
        {title: 'Form Elements > Match CSS Selector', value: proposal.selectorValue}
      ]
    default :
      return [
        {title: 'Click Elements > Match CSS Selector', value: proposal.selectorValue}
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
      Нажаль, для вибраного елементу не вдалось знайти жодних пропозицій
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>