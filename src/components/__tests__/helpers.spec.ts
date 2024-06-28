import {
  convertMeasure,
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
      {ingredient: 'scotch', measure: '3 CL'},
      {ingredient: 'bourbon', measure: '6 CL'},
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
      {ingredient: 'ingredient with extra spaces', measure: '3 CL'},
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

describe('convertMeasure', () => {
  it('handles numbers correctly', () => {
    // Fractions without unit conversion are not converted to decimals
    expect(convertMeasure('1/4')).toBe('1/4');
    expect(convertMeasure('2/3')).toBe('2/3');
  
    // Fractions with unit conversion are converted to decimals
    expect(convertMeasure('1/4 cup')).toBe('6 CL');

    // Fractions with whole numbers are converted to decimals
    expect(convertMeasure('1 1/2')).toBe('1.5');
    expect(convertMeasure('1 1/4')).toBe('1.25');
    expect(convertMeasure('5 1/3')).toBe((5 + 1/3).toString());
    expect(convertMeasure('10 2/3')).toBe((10 + 2/3).toString());
    expect(convertMeasure('3 3/4')).toBe('3.75');

    // Whole numbers remain as they are
    expect(convertMeasure('0')).toBe('0');
    expect(convertMeasure('1')).toBe('1');
    expect(convertMeasure('10')).toBe('10');
  });

  it('converts ounces, shots and jiggers to CL', () => {
    expect(convertMeasure('1 ounce')).toBe('3 CL');
    expect(convertMeasure('1 jigger')).toBe('3 CL');
    expect(convertMeasure('2 shots')).toBe('6 CL');
    expect(convertMeasure('2 1/2 oz')).toBe('7 CL');
    expect(convertMeasure('3 OZ')).toBe('9 CL');
    expect(convertMeasure('10 ounces')).toBe('30 CL');
  });

  it('converts quarts to L', () => {
    expect(convertMeasure('1 quart')).toBe('1 L');
    expect(convertMeasure('2 qt')).toBe('1.9 L');
    expect(convertMeasure('2 1/2 QT')).toBe('2.4 L');
    expect(convertMeasure('3 quarts')).toBe('2.9 L');
  });

  it('converts cups to CL', () => {
    expect(convertMeasure('1 cup')).toBe('24 CL');
    expect(convertMeasure('2 CUPS')).toBe('47 CL');
  });

  it('converts fifths to L', () => {
    expect(convertMeasure('1 fifth')).toBe('0.75 L');
    expect(convertMeasure('2 FIFTHS')).toBe('1.5 L');
  });

  it('converts gallons to L', () => {
    expect(convertMeasure('1 gal')).toBe('3.8 L');
    expect(convertMeasure('1/2 GALLONS')).toBe('1.9 L');
  });

  it('converts mls to CL', () => {
    expect(convertMeasure('20 ML')).toBe('2 CL');
    expect(convertMeasure('355 mls')).toBe('36 CL');
  });
  
  it('converts lbs to GR', () => {
    expect(convertMeasure('1 LB')).toBe('450 GR');
    expect(convertMeasure('0.5 pounds')).toBe('225 GR');
    expect(convertMeasure('2/3 lbs')).toBe('300 GR');
  });

  it('does not convert units that are not oz, qt or cups', () => {
    [
      ['', ''],
      ['1 tsp', '1 tsp'],
      ['1/2 tsp', '1/2 tsp'],
      ['1 tbsp', '1 tbsp'],
      ['1 3/4 tblsp', '1.75 tblsp'],
      ['dash', 'dash'],
      ['0.5 kg frozen', '0.5 kg frozen'],
    ].forEach(([input, output]) => {
      expect(convertMeasure(input)).toBe(output);
    });
  });

  it('does not convert too small fractions', () => {
    expect(convertMeasure('1/8')).toBe('1/8');
    expect(convertMeasure('1/6')).toBe('1/6');
    expect(convertMeasure('1/5')).toBe('1/5');
  });
});
