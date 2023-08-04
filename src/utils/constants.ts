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

// TODO: oz, qt, fifth, gal, jigger

// Drinks that are weird or have very poor images/instructions
export const BLACKLIST = [
  12790, // Absinthe #2
  15224, // Malibu twister
  15254, // Zenmeister
  15288, // 252
  15330, // Orange Crush
  15346, // 155 Belmont
  15409, // Danbooka
  15423, // 110 in the Shade
  15567, // Adam Sunrise
  15691, // Zoksel
  15743, // Fuzzy Asshole
  15761, // Quick-sand
  15789, // Snakebite and Black
  15801, // Zimadori Zinger
  15813, // Herbal Flame
  15933, // Zambeer
  16047, // Campari Beer
  16178, // Jitterbug
  16196, // Moranquito
  16273, // Shark Attack
  16403, // Black and Brown
  16963, // Zorbatini
  16985, // Shot-gun
  16992, // Pink Penocha
  17020, // Auburn Headbanger
  17027, // Zima Blaster
  17035, // Buccaneer
  17044, // Homemade Kahlua
  17105, // 501 Blue
  17108, // Coke and Drops
  17120, // Brain Fart
  17122, // Royal Bitch
  17167, // Raspberry Cooler
  17174, // Cherry Electric Lemonade
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
