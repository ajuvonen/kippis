// FILEPATH: /c:/Sources/Personal/tailwind/src/utils/__tests__/helpers.spec.ts

import {transformFullDetails, transformSearchResults} from '@/utils/helpers';
import type {FullDetailsAPICocktail} from '@/utils/types';
import {describe, it, expect} from 'vitest';

describe('transformSearchResults', () => {
  it('transforms API cocktails to SearchResultCocktail objects', () => {
    const cocktails = [
      {idDrink: '1', strDrink: 'Test Cocktail 1', strDrinkThumb: 'thumb1'},
      {idDrink: '2', strDrink: 'Test Cocktail 2', strDrinkThumb: 'thumb2'},
    ];

    const result = transformSearchResults(cocktails);

    expect(result).toEqual([
      {id: 1, name: 'Test Cocktail 1', thumb: 'thumb1'},
      {id: 2, name: 'Test Cocktail 2', thumb: 'thumb2'},
    ]);
  });

  it('filters out cocktails in the blacklist', () => {
    const cocktails = [
      {idDrink: '12572', strDrink: 'Test Cocktail 1', strDrinkThumb: 'thumb1'},
      {idDrink: '12784', strDrink: 'Test Cocktail 2', strDrinkThumb: 'thumb2'},
      {idDrink: '2', strDrink: 'Test Cocktail 3', strDrinkThumb: 'thumb3'},
    ];

    const result = transformSearchResults(cocktails);

    expect(result).toEqual([{id: 2, name: 'Test Cocktail 3', thumb: 'thumb3'}]);
  });

  it('sorts the search results by name', () => {
    const cocktails = [
      {idDrink: '2', strDrink: 'Test Cocktail 2', strDrinkThumb: 'thumb2'},
      {idDrink: '1', strDrink: 'Test Cocktail 1', strDrinkThumb: 'thumb1'},
    ];

    const result = transformSearchResults(cocktails);

    expect(result).toEqual([
      {id: 1, name: 'Test Cocktail 1', thumb: 'thumb1'},
      {id: 2, name: 'Test Cocktail 2', thumb: 'thumb2'},
    ]);
  });

  it('returns unique search results', () => {
    const cocktails = [
      {idDrink: '1', strDrink: 'Test Cocktail 1', strDrinkThumb: 'thumb1'},
      {idDrink: '2', strDrink: 'Test Cocktail 2', strDrinkThumb: 'thumb2'},
      {idDrink: '1', strDrink: 'Test Cocktail 1', strDrinkThumb: 'thumb1'},
    ];

    const result = transformSearchResults(cocktails);

    expect(result).toEqual([
      {id: 1, name: 'Test Cocktail 1', thumb: 'thumb1'},
      {id: 2, name: 'Test Cocktail 2', thumb: 'thumb2'},
    ]);
  });

  it('returns an empty array when cocktails is empty, null or undefined', () => {
    expect(transformSearchResults([])).toEqual([]);
    expect(transformSearchResults(null!)).toEqual([]);
    expect(transformSearchResults(undefined!)).toEqual([]);
  });
});

describe('transformFullDetails', () => {
  it('transforms API cocktail details to FullDetailsCocktail object', () => {
    const cocktailDetails = [
      {
        idDrink: '1',
        strDrink: 'Test Cocktail',
        strDrinkThumb: 'thumb',
        strInstructions: 'Test Instructions',
        strIngredient1: 'Ingredient 1',
        strMeasure1: '1 oz',
        strIngredient2: 'Ingredient 2',
        strMeasure2: '2 oz',
        strIngredient3: null,
        strMeasure3: null,
        strAlcoholic: 'Alcoholic',
        strGlass: 'Cocktail glass',
      },
    ];

    const result = transformFullDetails(cocktailDetails as FullDetailsAPICocktail[]);

    expect(result).toEqual([
      {
        id: 1,
        alcoholic: true,
        glass: 'Cocktail glass',
        name: 'Test Cocktail',
        thumb: 'thumb',
        instructions: 'Test Instructions',
        ingredients: [
          {ingredient: 'ingredient 1', measure: '1 oz'},
          {ingredient: 'ingredient 2', measure: '2 oz'},
        ],
      },
    ]);
  });

  it('replaces ingredients correctly', () => {
    const cocktailDetails: FullDetailsAPICocktail[] = [
      {
        idDrink: '1',
        strDrink: 'Test Cocktail',
        strDrinkThumb: 'thumb',
        strInstructions: 'Test Instructions',
        strIngredient1: 'Johnnie walker',
        strMeasure1: '1 oz',
        strIngredient2: 'Jack Daniels',
        strMeasure2: '2 oz',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Cocktail glass',
      },
    ];

    const result = transformFullDetails(cocktailDetails);

    expect(result[0].ingredients).toEqual([
      {ingredient: 'scotch', measure: '1 oz'},
      {ingredient: 'bourbon', measure: '2 oz'},
    ]);
  });

  it('trims and lowercases ingredients correctly', () => {
    const cocktailDetails: FullDetailsAPICocktail[] = [
      {
        idDrink: '1',
        strDrink: 'Test Cocktail',
        strDrinkThumb: 'thumb',
        strInstructions: 'Test Instructions',
        strIngredient1: ' Ingredient With Extra Spaces ',
        strMeasure1: '1 oz',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Cocktail glass',
      },
    ];

    const result = transformFullDetails(cocktailDetails);

    expect(result[0].ingredients).toEqual([
      {ingredient: 'ingredient with extra spaces', measure: '1 oz'},
    ]);
  });

  it('excludes null ingredients', () => {
    const cocktailDetails: FullDetailsAPICocktail[] = [
      {
        idDrink: '1',
        strDrink: 'Test Cocktail',
        strDrinkThumb: 'thumb',
        strInstructions: 'Test Instructions',
        strIngredient1: 'Ingredient 1',
        strMeasure1: '1 oz',
        strIngredient2: null,
        strMeasure2: '2 oz',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Cocktail glass',
      },
    ];

    const result = transformFullDetails(cocktailDetails);

    expect(result[0].ingredients).toEqual([{ingredient: 'ingredient 1', measure: '1 oz'}]);
  });

  it('returns an empty array when cocktailDetails is empty, null or undefined', () => {
    expect(transformFullDetails([])).toEqual([]);
    expect(transformFullDetails(null!)).toEqual([]);
    expect(transformFullDetails(undefined!)).toEqual([]);
  });
});
