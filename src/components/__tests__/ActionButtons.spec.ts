import {mount} from '@vue/test-utils';
import {describe, it, expect, beforeEach} from 'vitest';
import ActionButtons from '@/components/ActionButtons.vue';
import {useCocktailStore} from '@/stores/cocktail';
import {testCocktails, testSearchResults} from '@/components/__tests__/mswHandlers';

describe('ActionButtons', () => {
  const cocktailStore = useCocktailStore();

  beforeEach(() => {
    cocktailStore.$reset();
  });

  it('mounts', () => {
    const wrapper = mount(ActionButtons, {
      props: {
        cocktail: testSearchResults[0][1],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('shows remove button', () => {
    cocktailStore.selection.push(testCocktails[0][1]);
    const wrapper = mount(ActionButtons, {
      props: {
        cocktail: testSearchResults[0][1],
      },
    });
    expect(wrapper.find('.remove-cocktail-0').exists()).toBe(true);
  });

  it('add button works', async () => {
    const wrapper = mount(ActionButtons, {
      props: {
        cocktail: testSearchResults[1][1],
      },
    });
    await wrapper.find('.add-cocktail-1').trigger('click');
    expect(cocktailStore.addToSelection).toHaveBeenCalledWith(1);
  });

  it('remove button works', async () => {
    cocktailStore.selection.push(testCocktails[0][1]);
    const wrapper = mount(ActionButtons, {
      props: {
        cocktail: testSearchResults[0][1],
      },
    });
    await wrapper.find('.remove-cocktail-0').trigger('click');
    expect(cocktailStore.removeFromSelection).toHaveBeenCalledWith(0);
  });
});
