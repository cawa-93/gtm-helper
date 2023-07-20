<script lang="ts" setup>
import {computed} from "vue";
import LinkLikeButton from "./LinkLikeButton.vue";
import ColoredAlert from "./ColoredAlert.vue";

const element = defineModel<HTMLElement>('element', {
  required: true
})

const parentForm = computed(() => {
  const parentFormOrItself: HTMLFormElement | null = element.value.closest('form');
  return parentFormOrItself && parentFormOrItself !== element.value ? parentFormOrItself : null
})

const isSubmitElement = computed(() => {
  const el = element.value
  return (el instanceof HTMLInputElement || el instanceof HTMLButtonElement) && el.type === 'submit'
})
</script>

<template>
  <ColoredAlert v-if="parentForm && isSubmitElement" style="--hue: 0">
    Для відслідковування надсилання форми рекомендовано використовувати тріґер <b>Form Submission</b> на всій формі.
    <LinkLikeButton @click="element = parentForm">
      Перемкнутись на всю форму.
    </LinkLikeButton>
  </ColoredAlert>
</template>