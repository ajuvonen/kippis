<script setup lang="ts">
import {RouterLink} from 'vue-router';

defineProps<{to: string}>();
</script>
<template>
  <RouterLink class="link-button flex items-center" :to="to">
    <slot />
  </RouterLink>
</template>
