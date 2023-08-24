<script lang="ts" setup>
import {ClickLinkProposal} from "../gtm-proposals/ClickLinkProposal.js";
import {VisibilityProposal} from "../gtm-proposals/VisibilityProposal.js";
import {FormProposal} from "../gtm-proposals/FormProposal.js";
import {ClickProposal} from "../gtm-proposals/ClickProposal.js";
import ProposalDetails from "./ProposalDetails.vue";
import {getMessage} from 'vite-plugin-vue-chrome-i18n/getMessage.js'
import {IconEye, IconMouse} from "@iconify-prerendered/vue-mdi";

defineProps<{
  proposal: ClickProposal
}>()
</script>

<template>
  <ProposalDetails :icon="{color: 'oklch(0.754 0.163 130.502)', component: IconEye}" :label="getMessage('label')">

    <div class="details-container">
      <small>{{ getMessage('selection_method') }}</small>
      <span class="bordered">{{ getMessage('css_selector') }}</span>
      <small>{{ getMessage('element_selector') }}</small>
      <input :value="proposal.selectorValue" class="bordered" readonly type="text"/>
    </div>

  </ProposalDetails>
</template>


<chrome-i18n locale="uk">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "label": {
    "message": "Видимість елемента"
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


<chrome-i18n locale="en">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "label": {
    "message": "Element visibility"
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

.details-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

small {
  color: rgba(0, 0, 0, 0.54);
}
</style>
