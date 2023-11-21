import {mount} from '@vue/test-utils';
import {describe, it, expect, beforeEach} from 'vitest';
import ActionButtons from '@/components/ActionButtons.vue';
import { useCocktailStore } from '@/stores/cocktail';

const testCocktail = {
  id: 1,
  name: 'Test Cocktail',
  ingredients: [],
  instructions: '',
  thumb: '',
  alcoholic: false,
  glass: '',
};

describe('ActionButtons', () => {
  const cocktailStore = useCocktailStore();

  beforeEach(() => {
    cocktailStore.$reset();
  });

  it('mounts', () => {
    const wrapper = mount(ActionButtons, {props: {cocktail: {
      id: 1,
      name: 'Gin Tonic',
      thumb: '',
    }}});
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('shows remove button', () => {
    cocktailStore.selection.push(testCocktail);
    const wrapper = mount(ActionButtons, {props: {cocktail: {
      id: 1,
      name: 'Test Cocktail',
      thumb: '',
    }}});
    expect(wrapper.findByTestId('remove-cocktail-1').exists()).toBe(true);
  });

  it('add button works', () => {
    const wrapper = mount(ActionButtons, {props: {cocktail: {
      id: 1,
      name: 'Gin Tonic',
      thumb: '',
    }}});
    wrapper.findByTestId('add-cocktail-1').trigger('click');
    expect(cocktailStore.addToSelection).toHaveBeenCalledWith(1);
  });

  it('remove button works', () => {
    cocktailStore.selection.push(testCocktail);
    const wrapper = mount(ActionButtons, {props: {cocktail: {
      id: 1,
      name: 'Gin Tonic',
      thumb: '',
    }}});
    wrapper.findByTestId('remove-cocktail-1').trigger('click');
    expect(cocktailStore.removeFromSelection).toHaveBeenCalledWith(1);
  });
});
