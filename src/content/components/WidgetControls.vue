<script lang="ts" setup>
import {IconOutlineSearch, IconOutlineClose} from '@iconify-prerendered/vue-ic'

defineEmits<{
  selectNewElement: [],
  close: []
}>()
</script>

<template>
  <div class="controls">
    <div class="controls-group">
      <button title="Обрати інший елемент для аналізу" type="button" @click.prevent="$emit('selectNewElement')">
        <IconOutlineSearch/>
      </button>
    </div>
    <div class="controls-group">
      <button title="Завершити роботу" type="button" @click.prevent="$emit('close')">
        <IconOutlineClose/>
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