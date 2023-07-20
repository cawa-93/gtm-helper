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
</script>

<template>
  <ColoredAlert v-if="parentForm" style="--hue: 270">
    Обрано елемент в середині форми.
    <LinkLikeButton @click="element = parentForm">
      Перемкнутись на всю форму.
    </LinkLikeButton>
  </ColoredAlert>
</template>