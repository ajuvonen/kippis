import {describe, it, expect, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import SelectedCocktails from '@/components/SelectedCocktails.vue';
import {testCocktails} from '@/components/__tests__/mswHandlers';
import {useCocktailStore} from '@/stores/cocktail';
import SearchResultCard from '../SearchResultCard.vue';
import router from '@/router';

describe('SelectedCocktails', () => {
  const cocktailStore = useCocktailStore();

  beforeEach(async () => {
    cocktailStore.$reset();
    await router.push('/search');
  });

  it('mounts', () => {
    cocktailStore.selection = [testCocktails[0][1]]
    const wrapper = mount(SelectedCocktails);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('prints selection data', async () => {
    cocktailStore.selection = [testCocktails[0][1], testCocktails[1][1]];
    const wrapper = mount(SelectedCocktails);
    cocktailStore.selection.forEach((cocktail) => {
      expect(wrapper.findAllComponents(SearchResultCard).some((card) => card.props().cocktail === cocktail)).toBe(true);
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('changes button text in ingredient mode', async () => {
    cocktailStore.selection = [testCocktails[1][1]];
    const wrapper = mount(SelectedCocktails);
    expect(wrapper.findByTestId('selected-cocktails__action-button').text()).toBe('Ready? Proceed to ingredients.');
    await router.push('/ingredients');
    expect(wrapper.findByTestId('selected-cocktails__action-button').text()).toBe('Thirsty? Return to search.');
  });
});
