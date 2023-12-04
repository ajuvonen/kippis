<script setup lang="ts">
import {RouterLink} from 'vue-router';

defineProps<{
  to: string;
}>();
</script>
<template>
  <RouterLink class="link-button" :to="to">
    <slot />
  </RouterLink>
</template>
<style lang="scss" scoped>
.link-button {
  @apply flex items-center;
}
</style>
