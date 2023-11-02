export type SearchResultAPIDrink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export type SearchResultDrink = {
  id: number;
  name: string;
  thumb: string;
};

export type FullDetailsAPIDrink = SearchResultAPIDrink & {
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  [other: `strIngredient${number}`]: string | null | undefined;
  [other: `strMeasure${number}`]: string | null | undefined;
};

export type Ingredient = {
  ingredient: string;
  measure: string;
};

export type FullDetailsDrink = SearchResultDrink & {
  alcoholic: boolean;
  glass: string;
  ingredients: Ingredient[];
  instructions: string;
};

export type MainPhoto = {
  file: string;
  link: string;
  acknowledgement: string;
};

export type SearchStringProps = {
  searchString?: string;
  tag?: string;
};
