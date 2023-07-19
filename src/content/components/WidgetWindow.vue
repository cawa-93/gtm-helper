<script lang="ts" setup>
import {useDraggable} from "@vueuse/core";
import {computed, onMounted, ref} from "vue";

const draggingElement = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const {x, y, style} = useDraggable(handle, {
  preventDefault: true,
  draggingElement,
  stopPropagation: true,
  initialValue: {x: 0, y: 0}
})
//
// const attachedHorizontalStyles = computed(() => {
//   return x.value < window.innerWidth / 2 ? {left: 0} : {right: 0}
// })
//
//
// const attachedVerticalStyles = computed(() => {
//   return y.value < window.innerHeight / 2 ? {top: 0} : {bottom: 0}
// })
//
// const style = computed(() => {
//   if (isDragging.value) {
//     return {
//       left: x.value + 'px',
//       top: y.value + 'px',
//     }
//   }
//
//   return {
//     ...attachedHorizontalStyles.value,
//     ...attachedVerticalStyles.value,
//   }
// })
</script>

<template>
  <section ref="draggingElement" :style="style">
    <header ref="handle">
      <slot name="header"></slot>
    </header>
    <main>
      <pre>
        style:{{ style }}

        x:{{ x }}
        y:{{ y }}

        attachedStyles: {{ style }}
      </pre>
    </main>
  </section>
</template>

<style scoped>
section {
  position: fixed;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  pointer-events: all;
  background: white;
  width: 100%;
  max-height: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);

  --border-color: #dee2e6;
  border: 1px solid var(--border-color);
}

header {
  cursor: move;
  min-height: 50px;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  user-select: none;
  touch-action: none;
}

main {
  flex: 1;
  padding: 1rem;
  overflow: auto;
}


</style>