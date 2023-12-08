import type {
  FullDetailsAPICocktail,
  FullDetailsCocktail,
  Ingredient,
  SearchResultAPICocktail,
  SearchResultCocktail,
} from '@/utils/types';
import {BLACKLIST, REPLACED_INGREDIENTS} from '@/utils/constants';
import {pipe, filter, map, prop, sortBy, uniqBy, flatten, uniq, difference, sort} from 'remeda';

/**
 * Transforms search results from the API into a standardized format.
 * @param cocktails - The search results from the API.
 * @returns The transformed search results.
 */
export const transformSearchResults = (
  cocktails: SearchResultAPICocktail[] | null,
): SearchResultCocktail[] =>
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

/**
 * Transforms an array of full details objects from API into a standardized format.
 * @param cocktails - An array of FullDetailsAPICocktail objects.
 * @returns An array of FullDetailsCocktail objects.
 */
export const transformFullDetails = (
  cocktails: FullDetailsAPICocktail[] | null,
): FullDetailsCocktail[] =>
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

/**
 * Returns a list of unique ingredients from an array of cocktails.
 * @param cocktails - An array of cocktails.
 * @returns An array of unique ingredients.
 */
export const listUniqueIngredients = (cocktails: FullDetailsCocktail[]): string[] =>
  pipe(
    cocktails,
    map(({ingredients}) =>
      // Make cream, egg, olive, and citrus fruits show up as their base form
      ingredients.map(({ingredient}) =>
        ingredient.replace(/^whipped | peel$| spiral$| white$| yolk$| brine$/, ''),
      ),
    ),
    flatten(),
    uniq(),
    difference(['water', 'ice']),
    sort((a, b) => a.localeCompare(b)),
  );

/**
 * Joins the ingredients by combining the measure and ingredient name.
 * @param ingredients - An array of Ingredient objects.
 * @returns An array of strings representing the joined ingredients.
 */
export const joinIngredients = (ingredients: Ingredient[] | undefined) =>
  (ingredients || []).map(({ingredient, measure}) => [measure, ingredient].filter(Boolean).join(' '));

/**
 * Generates a random degree value between -4 and 4.
 * @returns {number} The random degree value.
 */
export const randomDegree = (): number => Math.floor(Math.random() * 9) - 4;
