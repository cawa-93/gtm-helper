<script lang="ts" setup>
import {IconClose, IconSearch} from '@iconify-prerendered/vue-mdi'

import {getMessage} from 'vite-plugin-vue-chrome-i18n/getMessage.js'


defineEmits<{
  selectNewElement: [],
  close: []
}>()

</script>

<template>
  <div class="controls">
    <div class="controls-group">
      <button :title="getMessage('select_element')" type="button"
              @click.prevent="$emit('selectNewElement')">
        <IconSearch/>
      </button>
    </div>
    <div class="controls-group">
      <button :title="getMessage('close_app')" type="button" @click.prevent="$emit('close')">
        <IconClose/>
      </button>
    </div>
  </div>
</template>


<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="uk">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "select_element": {
    "message": "Обрати новий елемент для аналізу"
  },
  "close_app": {
    "message": "Завершити роботу"
  }
}
</chrome-i18n>


<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="en">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "select_element": {
    "message": "Select new element for analyze"
  },
  "close_app": {
    "message": "Close app"
  }
}
</chrome-i18n>


<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
}

.controls-group {
  display: flex;
  gap: 1em;
  align-items: center;
}

button {
  font-size: 150%;
  border: none;
  background: none;
  pointer-events: auto;
  cursor: pointer;
  padding: 0.1em;
  border-radius: 0.2em;
}

button:not(:hover):not(:focus-visible) {
  opacity: 0.5;
}

button:hover, button:focus-visible {
  background: rgba(0, 0, 0, 0.1);
}

button svg {
  display: block;
}
</style>