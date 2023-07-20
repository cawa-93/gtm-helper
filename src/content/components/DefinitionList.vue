<script lang="ts" setup>
defineProps<{
  definitions: { title: string, value: string }[]
}>()
</script>

<template>
  <dl>
    <template v-for="definition of definitions" :key="definition.title">
      <dt>{{ definition.title }}</dt>
      <dd>
        <code>
          {{ definition.value }}
        </code>
      </dd>
    </template>
  </dl>
</template>

<style scoped>
dl, dd {
  margin: 0;
}

dt {
  font-weight: bold;
}

code {
  word-wrap: break-word;
}
</style>