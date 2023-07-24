<script lang="ts" setup>
import {ref, watch} from "vue";
import {useEventListener} from '@vueuse/core'

const emit = defineEmits<{
  'select': [element: HTMLElement]
}>()

const hoveredElement = ref<HTMLElement>()

watch(hoveredElement, (el, prevEl) => {
  console.log({prevEl})
  if (prevEl) {
    prevEl.style.outline = prevEl.dataset.originalOutline || '';
  }

  el.dataset.originalOutline = el.style.outline
  el.style.outline = 'highlight solid 4px';
})

function updateHoveredElement(e: MouseEvent) {
  e.stopPropagation();

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
    emit('select', hoveredElement.value)
  }
}


useEventListener(document, 'mouseover', updateHoveredElement)
useEventListener(document, 'click', handleClick, {
  capture: true
})
</script>

<template>
  <div class=""></div>
</template>

<style scoped>
.backdrop {
  height: 100%;
  background-color: hsl(0 0% 0% / 0.5);
  pointer-events: none;
}


</style>