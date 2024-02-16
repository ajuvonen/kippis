<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import IconComponent from '@/components/IconComponent.vue';

const {locale} = useI18n();

const nextLocale = computed(() => locale.value === 'en' ? 'fi' : 'en');

const changer = ref<HTMLButtonElement | null>(null);

watch(locale, (newValue) => {
  document.documentElement.lang = newValue;
});
</script>
<template>
  <button
    class="locale-changer left-button top-4"
    ref="changer"
    :aria-label="$t('localeChanger.changeLocale', [nextLocale])"
    @click="() => (locale = nextLocale)"
  >
    <IconComponent icon="earth" />
    {{ locale }}
  </button>
</template>
<style lang="scss" scoped>
</style>
