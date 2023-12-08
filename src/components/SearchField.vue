<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {useCocktailStore} from '@/stores/cocktail';
import {SEARCHABLE_ALCOHOLS} from '@/utils/constants';
import LinkButton from '@/components/LinkButton.vue';
import IconComponent from '@/components/IconComponent.vue';

withDefaults(
  defineProps<{
    omitTitle?: boolean;
  }>(),
  {
    omitTitle: false,
  },
);

const cocktailStore = useCocktailStore();
const {showRandomCocktail} = cocktailStore;

const router = useRouter();
const route = useRoute();

const {t} = useI18n();

const searchString = ref('');

onMounted(() => {
  searchString.value = (route.query.searchString || '').toString().slice(0, 20);
});

const search = () => router.push({name: 'search', query: {searchString: searchString.value}});
</script>

<template>
  <div>
    <label
      for="search-input"
      class="search-field__label"
      :class="omitTitle ? 'search-field__label--sr-only' : ''"
      >{{ t('searchField.label') }}</label
    >
    <div class="search-field__wrapper">
      <input
        id="search-input"
        v-model="searchString"
        type="search"
        maxlength="20"
        class="search-field__input"
        @keypress.enter="search"
      />
      <button class="search-field__search-button" @click="search">
        <IconComponent icon="magnify" />
        <span>{{ t('searchField.search') }}</span>
      </button>
    </div>
    <ul class="search-field__tag-container" :aria-label="t('searchField.tagListTitle')">
      <li v-for="{tag} in SEARCHABLE_ALCOHOLS" :key="tag">
        <LinkButton :to="`/search?tag=${tag}`">
          {{ t(`tags.${tag}`) }}
        </LinkButton>
      </li>
      <li>
        <button @click="showRandomCocktail" data-test-id="search-field__random-button">
          <IconComponent icon="gift" />
          <span>{{ t('searchField.random') }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.search-field__label {
  @apply block text-center text-3xl mt-4 mb-4;

  &--sr-only {
    @apply sr-only;
  }
}

.search-field__wrapper {
  @apply flex justify-center mb-4 divide-x;
}

.search-field__input {
  @apply rounded-tr-none rounded-br-none pb-1;

  &:focus {
    z-index: 1;
  }
}

.search-field__search-button {
  @apply rounded-tl-none rounded-bl-none;
}

.search-field__tag-container {
  @apply flex flex-wrap justify-center;
}

li + li {
  @apply ml-1;
}

@media print {
  .search-field__label,
  .search-field__wrapper,
  .search-field__tag-container {
    @apply hidden;
  }
}
</style>
