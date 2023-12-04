<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import SearchField from '@/components/SearchField.vue';
import {MAIN_PHOTOS} from '@/utils/constants';
import type {MainPhoto} from '@/utils/types';

const {t} = useI18n();

const mainPhoto = ref<MainPhoto>();
onMounted(() => {
  const randomIndex = Math.floor(Math.random() * MAIN_PHOTOS.length);
  mainPhoto.value = MAIN_PHOTOS[randomIndex];
});
</script>
<template>
  <aside
    :style="{'background-image': `url('/${mainPhoto?.file}')`}"
    class="home__side-panel"
  >
    <div
      class="home__side-panel-content-wrapper"
    >
      <h1>{{ t('homeView.title') }}</h1>
      <p>{{ t('homeView.ingress') }}</p>
      <div class="absolute bottom-4">
        <a :href="mainPhoto?.link" target="_blank" class="text-xs" noreferrer noopener>{{
          t('homeView.credit', [mainPhoto?.acknowledgement])
        }}</a>
      </div>
    </div>
  </aside>
  <main class="home__main">
    <SearchField />
  </main>
</template>
<style lang="scss" scoped>
.home__side-panel {
  @apply p-0 relative h-3/5 sm:h-full sm:w-1/2 text-center bg-cover bg-center;
}

.home__side-panel-content-wrapper {
  @apply p-4 flex flex-col justify-center items-center h-full bg-gradient-to-b from-transparent to-slate-800 to-80%;
}

.home__main {
  @apply flex flex-col justify-center h-2/5 sm:h-full sm:w-1/2;
}
</style>
