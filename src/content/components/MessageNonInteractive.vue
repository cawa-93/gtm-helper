<script lang="ts" setup>
import {computed} from "vue";
import {isClickable} from "../utils/isClickable.js";
import LinkLikeButton from "./LinkLikeButton.vue";
import ColoredAlert from "./ColoredAlert.vue";
import {getMessage} from "vite-plugin-vue-chrome-i18n/getMessage.js";

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
    {{ getMessage('notice') }}.
    <LinkLikeButton v-if="interactiveParent" @click="element = interactiveParent">
      {{ getMessage('action') }}
    </LinkLikeButton>
  </ColoredAlert>
</template>


<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="uk">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "notice": {
    "message": "Вибраний елемент, ймовірно, не є клікабельним"
  },
  "action": {
    "message": "Перемкнутись на клікабельну обгортку"
  }
}
</chrome-i18n>


<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="en">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "notice": {
    "message": "Selected element, probably, is not clickable"
  },
  "action": {
    "message": "Switch to clickable wrapper"
  }
}
</chrome-i18n>