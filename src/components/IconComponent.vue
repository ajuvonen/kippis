<script setup lang="ts">
import {
  mdiCloseCircleOutline,
  mdiGiftOutline,
  mdiGlassCocktail,
  mdiGlassCocktailOff,
  mdiMagnify,
  mdiPlus,
  mdiPrinterOutline,
  mdiTrashCan,
} from '@mdi/js';

type IconString =
  | 'closeCircle'
  | 'cocktail'
  | 'cocktailOff'
  | 'gift'
  | 'magnify'
  | 'plus'
  | 'printer'
  | 'trashCan';

defineProps<{
  icon: IconString;
}>();

const icons = {
  closeCircle: mdiCloseCircleOutline,
  cocktail: mdiGlassCocktail,
  cocktailOff: mdiGlassCocktailOff,
  gift: mdiGiftOutline,
  magnify: mdiMagnify,
  printer: mdiPrinterOutline,
  plus: mdiPlus,
  trashCan: mdiTrashCan,
};
</script>
<template>
  <svg viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5">
    <path :d="icons[icon]" class="transition-all ease-in-out"></path>
  </svg>
</template>
