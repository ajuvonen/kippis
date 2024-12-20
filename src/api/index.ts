import axios from 'axios';
import {BASE_API_ADDRESS, REPLACED_INGREDIENTS} from '@/utils/constants';
import {transformSearchResults, transformFullDetails} from '@/utils/helpers';
import type {SearchResultAPICocktail, FullDetailsAPICocktail} from '@/utils/types';

export const getByFirstLetter = (searchString: string) =>
  axios
    .get(`${BASE_API_ADDRESS}/search.php?f=${searchString}`)
    .then(({data: {drinks}}: {data: {drinks: SearchResultAPICocktail[] | null}}) =>
      transformSearchResults(drinks),
    );

export const getByIngredients = async (ingredients: string[]) => {
  const cocktails = await Promise.all(
    ingredients.map((ingredient) =>
      axios
        .get(`${BASE_API_ADDRESS}/filter.php?i=${ingredient}`)
        .then(
          ({data: {drinks}}: {data: {drinks: SearchResultAPICocktail[] | null}}) => drinks || [],
        ),
    ),
  );

  return transformSearchResults(cocktails.flat());
};

export const getBySearchString = async (searchString: string) => {
  const ingredients = REPLACED_INGREDIENTS.filter(([, replacement]) =>
    replacement.includes(searchString.toLocaleLowerCase()),
  )
    .map(([original]) => original)
    .concat([searchString]);

  const cocktails = await Promise.all([
    ...ingredients.map((ingredient) =>
      axios
        .get(`${BASE_API_ADDRESS}/filter.php?i=${ingredient}`)
        .then(
          ({data: {drinks}}: {data: {drinks: SearchResultAPICocktail[] | null}}) => drinks || [],
        ),
    ),
    axios
      .get(`${BASE_API_ADDRESS}/search.php?s=${searchString}`)
      .then(({data: {drinks}}: {data: {drinks: SearchResultAPICocktail[] | null}}) => drinks || []),
  ]);

  return transformSearchResults(cocktails.flat());
};

export const getDetails = (id: number) =>
  axios
    .get(`${BASE_API_ADDRESS}/lookup.php?i=${id}`)
    .then(
      ({data: {drinks}}: {data: {drinks: FullDetailsAPICocktail[] | null}}) =>
        transformFullDetails(drinks)[0] || null,
    );

export const getNonAlcoholic = () =>
  axios
    .get(`${BASE_API_ADDRESS}/filter.php?a=Non_Alcoholic`)
    .then(({data: {drinks}}: {data: {drinks: SearchResultAPICocktail[] | null}}) =>
      transformSearchResults(drinks),
    );

export const getRandomCocktail = () =>
  axios
    .get(`${BASE_API_ADDRESS}/random.php`)
    .then(
      ({data: {drinks}}: {data: {drinks: FullDetailsAPICocktail[] | null}}) =>
        transformFullDetails(drinks)[0] || null,
    );
