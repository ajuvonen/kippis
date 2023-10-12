<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import SearchField from '@/components/SearchField.vue';
import {MAIN_PHOTOS} from '@/utils/constants';
import type {MainPhoto} from '@/utils/types';

const {t} = useI18n();

const mainPhoto = ref<MainPhoto>();
onMounted(() => {
  const randomIndex = Math.floor(Math.random() * 3);
  mainPhoto.value = MAIN_PHOTOS[randomIndex];
});
</script>
<template>
  <div class="flex flex-col sm:flex-row h-full">
    <aside
      :style="{'background-image': `url('/${mainPhoto?.file}')`}"
      class="h-1/2 sm:h-full sm:w-1/2 text-center bg-cover bg-center"
    >
      <div
        class="flex flex-col p-4 justify-center h-full bg-gradient-to-b from-transparent to-slate-800 to-80%"
      >
        <h1>{{ t('homeView.title') }}</h1>
        <p>{{ t('homeView.ingress') }}</p>
      </div>
    </aside>
    <main class="flex flex-col justify-center h-1/2 sm:h-full sm:w-1/2">
      <SearchField />
    </main>
  </div>
</template>
<style scoped></style>
