<script setup lang="ts">
import {
  mdiChevronDoubleDown,
  mdiCloseCircleOutline,
  mdiDiceMultipleOutline,
  mdiEarth,
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
  | 'dice'
  | 'down'
  | 'earth'
  | 'magnify'
  | 'plus'
  | 'printer'
  | 'trashCan';

defineProps<{icon: IconString}>();

const icons = {
  closeCircle: mdiCloseCircleOutline,
  cocktail: mdiGlassCocktail,
  cocktailOff: mdiGlassCocktailOff,
  dice: mdiDiceMultipleOutline,
  down: mdiChevronDoubleDown,
  earth: mdiEarth,
  magnify: mdiMagnify,
  printer: mdiPrinterOutline,
  plus: mdiPlus,
  trashCan: mdiTrashCan,
} as const;
</script>
<template>
  <svg viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5">
    <path :d="icons[icon]" class="transition-all"></path>
  </svg>
</template>
