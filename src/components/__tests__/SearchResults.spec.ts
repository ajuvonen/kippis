import {mount} from '@vue/test-utils';
import {describe, it, expect} from 'vitest';
import type {SearchResultCocktail} from '@/utils/types';
import SearchResults from '@/components/SearchResults.vue';
import SearchResultCard from '@/components/SearchResultCard.vue';

describe('SearchResults.vue', () => {
  it('renders a list of SearchResultCard components', () => {
    const cocktails: SearchResultCocktail[] = [
      {id: 1, name: 'Test Cocktail 1', thumb: 'test-thumb-1'},
      {id: 2, name: 'Test Cocktail 2', thumb: 'test-thumb-2'},
    ];

    const wrapper = mount(SearchResults, {
      props: {
        cocktails,
      },
    });

    const cards = wrapper.findAllComponents(SearchResultCard);
    expect(cards.length).toBe(cocktails.length);

    cards.forEach((card, index) => {
      expect(card.props().cocktail).toEqual(cocktails[index]);
    });
  });

  it('renders no SearchResultCard components when cocktails is empty', () => {
    const wrapper = mount(SearchResults, {
      props: {
        cocktails: [],
      },
    });

    expect(wrapper.findAllComponents(SearchResultCard).length).toBe(0);
  });
});
