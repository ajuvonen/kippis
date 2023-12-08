import {
  joinIngredients,
  listUniqueIngredients,
  randomDegree,
  transformFullDetails,
  transformSearchResults,
} from '@/utils/helpers';
import type {FullDetailsAPICocktail} from '@/utils/types';
import {describe, it, expect} from 'vitest';
import {testCocktails, testSearchResults} from '@/components/__tests__/mswHandlers';

describe('transformSearchResults', () => {
  it('transforms API cocktails to SearchResultCocktail objects', () => {
    const result = transformSearchResults([testSearchResults[0][0], testSearchResults[1][0]]);
    expect(result).toEqual([testSearchResults[0][1], testSearchResults[1][1]]);
  });

  it('filters out cocktails in the blacklist', () => {
    const cocktails = [
      {idDrink: '12572', strDrink: 'Test Cocktail 1', strDrinkThumb: 'thumb1'},
      {idDrink: '12784', strDrink: 'Test Cocktail 2', strDrinkThumb: 'thumb2'},
      testSearchResults[0][0],
    ];

    const result = transformSearchResults(cocktails);
    expect(result).toEqual([testSearchResults[0][1]]);
  });

  it('sorts the search results by name', () => {
    const result = transformSearchResults([testSearchResults[1][0], testSearchResults[0][0]]);
    expect(result).toEqual([testSearchResults[0][1], testSearchResults[1][1]]);
  });

  it('returns unique search results', () => {
    const result = transformSearchResults([
      testSearchResults[0][0],
      testSearchResults[0][0],
      testSearchResults[1][0],
    ]);

    expect(result).toEqual([testSearchResults[0][1], testSearchResults[1][1]]);
  });

  it('returns an empty array when cocktails is empty, null or undefined', () => {
    expect(transformSearchResults([])).toEqual([]);
    expect(transformSearchResults(null!)).toEqual([]);
    expect(transformSearchResults(undefined!)).toEqual([]);
  });
});

describe('transformFullDetails', () => {
  it('transforms API cocktail details to FullDetailsCocktail object', () => {
    const result = transformFullDetails([testCocktails[0][0]]);
    expect(result).toEqual([testCocktails[0][1]]);
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
      },
    ];

    const result = transformFullDetails(cocktailDetails);

    expect(result[0].ingredients).toEqual([
      {ingredient: 'ingredient with extra spaces', measure: '1 oz'},
    ]);
  });

  it('transforms the alcoholic property correctly', () => {
    const result = transformFullDetails([testCocktails[0][0], testCocktails[1][0]]);

    expect(result[0].alcoholic).toBe(true);
    expect(result[1].alcoholic).toBe(false);
  });

  it('excludes empty and null ingredients', () => {
    const cocktailDetails: FullDetailsAPICocktail[] = [
      {
        idDrink: '1',
        strDrink: 'Test Cocktail',
        strDrinkThumb: 'thumb',
        strInstructions: 'Test Instructions',
        strIngredient1: '',
        strMeasure1: '1 oz',
        strIngredient2: null,
        strMeasure2: '2 oz',
        strAlcoholic: 'Alcoholic',
      },
    ];

    const result = transformFullDetails(cocktailDetails);

    expect(result[0].ingredients).toEqual([]);
  });

  it('returns an empty array when cocktailDetails is empty, null or undefined', () => {
    expect(transformFullDetails([])).toEqual([]);
    expect(transformFullDetails(null!)).toEqual([]);
    expect(transformFullDetails(undefined!)).toEqual([]);
  });
});

describe('listUniqueIngredients', () => {
  it('returns alphabetic ingredients from the given cocktails', () => {
    const result = listUniqueIngredients([testCocktails[0][1], testCocktails[1][1]]);
    expect(result).toEqual([
      'lime',
      'lime juice',
      'mint',
      'salt',
      'soda water',
      'sugar',
      'tequila',
      'triple sec',
    ]);
  });

  it('removes duplicates', () => {
    const result = listUniqueIngredients([testCocktails[0][1], testCocktails[0][1]]);
    expect(result).toEqual(['lime juice', 'salt', 'tequila', 'triple sec']);
  });

  it('returns an empty array if no ingredients are provided', () => {
    const result = listUniqueIngredients([]);
    expect(result).toEqual([]);
  });

  it('removes water and ice', () => {
    const result = listUniqueIngredients([
      {
        id: 0,
        alcoholic: false,
        ingredients: [
          {
            ingredient: 'water',
            measure: '',
          },
          {
            ingredient: 'ice',
            measure: '',
          },
        ],
        instructions: 'Pour water over ice',
        name: 'Glass of water',
        thumb: 'thumb',
      },
    ]);
    expect(result).toEqual([]);
  });

  it('lists egg, cream and citrus fruits in their base form', () => {
    const result = listUniqueIngredients([
      {
        id: 0,
        alcoholic: false,
        ingredients: [
          {
            ingredient: 'egg white',
            measure: '1 pc',
          },
          {
            ingredient: 'egg yolk',
            measure: '1 pc',
          },
          {
            ingredient: 'lemon peel',
            measure: '',
          },
          {
            ingredient: 'orange spiral',
            measure: '',
          },
          {
            ingredient: 'olive brine',
            measure: '1/2 oz',
          },
          {
            ingredient: 'whipped cream',
            measure: '1 oz',
          },
        ],
        instructions: 'Mix in blender',
        name: 'Winners breakfast',
        thumb: 'thumb',
      },
    ]);
    expect(result).toEqual(['cream', 'egg', 'lemon', 'olive', 'orange']);
  });
});

describe('joinIngredients', () => {
  it('should join ingredients with their measures', () => {
    const ingredients = [
      {ingredient: 'Vodka', measure: '2 oz'},
      {ingredient: 'Orange juice', measure: '4 oz'},
      {ingredient: 'Grenadine', measure: '1 oz'},
    ];

    const result = joinIngredients(ingredients);

    expect(result).toEqual(['2 oz Vodka', '4 oz Orange juice', '1 oz Grenadine']);
  });

  it('should not add space if there is no measure', () => {
    const ingredients = [{ingredient: 'Vodka', measure: ''}];

    const result = joinIngredients(ingredients);

    expect(result).toEqual(['Vodka']);
  });

  it('should handle undefined ingredients', () => {
    const result = joinIngredients(undefined);

    expect(result).toEqual([]);
  });

  it('should handle empty ingredients array', () => {
    const result = joinIngredients([]);

    expect(result).toEqual([]);
  });
});

describe('randomDegree', () => {
  it('generates numbers between -4 and 4', () => {
    const degrees = Array.from({length: 20}, randomDegree);

    expect(degrees.every((degree) => degree >= -4 && degree <= 4)).toBe(true);
  });
});
