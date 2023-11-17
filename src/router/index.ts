import {createRouter, createWebHistory} from 'vue-router';
import {isEmpty} from 'remeda';
import HomeView from '@/views/HomeView.vue';
import {useCocktailStore} from '@/stores/cocktail';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      props: (route) => ({
        searchString: !route.query.tag ? route.query.searchString : undefined,
        tag: route.query.tag,
      }),
      beforeEnter: (to) => {
        if (isEmpty(to.query)) {
          const cocktailStore = useCocktailStore();
          if (cocktailStore.currentSearch.tag || cocktailStore.currentSearch.searchString) {
            cocktailStore.preventFetch = true;
            return {path: to.path, query: {...cocktailStore.currentSearch}};
          }
        }
      },
      component: () => import('@/views/SearchView.vue'),
    },
    {
      path: '/ingredients',
      name: 'ingredients',
      component: () => import('@/views/IngredientsView.vue'),
    },
  ],
});

export default router;
