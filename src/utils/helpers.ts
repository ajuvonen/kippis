import type {
  SearchResultAPICocktail,
  FullDetailsAPICocktail,
  SearchResultCocktail,
  FullDetailsCocktail,
  Ingredient,
} from '@/utils/types';
import {BLACKLIST, REPLACED_INGREDIENTS} from '@/utils/constants';
import {pipe, filter, map, prop, sortBy, uniqBy} from 'remeda';

export const transformSearchResults = (cocktails: SearchResultAPICocktail[]): SearchResultCocktail[] =>
  pipe(
    cocktails || [],
    uniqBy(prop('idDrink')),
    filter(({idDrink}) => !BLACKLIST.includes(+idDrink)),
    map(({idDrink, strDrink, strDrinkThumb}) => ({
      id: +idDrink,
      name: strDrink,
      thumb: strDrinkThumb,
    })),
    sortBy(prop('name')),
  );

export const transformFullDetails = (cocktails: FullDetailsAPICocktail[]): FullDetailsCocktail[] =>
  pipe(
    cocktails || [],
    uniqBy(prop('idDrink')),
    filter(({idDrink}) => !BLACKLIST.includes(+idDrink)),
    map((cocktail: FullDetailsAPICocktail) => {
      // Ingredients are stored in 15 pairs of variables, which we want to go over and in some cases replace
      const ingredients = [] as Ingredient[];
      for (let i = 1; i < 16; i++) {
        let ingredient = (cocktail[`strIngredient${i}`] || '').trim().toLowerCase();
        if (ingredient) {
          const replaced = REPLACED_INGREDIENTS.find(([original]) => original === ingredient);
          if (replaced) {
            ingredient = replaced[1];
          }
          ingredients.push({ingredient, measure: (cocktail[`strMeasure${i}`] || '').trim()});
        }
      }
      
      return {
        id: +cocktail.idDrink,
        name: cocktail.strDrink,
        thumb: cocktail.strDrinkThumb,
        alcoholic: cocktail.strAlcoholic.toLowerCase() === 'alcoholic',
        instructions: cocktail.strInstructions,
        ingredients,
      };
    }),
    sortBy(prop('name')),
  );
