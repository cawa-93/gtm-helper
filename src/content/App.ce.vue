<script lang="ts" setup>
import {effectScope, onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import {useEventListener} from "@vueuse/core";
import {useHighlightOnElement} from "./composables/UseHighlightOnElement.js";
import WidgetWindow from "./components/WidgetWindow.vue";
import WidgetControls from "./components/WidgetControls.vue";
import WidgetProposals from "./components/WidgetProposals.vue";
import MessageNonInteractive from "./components/MessageNonInteractive.vue";
import MessageInForm from "./components/MessageInForm.vue";
import MessageFormSubmit from "./components/MessageFormSubmit.vue";
import WidgetFooter from "./components/WidgetFooter.vue";

const selected = ref<HTMLElement | null>(null)

function onSelect() {
  selected.value = null
  const scope = effectScope()

  scope.run(() => {
    const hoveredElement = ref<HTMLElement>()


    useHighlightOnElement(hoveredElement)

    function updateHoveredElement(e: MouseEvent) {
      if (!e.target || !(e.target instanceof HTMLElement)) {
        return
      }

      hoveredElement.value = e.target
    }

    function handleClick(event: Event) {
      if (hoveredElement.value && hoveredElement.value instanceof HTMLElement) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
        selected.value = hoveredElement.value
        scope.stop()
      }
    }


    useEventListener(document, 'mouseover', updateHoveredElement)
    useEventListener(document, 'click', handleClick, {
      capture: true
    })
  })
}

onMounted(onSelect)

onBeforeUnmount(() => console.log('onBeforeUnmount'))
onUnmounted(() => console.log('onUnmounted'))

useHighlightOnElement(selected)

/**
 * Element inside shadow root
 */
const root = ref<HTMLElement>()
const closeApp = () => {
  // @ts-ignore
  root.value.getRootNode().host.remove()
}
</script>

<template>
  <section id="app-root" ref="root">
    <WidgetWindow>
      <template #header>
        <WidgetControls @close="closeApp" @selectNewElement="onSelect"/>
      </template>

      <div class="main-content">
        <MessageFormSubmit v-if="selected" v-model:element="selected"/>
        <MessageInForm v-if="selected" v-model:element="selected"/>
        <MessageNonInteractive v-if="selected" v-model:element="selected"/>
        <WidgetProposals v-if="selected" :element="selected"/>
        <div v-else>Оберіть елемент на сторінці для аналізу</div>
      </div>
      <template #footer>
        <WidgetFooter/>
      </template>
    </WidgetWindow>
  </section>
</template>

<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="uk">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "select": {
    "message": "Оберіть елемент на сторінці для аналізу"
  }
}
</chrome-i18n>


<!--suppress JsonStandardCompliance, HtmlUnknownTag -->
<!-- language=json -->
<chrome-i18n locale="uk">
{
  "$schema": "https://json.schemastore.org/browser.i18n.json",
  "select": {
    "message": "Select element on page to analyze"
  }
}
</chrome-i18n>

<style>
* {
  box-sizing: border-box;
}
</style>

<style scoped>
#app-root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  position: absolute;
  z-index: 99999999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  font-size: 16px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
