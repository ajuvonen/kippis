<script setup lang="ts">
import {RouterLink} from 'vue-router';

defineProps<{
  to: string;
}>();
</script>
<template>
  <RouterLink class="flex items-center link-button" :to="to">
    <slot />
  </RouterLink>
</template>
