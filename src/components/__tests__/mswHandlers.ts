import {HttpResponse, http} from 'msw';
import type {
  FullDetailsAPICocktail,
  FullDetailsCocktail,
  SearchResultAPICocktail,
  SearchResultCocktail,
} from '@/utils/types';

export const testSearchResults = [
  [
    {
      idDrink: '0',
      strDrink: 'Margarita',
      strDrinkThumb: 'https://locahost:3000/0.jpg',
    },
    {
      id: 0,
      name: 'Margarita',
      thumb: 'https://locahost:3000/0.jpg',
    },
  ],
  [
    {
      idDrink: '1',
      strDrink: 'Tom Collins',
      strDrinkThumb: 'https://locahost:3000/1.jpg',
    },
    {
      id: 1,
      name: 'Tom Collins',
      thumb: 'https://locahost:3000/1.jpg',
    },
  ],
] as [SearchResultAPICocktail, SearchResultCocktail][];

export const testCocktails = [
  [
    {
      idDrink: '0',
      strDrink: 'Margarita',
      strAlcoholic: 'Alcoholic',
      strInstructions: 'Rub the rim of the glass with the lime slice to make the salt stick to it.',
      strDrinkThumb: 'https://locahost:3000/0.jpg',
      strIngredient1: 'Tequila',
      strIngredient2: 'Triple sec',
      strIngredient3: 'Lime juice',
      strIngredient4: 'Salt',
      strIngredient5: '',
      strIngredient6: '',
      strMeasure1: '1 oz',
      strMeasure2: '1/2 oz',
      strMeasure3: '1 oz',
      strMeasure4: '',
      strMeasure5: '',
      strMeasure6: '',
    },
    {
      id: 0,
      alcoholic: true,
      ingredients: [
        {
          ingredient: 'tequila',
          measure: '1 oz',
        },
        {
          ingredient: 'triple sec',
          measure: '1/2 oz',
        },
        {
          ingredient: 'lime juice',
          measure: '1 oz',
        },
        {
          ingredient: 'salt',
          measure: '',
        },
      ],
      instructions: 'Rub the rim of the glass with the lime slice to make the salt stick to it.',
      name: 'Margarita',
      thumb: 'https://locahost:3000/0.jpg',
    },
  ],
  [
    {
      idDrink: '1',
      strDrink: 'Virgin Mojito',
      strAlcoholic: 'Non_Alcoholic',
      strInstructions:
        'Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice.',
      strDrinkThumb: 'https://locahost:3000/1.jpg',
      strIngredient1: 'Lime',
      strIngredient2: 'Sugar',
      strIngredient3: 'Mint',
      strIngredient4: 'Soda water',
      strIngredient5: '',
      strMeasure1: 'Juice of 1',
      strMeasure2: '2 tsp',
      strMeasure3: '2-4',
      strMeasure4: '2 oz',
      strMeasure5: '',
    },
    {
      id: 1,
      alcoholic: false,
      ingredients: [
        {
          ingredient: 'lime',
          measure: 'Juice of 1',
        },
        {
          ingredient: 'sugar',
          measure: '2 tsp',
        },
        {
          ingredient: 'mint',
          measure: '2-4',
        },
        {
          ingredient: 'soda water',
          measure: '2 oz',
        },
      ],
      instructions:
        'Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice.',
      name: 'Mojito',
      thumb: 'https://locahost:3000/1.jpg',
    },
  ],
] as [FullDetailsAPICocktail, FullDetailsCocktail][];

export const restHandlers = [
  http.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php', ({request}) => {
    const url = new URL(request.url);
    const id = +(url.searchParams.get('i') || -1);
    const cocktail = testCocktails[id];
    // Valid query
    if (cocktail) {
      return HttpResponse.json({
        drinks: [cocktail[0]],
      });
      // Missing id
    } else if (id > 0) {
      return HttpResponse.json({drinks: null});
    }
    // Failing query
    return new HttpResponse(null, {status: 404});
  }),
];
