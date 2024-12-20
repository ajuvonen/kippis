import {mount} from '@vue/test-utils';
import {describe, it, expect, beforeEach} from 'vitest';
import router from '@/router';
import NavigationMenu from '@/components/NavigationMenu.vue';
import {testCocktails} from '@/components/__tests__/mswHandlers';
import {useCocktailStore} from '@/stores/cocktail';

describe('NavigationMenu', () => {
  let cocktailStore: ReturnType<typeof useCocktailStore>;

  beforeEach(() => {
    cocktailStore = useCocktailStore();
  });

  it('mounts', () => {
    const wrapper = mount(NavigationMenu);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('shows selection size', () => {
    cocktailStore.selection.push(testCocktails[0][1]);
    const wrapper = mount(NavigationMenu);
    expect(wrapper.find('.navigation-menu__selection-size').text()).toBe('1');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it.each(router.getRoutes())('includes link to $path', () => {
    const wrapper = mount(NavigationMenu);
    router.getRoutes().forEach((route) => {
      expect(wrapper.find(`[href="${route.path}"]`).exists()).toBe(true);
    });
  });
});
