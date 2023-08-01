import type {MainPhoto} from './types';

export const ALCOHOLS = [
  {
    tag: 'whiskey',
    ingredients: [
      'whiskey',
      'blended whiskey',
      'irish whiskey',
      'scotch',
      'bourbon',
      'johnnie walker',
    ],
  },
  {tag: 'vodka', ingredients: ['vodka', 'peach vodka', 'lemon vodka']},
  {tag: 'gin', ingredients: ['gin', 'sloe gin']},
  {tag: 'rum', ingredients: ['rum', 'light rum', 'dark rum', 'spiced rum', 'añejo rum']},
  {tag: 'virgin'},
];

export const BASE_API_ADDRESS = 'https://www.thecocktaildb.com/api/json/v1/1';

export const MAIN_PHOTOS = [
  {
    file: 'main_0.jpg',
    link: 'https://www.pexels.com/photo/clear-glass-footed-drinking-glass-with-orange-juice-338713/',
    acknowledgement: 'Isabella Mendes',
  },
  {
    file: 'main_1.jpg',
    link: 'https://www.pexels.com/photo/glass-of-beverage-2663974/',
    acknowledgement: 'Cameron Rainey',
  },
  {
    file: 'main_2.jpg',
    link: 'https://www.pexels.com/photo/close-up-photo-of-margarita-3407782/',
    acknowledgement: 'Sebastian Coman Photography',
  },
] as MainPhoto[];
