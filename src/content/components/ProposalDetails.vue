<script lang="ts" setup>
import {IconEye, IconLink, IconMouse, IconPlaylistCheck} from '@iconify-prerendered/vue-mdi'
import {ClickLinkProposal} from "../gtm-proposals/ClickLinkProposal.js";
import {VisibilityProposal} from "../gtm-proposals/VisibilityProposal.js";
import {FormProposal} from "../gtm-proposals/FormProposal.js";
import {ClickProposal} from "../gtm-proposals/ClickProposal.js";
import {computed} from "vue";
import DefinitionList from "./DefinitionList.vue";

const props = defineProps<{
  proposal: VisibilityProposal | ClickLinkProposal | ClickProposal | FormProposal
  definitions: { title: string, value: string }[]
}>()

const icon = computed(() => {
  switch (props.proposal.constructor) {
    case VisibilityProposal :
      return {color: '#8bc34a', component: IconEye, label: 'Element Visibility'}
    case ClickLinkProposal :
      return {color: '#29b6f6', component: IconLink, label: 'Click Just links'}
    case ClickProposal :
      return {color: '#29b6f6', component: IconMouse, label: 'Click All elements'}
    case FormProposal :
      return {color: '#8bc34a', component: IconPlaylistCheck, label: 'Form Submission'}
  }
})
</script>

<template>
  <details>
    <summary>
      <component :is="icon.component" :style="'--icon-color:' + icon.color" class="icon"></component>
      {{ icon.label }}
    </summary>
    <div class="inner-content">
      <DefinitionList :definitions="definitions"/>
    </div>
  </details>
</template>

<style scoped>

details {
  border-radius: 0.5rem;
  --border-color: #dee2e6;
  border: 1px solid var(--border-color);
}

summary {
  list-style: none;
  cursor: pointer;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
}

.icon {
  width: 24px;
  height: 24px;
  background: var(--icon-color, #29b6f6);
  border-radius: 50%;
  color: white;
  /* font-size: 1rem; */
  padding: 3px;
}

.inner-content {
  padding-block: 0.5rem;
  padding-inline-end: 0.5rem;
  padding-inline-start: calc(24px + 1.5rem);
}
</style>
