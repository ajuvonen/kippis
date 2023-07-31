<script setup lang="ts">
import {onMounted, ref} from 'vue';
import SearchField from '@/components/SearchField.vue';
import {MAIN_PHOTOS} from '@/utils/constants';
import type {MainPhoto} from '@/utils/types';

const mainPhoto = ref<MainPhoto>();
onMounted(() => {
  const randomIndex = Math.floor(Math.random() * 3);
  mainPhoto.value = MAIN_PHOTOS[randomIndex];
});

</script>
<template>
  <div class="flex flex-col sm:flex-row h-screen">
    <aside
      :style="{'background-image': `url('/${mainPhoto?.file}')`}"
      class="h-1/2 sm:h-full sm:w-1/2 bg-slate-800 text-slate-100 text-center bg-cover bg-center">
      <div class="flex flex-col p-4 justify-center h-full bg-gradient-to-b from-transparent to-slate-800 to-80%">
        <h1>Enter a world of delicious cocktails!</h1>
        <p>Use this service to find inspirational cocktails, plan your own cocktail party, and create a shopping list for a memorable evening. Use the search box or ingredient tags to get started.</p>
      </div>
    </aside>
    <main class="h-1/2 sm:h-full sm:w-1/2">
      <search-field />
    </main>
  </div>
</template>
<style scoped>
</style>@/utils/constants