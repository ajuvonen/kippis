import {describe, it, expect, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import SelectedCocktails from '@/components/SelectedCocktails.vue';
import {testCocktails} from '@/components/__tests__/mswHandlers';
import {useCocktailStore} from '@/stores/cocktail';
import router from '@/router';

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

  it('changes button text in ingredient mode', async () => {
    cocktailStore.selection.push(testCocktails[1][1]);
    const wrapper = mount(SelectedCocktails);
    expect(wrapper.findByTestId('selected-cocktails__action-button').text()).toBe(
      'Ready? Proceed to ingredients.',
    );
    await router.push('/ingredients');
    expect(wrapper.findByTestId('selected-cocktails__action-button').text()).toBe(
      'Thirsty? Return to search.',
    );
  });
});
