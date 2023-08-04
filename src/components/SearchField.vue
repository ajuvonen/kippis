<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {ALCOHOLS} from '@/utils/constants';
import LinkButton from '@/components/LinkButton.vue';
import IconComponent from '@/components/IconComponent.vue';

const router = useRouter();
const route = useRoute();
const {t} = useI18n();

const searchString = ref('');

onMounted(() => {
  if (route.query.searchString) {
    searchString.value = route.query.searchString.toString().trim().slice(0, 20);
  }
});
</script>

<template>
  <label for="search-box" class="block text-center text-3xl mt-4 mb-4">{{ t('searchField.label') }}</label>
  <div class="flex justify-center divide-x mb-4">
    <input
      id="search-box"
      v-model="searchString"
      type="search"
      maxlength="20"
      class="relative rounded-tr-none rounded-br-none pb-1"
    />
    <button
      class="relative rounded-tl-none rounded-bl-none"
      @click="router.push({name: 'search', query: {searchString}})"
    >
      <IconComponent icon="magnify" />
      <span>{{ t('searchField.search') }}</span>
    </button>
  </div>
  <ul class="flex flex-wrap justify-center" :aria-label="t('searchField.tagListTitle')">
    <li class="inline" v-for="{tag} in ALCOHOLS" :key="tag">
      <LinkButton :to="`/search?tag=${tag}`">
        {{ t(`tags.${tag}`) }}
      </LinkButton>
    </li>
    <li>
      <button>
        <IconComponent icon="clover" />
        <span>{{ t('searchField.random') }}</span>
      </button>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
li + li {
  @apply ml-1;
}

input:focus {
  z-index: 1;
}
</style>
