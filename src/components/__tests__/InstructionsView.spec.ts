import {describe, it, expect, beforeEach, vi, afterAll, beforeAll} from 'vitest';
import {mount} from '@vue/test-utils';
import {useCocktailStore} from '@/stores/cocktail';
import InstructionsView from '@/views/InstructionsView.vue';
import {testCocktails} from '@/components/__tests__/mswHandlers';

describe('InstructionsView', () => {
  let cocktailStore: ReturnType<typeof useCocktailStore>;

  beforeAll(() => {
    vi.mock('@/utils/helpers', async (importOriginal) => {
      const helpers = await importOriginal<typeof import('@/utils/helpers')>();
      return {
        ...helpers,
        randomDegree: () => 0,
      };
    });
  });

  beforeEach(() => {
    cocktailStore = useCocktailStore();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('mounts', () => {
    const wrapper = mount(InstructionsView);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('displays the side bar', () => {
    cocktailStore.selection.push(testCocktails[0][1]);
    const wrapper = mount(InstructionsView);
    expect(wrapper.find('.selected-cocktails').exists()).toBe(true);
  });

  it('displays the instructions', () => {
    cocktailStore.selection.push(testCocktails[0][1], testCocktails[1][1]);
    const wrapper = mount(InstructionsView);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
