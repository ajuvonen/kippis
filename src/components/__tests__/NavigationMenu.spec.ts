import {mount} from '@vue/test-utils';
import {describe, it, expect, beforeEach} from 'vitest';
import router from '@/router';
import {useCocktailStore} from '@/stores/cocktail';
import NavigationMenu from '@/components/NavigationMenu.vue';

describe('NavigationMenu', () => {
  const cocktailStore = useCocktailStore();

  beforeEach(() => {
    cocktailStore.$reset();
  });

  it('mounts', () => {
    const wrapper = mount(NavigationMenu);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('shows selection size', () => {
    cocktailStore.selection.add(1);
    const wrapper = mount(NavigationMenu);
    expect(wrapper.findByTestId('selection-size-indicator').text()).toBe('1');
  });

  it.each(router.getRoutes())('includes link to $path', () => {
    const wrapper = mount(NavigationMenu);
    router.getRoutes().forEach((route) => {
      expect(wrapper.find(`[href="${route.path}"]`).exists()).toBe(true);
    });
  });
});
