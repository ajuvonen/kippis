import {HttpResponse, http} from 'msw';
import type {FullDetailsAPICocktail, FullDetailsCocktail} from '@/utils/types';

export const testCocktails = [
  [
    {
      idDrink: '0',
      strDrink: 'Margarita',
      strAlcoholic: 'Alcoholic',
      strInstructions: 'Rub the rim of the glass with the lime slice to make the salt stick to it.',
      strDrinkThumb: 'https://locahost:3000/1.jpg',
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
