<script lang="ts" setup>
import {ClickProposal} from "../gtm-proposals/ClickProposal.js";
import ProposalDetails from "./ProposalDetails.vue";
import {getMessage} from 'vite-plugin-vue-chrome-i18n/getMessage.js'
import {IconMouse} from "@iconify-prerendered/vue-mdi";

defineProps<{
  proposal: ClickProposal
}>()
</script>

<template>
  <ProposalDetails :icon="{color: 'oklch(0.734 0.145 234.615)', component: IconMouse}" :label="getMessage('label')">
    <div class="grid-container">
      <div class="bordered">Click Element</div>
      <div class="bordered">{{ getMessage('match_css_selector') }}</div>
      <input :value="proposal.selectorValue" class="bordered" readonly type="text">
    </div>
  </ProposalDetails>
</template>


<chrome-i18n locale="uk">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "label": {
    "message": "Клік: усі елементи"
  },
  "match_css_selector": {
    "message": "відповідає вибору CSS"
  }
}
</chrome-i18n>


<chrome-i18n locale="en">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "label": {
    "message": "Click: All Elements"
  },
  "match_css_selector": {
    "message": "matches CSS selector"
  }
}
</chrome-i18n>


<style scoped>

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.bordered {
  height: 40px;
  border: solid 1px oklch(0.894 0.006 264.53);
  border-radius: 4px;
  padding-left: 12px;
  padding-right: 12px;
  line-height: 38px;
  width: 100%;
  font-size: 15px;
}

input {
  grid-column-start: 1;
  grid-column-end: -1;
}
</style>