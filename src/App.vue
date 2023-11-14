<script setup lang="ts">
import {RouterView} from 'vue-router';
import NavigationMenu from '@/components/NavigationMenu.vue';
import CocktailModal from '@/components/CocktailModal.vue';
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden text-slate-800">
    <NavigationMenu />
    <div class="flex flex-col sm:flex-row h-full min-h-0 items-stretch">
      <RouterView />
    </div>
  </div>
  <CocktailModal />
</template>
