<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  element: HTMLElement | null | undefined
}>()

const highlightRect = computed(() => {
  if (!props.element) {
    return {
      display: 'none'
    }
  }
  const rect = props.element.getBoundingClientRect()
  return {
    height: `${rect.height}px`,
    width: `${rect.width}px`,
    top: `${rect.top}px`,
    left: `${rect.left}px`,
  }
})
</script>


<template>
  <div class="rectangle" :style="highlightRect"></div>
</template>

<style scoped>
.rectangle {
  z-index: 999999999;
  border: 1px solid rgba(255, 99, 71);
  background: rgba(255, 99, 71, 0.5);
  position: fixed;
}
</style>