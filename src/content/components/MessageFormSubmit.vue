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

const isSubmitElement = computed(() => {
  const el = element.value
  return (el instanceof HTMLInputElement || el instanceof HTMLButtonElement) && el.type === 'submit'
})
</script>

<template>
  <ColoredAlert v-if="parentForm && isSubmitElement" style="--hue: 0">
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
    "message": "Для відслідковування надсилання форми рекомендовано використовувати тригер «Надсилання форми»"
  },
  "action": {
    "message": "Перемкнутись на форму"
  }
}
</chrome-i18n>


<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="en">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "recommendation": {
    "message": "To track the submission of a form, we recommend using the «Form Submission» trigger"
  },
  "action": {
    "message": "Switch to form"
  }
}
</chrome-i18n>

