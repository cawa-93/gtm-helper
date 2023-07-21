<script lang="ts" setup>
const version = chrome.runtime.getManifest().version
</script>

<template>
  <div class="controls">
    <div class="controls-group">
      v{{ version }}-alpha
    </div>
    <div class="controls-group">
      <a href="https://www.buymeacoffee.com/kozack/" target="_blank">Donate</a>
      <a href="https://kozack.me" target="_blank">Contacts</a>
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
</style>