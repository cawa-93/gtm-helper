<script lang="ts" setup>
import {IconClose, IconSearch} from '@iconify-prerendered/vue-mdi'

defineEmits<{
  selectNewElement: [],
  close: []
}>()

const useI18n = chrome.i18n.getMessage
</script>

<template>
  <div class="controls">
    <div class="controls-group">
      <button :title="useI18n('select_element')" type="button"
              @click.prevent="$emit('selectNewElement')">
        <IconSearch/>
      </button>
    </div>
    <div class="controls-group">
      <button title="Завершити роботу" type="button" @click.prevent="$emit('close')">
        <IconClose/>
      </button>
    </div>
  </div>
</template>


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