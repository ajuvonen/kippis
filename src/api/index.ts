import axios from 'axios';
import {prop, sortBy, compose, uniqBy, flatten} from 'ramda';
import {BASE_API_ADDRESS} from '@/utils/constants';
import {transformSearchResults, transformFullDetails} from '@/utils/helpers';
import type {SearchResultAPICocktail, FullDetailsAPICocktail, SearchResultCocktail} from '@/utils/types';

export const getByFirstLetter = (searchString: string) =>
  axios
    .get(`${BASE_API_ADDRESS}/search.php?f=${searchString}`)
    .then(({data: {drinks}}: {data: {drinks: SearchResultAPICocktail[]}}) =>
      transformSearchResults(drinks),
    );

export const getByIngredients = async (ingredients: string[]) => {
  const cocktails = await Promise.all(
    ingredients.map((ingredient) =>
      axios
        .get(`${BASE_API_ADDRESS}/filter.php?i=${ingredient}`)
        .then(({data: {drinks}}: {data: {drinks: SearchResultAPICocktail[]}}) =>
          transformSearchResults(drinks),
        ),
    ),
  );

  return compose(
    sortBy(prop('name')),
    uniqBy(prop('id')),
    flatten<SearchResultCocktail[][]>,
  )(cocktails);
};

export const getBySearchString = (searchString: string) =>
  axios
    .get(`${BASE_API_ADDRESS}/search.php?s=${searchString}`)
    .then(({data: {drinks}}: {data: {drinks: SearchResultAPICocktail[]}}) =>
      sortBy(prop('name'), transformSearchResults(drinks)),
    );

export const getDetails = (id: number) =>
  axios
    .get(`${BASE_API_ADDRESS}/lookup.php?i=${id}`)
    .then(
      ({data: {drinks}}: {data: {drinks: FullDetailsAPICocktail[]}}) =>
        transformFullDetails(drinks)[0],
    );

export const getNonAlcoholic = () =>
  axios
    .get(`${BASE_API_ADDRESS}/filter.php?a=Non_Alcoholic`)
    .then(({data: {drinks}}: {data: {drinks: SearchResultAPICocktail[]}}) =>
      transformSearchResults(drinks),
    );
