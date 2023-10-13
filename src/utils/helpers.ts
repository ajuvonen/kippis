import type {
  SearchResultAPIDrink,
  FullDetailsAPIDrink,
  SearchResultDrink,
  FullDetailsDrink,
} from '@/utils/types';
import {BLACKLIST} from '@/utils/constants';

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
    .map<FullDetailsDrink>((drink) => ({
      id: +drink.idDrink,
      name: drink.strDrink,
      thumb: drink.strDrinkThumb,
      alcoholic: drink.strAlcoholic.toLowerCase() === 'alcoholic',
      glass: drink.strGlass,
      instructions: drink.strInstructions,
      ingredients: [],
    }));
