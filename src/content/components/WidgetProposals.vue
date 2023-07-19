<script lang="ts" setup>
import {useProposals} from "./useProposals.js";

const props = defineProps<{
  element: HTMLElement
}>()

const proposals = useProposals(props.element)
</script>

<template>
  <ul>
    <li v-for="(proposal, index) of proposals" :key="index">
      {{ proposal.triggerType }} + {{ proposal.selectorType }} + {{ proposal.selectorValue }}
    </li>
  </ul>
</template>

<style scoped>

</style>