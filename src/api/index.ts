import axios from 'axios';
import {prop, sortBy} from 'ramda';
import {BASE_API_ADDRESS} from '@/utils/constants';
import {transformDrinks} from '@/utils/helpers';

export const getByIngredients = async (ingredients: string[]) => {
  const drinks = await Promise.all(
    ingredients.map((ingredient) =>
      axios
        .get(`${BASE_API_ADDRESS}/filter.php?i=${ingredient}`)
        .then(({data: {drinks}}) => transformDrinks(drinks)),
    ),
  );
  return sortBy(
    prop('name'),
    drinks.reduce((previous, current) => {
      return [...previous, ...current];
    }, []),
  );
};

export const getBySearchString = async (searchString: string) => {
  const drinks = await axios
    .get(`${BASE_API_ADDRESS}/search.php?s=${searchString}`)
    .then(({data: {drinks}}) => transformDrinks(drinks));

  return sortBy(prop('name'), drinks);
};

export const getNonAlcoholic = () =>
  axios
    .get(`${BASE_API_ADDRESS}/filter.php?a=Non_Alcoholic`)
    .then(({data: {drinks}}) => transformDrinks(drinks));
