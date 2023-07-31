<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {ALCOHOLS} from '@/utils/constants';

const router = useRouter();

const searchString = ref('');
</script>

<template>
  <label for="search-box" class="text-3xl mb-4">Search for Recipes</label>
  <div class="flex justify-center divide-x mb-4">
    <input
      id="search-box"
      v-model="searchString"
      type="text"
      maxlength="20"
      class="rounded-tr-none rounded-br-none pb-1"
    />
    <button class="rounded-tl-none rounded-bl-none" @click="router.push({name: 'search', query: {searchString}})">
      Search
    </button>
  </div>
  <div class="flex flex-wrap justify-center">
    <button v-for="{tag} in ALCOHOLS" :key="tag" @click="router.push({name: 'search', query: {tag}})">{{ tag }}</button>
    <button>I'm Feeling Lucky</button>
  </div>
</template>
