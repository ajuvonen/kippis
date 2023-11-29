<script setup lang="ts">
import {
  mdiClover,
  mdiGlassCocktail,
  mdiGlassCocktailOff,
  mdiMagnify,
  mdiPlus,
  mdiTrashCan,
} from '@mdi/js';

type IconString = 'clover' | 'magnify' | 'plus' | 'trashCan' | 'cocktail' | 'cocktailOff';

defineProps<{
  icon: IconString;
}>();

const icons = {
  clover: mdiClover,
  cocktail: mdiGlassCocktail,
  cocktailOff: mdiGlassCocktailOff,
  magnify: mdiMagnify,
  plus: mdiPlus,
  trashCan: mdiTrashCan,
};

</script>
<template>
  <svg viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5">
    <path :d="icons[icon]" class="transition-all ease-in-out"></path>
  </svg>
</template>
