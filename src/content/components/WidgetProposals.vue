<script lang="ts" setup>
import {useProposals} from "../composables/useProposals.js";
import {getMessage} from "vite-plugin-vue-chrome-i18n/getMessage.js";
import ProposalDetailsClick from "./ProposalDetailsClick.vue";
import ProposalDetailsClickLink from "./ProposalDetailsClickLink.vue";
import ProposalDetailsVisibility from "./ProposalDetailsVisibility.vue";
import ProposalDetailsForm from "./ProposalDetailsForm.vue";
import {Proposal} from "../gtm-proposals/Proposal.js";

const props = defineProps<{
  element: HTMLElement
}>()

const proposals = useProposals(() => props.element)

function getDetailsComponentForProposal(proposal: Proposal['triggerType']) {
  switch (proposal) {
    case "click":
      return ProposalDetailsClick
    case "click-link":
      return ProposalDetailsClickLink
    case "visibility":
      return ProposalDetailsVisibility
    case "form":
      return ProposalDetailsForm
  }

  throw new Error(`DetailsComponent for ${proposal} proposal not implemented`)
}
</script>

<template>
  <section>
    <template v-if="proposals.length > 0">
      <component :is="getDetailsComponentForProposal(proposal.triggerType)" v-for="proposal of proposals"
                 :key="proposal.triggerType" :proposal="proposal"></component>
    </template>
    <div v-else>
      {{ getMessage('no_proposals') }}
    </div>
  </section>
</template>


<chrome-i18n locale="uk">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "no_proposals": {
    "message": "На жаль, для вибраного елементу не вдалось знайти жодних пропозицій"
  }
}
</chrome-i18n>


<chrome-i18n locale="en">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "no_proposals": {
    "message": "Unfortunately, no proposals could be found for the selected element"
  }
}
</chrome-i18n>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>