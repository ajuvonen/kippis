<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import IconComponent from '@/components/IconComponent.vue';

const {availableLocales, locale} = useI18n();

const nextLocale = computed<string>(() => availableLocales.find((loc) => loc !== locale.value)!);

const changer = ref<HTMLButtonElement | null>(null);

watch(locale, async () => {
  changer.value?.focus();
});
</script>
<template>
  <button
    class="locale-changer"
    ref="changer"
    :aria-label="$t('localeChanger.changeLocale', [nextLocale])"
    @click="() => (locale = nextLocale)"
  >
    <IconComponent icon="earth" />
    {{ locale }}
  </button>
</template>
<style lang="scss" scoped>
.locale-changer {
  @apply z-20 absolute top-4 -left-6 w-12 h-14 pr-0 pl-5 m-0 rounded-md flex flex-col;
}
</style>
