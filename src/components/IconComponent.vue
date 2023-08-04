<script setup lang="ts">
defineProps<{
  icon: string;
}>();
</script>
<template>
  <i class="mdi" :class="`mdi-${icon}`" aria-hidden="true" />
</template>
<style lang="scss" scoped>
.mdi {
  @apply text-lg;
}
</style>
