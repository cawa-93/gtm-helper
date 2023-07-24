<script lang="ts" setup>
import {computed} from "vue";
import LinkLikeButton from "./LinkLikeButton.vue";
import ColoredAlert from "./ColoredAlert.vue";
import {getMessage} from "vite-plugin-vue-chrome-i18n/getMessage.js";

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
    {{ getMessage('recommendation') }}.
    <LinkLikeButton @click="element = parentForm">
      {{ getMessage('action') }}.
    </LinkLikeButton>
  </ColoredAlert>
</template>

<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="uk">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "recommendation": {
    "message": "Обрано елемент в середині форми"
  },
  "action": {
    "message": "Перемкнутись на саму форму"
  }
}
</chrome-i18n>


<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="en">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "recommendation": {
    "message": "Selected element in form"
  },
  "action": {
    "message": "Switch to form itself"
  }
}
</chrome-i18n>