<script setup lang="ts">
defineProps<{
  title: string;
  items: string[];
}>();
</script>

<template>
  <div class="capitalized-list">
    <h3 v-if="items.length">{{ title }}</h3>
    <ul v-if="items.length">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
li {
  @apply text-sm uppercase leading-8;
}
</style>
