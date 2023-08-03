<script setup lang="ts">
import {RouterView} from 'vue-router';
import NavigationMenu from '@/components/NavigationMenu.vue';
</script>

<template>
  <NavigationMenu />
  <RouterView class="flex-grow overflow-y-auto"/>
</template>
