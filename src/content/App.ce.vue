<script lang="ts" setup>
import {effectScope, getCurrentInstance, onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import {useEventListener} from "@vueuse/core";
import {useHighlightOnElement} from "./components/UseHighlightOnElement";
import WidgetWindow from "./components/WidgetWindow.vue";
import WidgetControls from "./components/WIdgetControls.vue";


const selected = ref<HTMLElement | null>(null)


function onSelect() {
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
      console.log('CLICK')
      if (hoveredElement.value && hoveredElement.value instanceof HTMLElement) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
        selected.value = hoveredElement.value
        console.log('STOP')
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


const closeApp = () => {
  document.querySelector('gtm-helper')?.remove()
}
</script>

<template>
  <section id="app-root">
    <WidgetWindow v-if="selected">
      <template #header>
        <WidgetControls @close="closeApp" @selectNewElement="onSelect"/>
      </template>
    </WidgetWindow>
  </section>
</template>

<style>
* {
  box-sizing: border-box;
}
</style>

<style scoped>
#app-root {
  position: absolute;
  z-index: 99999999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
}
</style>
