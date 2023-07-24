<script lang="ts" setup>
import {getMessage} from "vite-plugin-vue-chrome-i18n/getMessage.js";

const version = chrome.runtime.getManifest().version
</script>

<template>
  <div class="controls">
    <div class="controls-group">
      v{{ version }}-alpha
    </div>
    <div class="controls-group">
      <a href="https://www.buymeacoffee.com/kozack/" target="_blank">{{ getMessage('donate') }}</a>
      <a href="https://kozack.me" target="_blank">{{ getMessage('contacts') }}</a>
    </div>
  </div>
</template>


<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="uk">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "donate": {
    "message": "Задонатити"
  },
  "contacts": {
    "message": "Контакти"
  }
}
</chrome-i18n>


<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="en">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "donate": {
    "message": "Donate"
  },
  "contacts": {
    "message": "Contacts"
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
</style>