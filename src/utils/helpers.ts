import type {
  SearchResultAPIDrink,
  FullDetailsAPIDrink,
  SearchResultDrink,
  FullDetailsDrink,
  Ingredient,
} from '@/utils/types';
import {BLACKLIST, REPLACED_INGREDIENTS} from '@/utils/constants';

export const transformSearchResults = (drinks: SearchResultAPIDrink[]) =>
  (drinks || [])
    .filter(({idDrink}) => !BLACKLIST.includes(+idDrink))
    .map<SearchResultDrink>(({idDrink, strDrink, strDrinkThumb}) => ({
      id: +idDrink,
      name: strDrink,
      thumb: strDrinkThumb,
    }));

export const transformFullDetails = (drinks: FullDetailsAPIDrink[]) =>
  (drinks || [])
    .filter(({idDrink}) => !BLACKLIST.includes(+idDrink))
    .map<FullDetailsDrink>((drink) => {
      // Ingredients are stored in 15 pairs of variables, which we want to go over and in some cases replace
      const ingredients = [] as Ingredient[];
      for (let i = 1; i < 16; i++) {
        let ingredient = (drink[`strIngredient${i}`] || '').trim().toLowerCase();
        if (ingredient) {
          const replaced = REPLACED_INGREDIENTS.find(
            ([original]) => original === ingredient,
          );
          if (replaced) {
            ingredient = replaced[1];
          }
          ingredients.push({ingredient, measure: (drink[`strMeasure${i}`] || '').trim()});
        }
      }

      return {
        id: +drink.idDrink,
        name: drink.strDrink,
        thumb: drink.strDrinkThumb,
        alcoholic: drink.strAlcoholic.toLowerCase() === 'alcoholic',
        glass: drink.strGlass,
        instructions: drink.strInstructions,
        ingredients,
      };
    });
