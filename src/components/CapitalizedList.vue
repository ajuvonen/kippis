<script setup lang="ts">
defineProps<{
  title: string;
  items: string[];
}>();
</script>

<template>
  <div v-if="items.length" class="capitalized-list">
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="item in items" :key="item" class="capitalized-list__item">{{ item }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.capitalized-list__item {
  @apply text-sm uppercase leading-8;
}
</style>
