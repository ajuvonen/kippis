import axios from 'axios';
import {prop, sortBy, compose, uniqBy} from 'ramda';
import {BASE_API_ADDRESS} from '@/utils/constants';
import {transformSearchResults, transformFullDetails} from '@/utils/helpers';
import type {SearchResultAPIDrink, FullDetailsAPIDrink} from '@/utils/types';

export const getByFirstLetter = (searchString: string) =>
  axios
    .get(`${BASE_API_ADDRESS}/search.php?f=${searchString}`)
    .then(({data: {drinks}}: {data: {drinks: SearchResultAPIDrink[]}}) =>
      transformSearchResults(drinks),
    );

export const getByIngredients = async (ingredients: string[]) => {
  const drinks = await Promise.all(
    ingredients.map((ingredient) =>
      axios
        .get(`${BASE_API_ADDRESS}/filter.php?i=${ingredient}`)
        .then(({data: {drinks}}: {data: {drinks: SearchResultAPIDrink[]}}) =>
          transformSearchResults(drinks),
        ),
    ),
  );
  return compose(
    sortBy(prop('name')),
    uniqBy(prop('id')),
  )(
    drinks.reduce((previous, current) => {
      return [...previous, ...current];
    }, []),
  );
};

export const getBySearchString = async (searchString: string) => {
  const drinks = await axios
    .get(`${BASE_API_ADDRESS}/search.php?s=${searchString}`)
    .then(({data: {drinks}}: {data: {drinks: SearchResultAPIDrink[]}}) =>
      transformSearchResults(drinks),
    );

  return sortBy(prop('name'), drinks);
};

export const getDetails = (id: number) =>
  axios
    .get(`${BASE_API_ADDRESS}/lookup.php?i=${id}`)
    .then(
      ({data: {drinks}}: {data: {drinks: FullDetailsAPIDrink[]}}) =>
        transformFullDetails(drinks)[0],
    );

export const getNonAlcoholic = () =>
  axios
    .get(`${BASE_API_ADDRESS}/filter.php?a=Non_Alcoholic`)
    .then(({data: {drinks}}: {data: {drinks: SearchResultAPIDrink[]}}) =>
      transformSearchResults(drinks),
    );
