<script setup lang="ts">
import type {SearchResultDrink} from '@/utils/types';

defineProps<{
  item: SearchResultDrink;
}>();
</script>
<template>
  <div
    :style="{background: `url(${item.thumb})`, backgroundSize: 'cover'}"
    class="search-result__image"
    role="button"
    tabindex="0"
  >
    <div
      class="search-result__shadow"
    >
      {{ item.name }}
    </div>
    <button class="search-result__add-button">Add</button>
  </div>
</template>
<style lang="scss" scoped>
.search-result__image {
  filter: contrast(115%);
  outline-offset: 0.2rem;
  @apply hover:cursor-pointer hover:shadow-rose-300 transition-shadow ease-in-out relative w-40 h-40 rounded-md shadow-lg;
}

.search-result__shadow {
  @apply w-full h-full bg-gradient-to-b from-slate-800 to-transparent to-40% rounded-md text-white uppercase text-xs p-2;
}

.search-result__add-button {
  @apply absolute -bottom-4 right-2;
}
</style>
