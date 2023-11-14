import type {
  SearchResultAPICocktail,
  FullDetailsAPICocktail,
  SearchResultCocktail,
  FullDetailsCocktail,
  Ingredient,
} from '@/utils/types';
import {BLACKLIST, REPLACED_INGREDIENTS} from '@/utils/constants';

export const transformSearchResults = (cocktails: SearchResultAPICocktail[]) =>
  (cocktails || [])
    .filter(({idDrink}) => !BLACKLIST.includes(+idDrink))
    .map<SearchResultCocktail>(({idDrink, strDrink, strDrinkThumb}) => ({
      id: +idDrink,
      name: strDrink,
      thumb: strDrinkThumb,
    }));

export const transformFullDetails = (cocktails: FullDetailsAPICocktail[]) =>
  (cocktails || [])
    .filter(({idDrink}) => !BLACKLIST.includes(+idDrink))
    .map<FullDetailsCocktail>((cocktail) => {
      // Ingredients are stored in 15 pairs of variables, which we want to go over and in some cases replace
      const ingredients = [] as Ingredient[];
      for (let i = 1; i < 16; i++) {
        let ingredient = (cocktail[`strIngredient${i}`] || '').trim().toLowerCase();
        if (ingredient) {
          const replaced = REPLACED_INGREDIENTS.find(
            ([original]) => original === ingredient,
          );
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
        glass: cocktail.strGlass,
        instructions: cocktail.strInstructions,
        ingredients,
      };
    });
