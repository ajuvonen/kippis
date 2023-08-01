<script setup lang="ts">
import {RouterView, RouterLink} from 'vue-router';
</script>

<template>
  <ul
    class="fixed h-14 bottom-0 sm:top-0 w-full bg-white flex flex-nowrap justify-center items-stretch shadow-xs"
    role="navigation"
  >
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="search">Search</RouterLink>
    <RouterLink to="selection">Selection</RouterLink>
  </ul>
  <RouterView class="sm:mt-10" />
</template>

<style lang="scss" scoped>
a {
  @apply flex flex-col justify-center w-1/3 sm:w-[100px] text-center m-1 rounded-md uppercase text-sm tracking-wide transition-colors ease-in-out;

  &:hover {
    @apply bg-slate-800 text-white;
  }

  &.router-link-exact-active:not(:hover) {
    @apply bg-slate-200;
  }
}
</style>
