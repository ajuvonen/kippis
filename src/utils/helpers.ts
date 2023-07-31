import type {APIDrink, SearchResultDrink} from './types';

export const transformDrinks = (drinks: APIDrink[]) =>
  drinks.map<SearchResultDrink>(({idDrink, strDrink, strDrinkThumb}) => ({
    id: +idDrink,
    name: strDrink,
    thumb: strDrinkThumb,
  }));
