<script lang="ts" setup>
import {effectScope, onMounted, ref, watch, watchEffect} from "vue";
import {useEventListener} from "@vueuse/core";


const selected = ref<HTMLElement | null>(null)


function onSelect() {
  const scope = effectScope()

  scope.run(() => {
    const hoveredElement = ref<HTMLElement>()

    function addHighlight(el: HTMLElement) {
      el.dataset.originalOutline = el.style.outline
      el.style.outline = 'highlight solid 4px';
    }

    function clearHighlight(el) {
      el.style.outline = el.dataset.originalOutline || '';
    }

    watch(hoveredElement, (el, prevEl) => {
      console.log({prevEl})
      if (prevEl) {
        clearHighlight(prevEl)
      }

      addHighlight(el)
    })

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
        clearHighlight(hoveredElement.value)
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

watchEffect(() => console.log(selected.value))
</script>

<template>
  <section id="app-root">
  </section>
</template>

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
