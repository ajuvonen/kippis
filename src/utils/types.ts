export type SearchResultAPICocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export type SearchResultCocktail = {
  id: number;
  name: string;
  thumb: string;
};

export type FullDetailsAPICocktail = SearchResultAPICocktail & {
  strAlcoholic: string;
  strInstructions: string;
  [other: `strIngredient${number}`]: string | null | undefined;
  [other: `strMeasure${number}`]: string | null | undefined;
};

export type Ingredient = {
  ingredient: string;
  measure: string;
};

export type FullDetailsCocktail = SearchResultCocktail & {
  alcoholic: boolean;
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
