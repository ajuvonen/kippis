import type {SearchResultAPIDrink, FullDetailsAPIDrink, SearchResultDrink, FullDetailsDrink} from './types';

export const transformSearchResults = (drinks: SearchResultAPIDrink[]) =>
  drinks.map<SearchResultDrink>(({idDrink, strDrink, strDrinkThumb}) => ({
    id: +idDrink,
    name: strDrink,
    thumb: strDrinkThumb,
  }));

export const transformFullDetails = (drinks: FullDetailsAPIDrink[]) =>
  drinks.map<FullDetailsDrink>((drink) => ({
    id: +drink.idDrink,
    name: drink.strDrink,
    thumb: drink.strDrinkThumb,
    alcoholic: drink.strAlcoholic.toLowerCase() === 'alcoholic',
    glass: drink.strGlass,
    instructions: drink.strInstructions,
    ingredients: []
  }));
