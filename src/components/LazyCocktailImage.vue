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

<style lang="scss" scoped>
.lazy-image__fallback,
.lazy-image__error {
  @apply bg-slate-800 h-full flex items-center justify-center fill-slate-100;
  > svg {
    @apply w-16 h-16;
  }
}
</style>
