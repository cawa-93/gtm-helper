<script lang="ts" setup>
import {computed} from "vue";
import {isClickable} from "../utils/isClickable.js";
import LinkLikeButton from "./LinkLikeButton.vue";
import ColoredAlert from "./ColoredAlert.vue";

const element = defineModel<HTMLElement>('element', {
  required: true
})


const isInteractiveElement = (element: HTMLElement) => element instanceof HTMLFormElement || isClickable(element)

const isSelectedElementNonInteractive = computed(() => !isInteractiveElement(element.value))
const interactiveParent = computed(() => {
  let parent = element.value.parentElement
  while (!!parent) {
    if (isInteractiveElement(parent)) {
      return parent
    }
    parent = parent?.parentElement
  }

  return null
})

</script>

<template>
  <ColoredAlert v-if="isSelectedElementNonInteractive" style="--hue: 92">
    Обраний вами елемент є не інтерактивним.
    <span v-if="interactiveParent">
      Але у нього є інтерактивна обгортка.
      <LinkLikeButton @click="element = interactiveParent">
        Перемкнутись
      </LinkLikeButton>
    </span>
  </ColoredAlert>
</template>

<style scoped>

</style>