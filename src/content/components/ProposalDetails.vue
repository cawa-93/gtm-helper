<script lang="ts" setup>
import {Component} from "vue";

defineProps<{
  label: string
  icon: {
    color: string
    component: Component
  }
}>()
</script>

<template>
  <details>
    <summary>
      <component :is="icon.component" :style="'--icon-color:' + icon.color" class="icon"></component>
      {{ label }}
    </summary>
    <div class="inner-content">
      <slot></slot>
    </div>
  </details>
</template>

<style scoped>

details {
  border-radius: 8px;
  --border-color: #dee2e6;
  border: 1px solid var(--border-color);
}

summary {
  list-style: none;
  cursor: pointer;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.icon {
  width: 24px;
  height: 24px;
  background: var(--icon-color, #29b6f6);
  border-radius: 50%;
  color: white;
  padding: 3px;
}

.inner-content {
  padding-bottom: 8px;
  padding-inline: 8px;
}
</style>
