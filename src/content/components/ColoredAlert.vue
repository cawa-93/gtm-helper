<script lang="ts" setup>

</script>

<template>
  <section role="alert">
    <slot></slot>
  </section>
</template>

<style scoped>
section {
  font-size: small;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid oklch(0.93 0.1 var(--hue, 0));
  background-color: oklch(0.96 0.05 var(--hue, 0));
  color: oklch(0.43 0.09 var(--hue, 0));
}
</style>