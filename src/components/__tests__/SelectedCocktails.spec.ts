import {describe, it, expect, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import router from '@/router';
import {useCocktailStore} from '@/stores/cocktail';
import {testCocktails} from '@/components/__tests__/mswHandlers';
import SelectedCocktails from '@/components/SelectedCocktails.vue';
import SelectedCocktailsMobile from '@/components/SelectedCocktailsMobile.vue';

describe('SelectedCocktails', () => {
  let cocktailStore: ReturnType<typeof useCocktailStore>;

  beforeEach(async () => {
    cocktailStore = useCocktailStore();
    await router.push('/search');
  });

  it('mounts', () => {
    cocktailStore.selection.push(testCocktails[0][1]);
    const wrapper = mount(SelectedCocktails);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('prints selection data', () => {
    cocktailStore.selection = [testCocktails[0][1], testCocktails[1][1]];
    const wrapper = mount(SelectedCocktails);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('changes button text depending of page', async () => {
    cocktailStore.selection.push(testCocktails[1][1]);
    const wrapper = mount(SelectedCocktails);
    expect(wrapper.findByTestId('selected-cocktails__action-button').text()).toBe(
      'Ready? Proceed to instructions.',
    );
    await router.push('/instructions');
    expect(wrapper.findByTestId('selected-cocktails__action-button').text()).toBe(
      'Thirsty? Return to search.',
    );
  });
});

describe('SelectedCocktailsMobile', () => {
  let cocktailStore: ReturnType<typeof useCocktailStore>;

  beforeEach(async () => {
    cocktailStore = useCocktailStore();
    await router.push('/search');
  });

  it('mounts', () => {
    cocktailStore.selection.push(testCocktails[0][1]);
    const wrapper = mount(SelectedCocktailsMobile);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('prints selection data', async () => {
    cocktailStore.selection = [testCocktails[0][1], testCocktails[1][1]];
    const wrapper = mount(SelectedCocktailsMobile);
    await wrapper.find('.selected-cocktails__mobile-button').trigger('click');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
