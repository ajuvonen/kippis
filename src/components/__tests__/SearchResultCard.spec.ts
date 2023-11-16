import {mount} from '@vue/test-utils';
import {describe, it, expect, vi} from 'vitest';
import SearchResultCard from '@/components/SearchResultCard.vue';
import type {SearchResultCocktail} from '@/utils/types';

describe('SearchResultCard.vue', () => {
  const cocktail: SearchResultCocktail = {
    id: 1,
    name: 'Test Cocktail',
    thumb: 'test-thumb',
  };

  it('mounts', () => {
    const wrapper = mount(SearchResultCard, {
      props: {
        cocktail,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('calls openCocktailModal when the image wrapper is clicked', async () => {
    const openCocktailModal = vi.fn();
    const wrapper = mount(SearchResultCard, {
      props: {
        cocktail,
      },
      global: {
        mocks: {
          openCocktailModal,
        },
      },
    });

    await wrapper.find('.search-result__image-wrapper').trigger('click');
    expect(openCocktailModal).toHaveBeenCalledWith(1);
  });

  it('calls openCocktailModal when the image wrapper is focused and Enter is pressed', async () => {
    const openCocktailModal = vi.fn();
    const wrapper = mount(SearchResultCard, {
      props: {
        cocktail,
      },
      global: {
        mocks: {
          openCocktailModal,
        },
      },
    });

    const imageWrapper = wrapper.find('.search-result__image-wrapper');
    await imageWrapper.trigger('focus');
    await imageWrapper.trigger('keypress.enter');
    expect(openCocktailModal).toHaveBeenCalledWith(1);
  });
});
