<script setup lang="ts">
defineProps<{title: string; items: string[]}>();
</script>

<template>
  <div v-if="items.length" class="capitalized-list">
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="item in items" :key="item" class="text-sm uppercase leading-8">{{ item }}</li>
    </ul>
  </div>
</template>
