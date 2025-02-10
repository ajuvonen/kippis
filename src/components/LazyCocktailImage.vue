<script setup lang="ts">
import {ref} from 'vue';
import {useElementVisibility, watchOnce} from '@vueuse/core';
import {UseImage} from '@vueuse/components';
import IconComponent from '@/components/IconComponent.vue';
withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
  }>(),
  {
    src: '',
    alt: '',
  },
);

const wrapper = ref<HTMLDivElement | null>(null);
const isVisible = useElementVisibility(wrapper);
const loadContent = ref(isVisible.value);

watchOnce(isVisible, () => {
  loadContent.value = true;
});
</script>

<template>
  <div ref="wrapper">
    <UseImage :src="loadContent ? src : ''" :alt="alt">
      <template #loading>
        <div class="lazy-image__fallback">
          <IconComponent icon="cocktail" />
        </div>
      </template>
      <template #error>
        <div class="lazy-image__error">
          <IconComponent icon="cocktailOff" />
        </div>
      </template>
    </UseImage>
  </div>
</template>

<style scoped>
.lazy-image__fallback,
.lazy-image__error {
  @apply bg-slate-800 pt-[100%] fill-slate-100;
  > svg {
    @apply w-16 h-16 absolute top-1/2 left-1/2;
    transform: translate(-50%, -50%);
  }
}
</style>
