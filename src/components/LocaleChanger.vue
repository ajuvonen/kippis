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
    class="locale-changer left-button"
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
  @apply top-4;
}
</style>
