import type {MainPhoto} from './types';

export const SEARCHABLE_ALCOHOLS = [
  {
    tag: 'whiskey',
    ingredients: [
      'whiskey',
      'blended whiskey',
      'irish whiskey',
      'scotch',
      'bourbon',
      'johnnie walker',
      'rye whiskey',
    ],
  },
  {
    tag: 'vodka',
    ingredients: [
      'vodka',
      'peach vodka',
      'lemon vodka',
      'absolut vodka',
      'absolut citron',
      'raspberry vodka',
      'lime vodka',
    ],
  },
  {tag: 'gin', ingredients: ['gin', 'sloe gin']},
  {
    tag: 'rum',
    ingredients: [
      'rum',
      'light rum',
      'dark rum',
      'spiced rum',
      'añejo rum',
      '151 proof rum',
      'gold rum',
      'spiced rum',
    ],
  },
  {tag: 'virgin'},
];

export const ALCOHOLS = [
  '151 proof rum',
  'Absinthe',
  'Ale',
  'Amaretto',
  'Amaro Montenegro',
  'Añejo rum',
  'Anisette',
  'Aperol',
  'Apple brandy',
  'Apple schnapps',
  'Applejack',
  'Apricot brandy',
  'Baileys Irish Cream',
  'Banana liqueur',
  'Benedictine',
  'Blackberry brandy',
  'Blended whiskey',
  'Blue curacao',
  'Bourbon',
  'Brandy',
  'Butterscotch schnapps',
  'Cachaca',
  'Campari',
  'Champagne',
  'Cherry brandy',
  'Cherry Heering',
  'Chocolate liqueur',
  'Coconut liqueur',
  'Coffee brandy',
  'Coffee liqueur',
  'Cognac',
  'Cointreau',
  'Creme de Cacao',
  'Creme de Cassis',
  'Creme de Mure',
  'Dark Creme de Cacao',
  'Dark rum',
  'Drambuie',
  'Dry Vermouth',
  'Dubonnet Rouge',
  'Everclear',
  'Firewater',
  'Galliano',
  'Gin',
  'Gold rum',
  'Goldshlager',
  'Grand Marnier',
  'Green Chartreuse',
  'Green Chartreuse',
  'Green Creme de Menthe',
  'Irish cream',
  'Irish whiskey',
  'Kirschwasser',
  'Lager',
  'Lemon vodka',
  'Light rum',
  'Lillet Blanc',
  'Lime vodka',
  'Malibu',
  'Maraschino liqueur',
  'Melon liqueur',
  'Mezcal',
  'Midori melon liqueur',
  'Orange Curacao',
  'Ouzo',
  'Passoa',
  'Peach brandy',
  'Peach schnapps',
  'Peach vodka',
  'Peppermint schnapps',
  'Pernod',
  'Pisco',
  'Port',
  'Raspberry liqueur',
  'Raspberry vodka',
  'Red wine',
  'Ricard',
  'Rose Wine',
  'Rum',
  'Sambuca',
  'Scotch',
  'Sherry',
  'Sloe gin',
  'Southern Comfort',
  'Spiced rum',
  'Strawberry liqueur',
  'Strawberry schnapps',
  'Sweet Vermouth',
  'Tequila',
  'Tia Maria',
  'Triple sec',
  'Vodka',
  'Whiskey',
  'White Creme de Menthe',
  'White wine',
  'Yellow Chartreuse',
];

export const FRUITS = [
  'Apple',
  'Banana',
  'Berries',
  'Blackberries',
  'Blueberries',
  'Cantaloupe',
  'Carrot',
  'Cranberries',
  'Cucumber',
  'Figs',
  'Fruit',
  'Ginger',
  'Grapes',
  'Kiwi',
  'Lemon peel',
  'Lemon',
  'Lime peel',
  'Lime',
  'Mango',
  'Mint',
  'Orange peel',
  'Orange',
  'Papaya',
  'Pineapple',
  'Rosemary',
  'Strawberries',
  'Watermelon',
];

export const MIXERS = [
  'Apple cider',
  'Apple juice',
  'Bitter lemon',
  'Cider',
  'Coffee',
  'Cola',
  'Cranberry juice',
  'Cream',
  'Espresso',
  'Ginger Ale',
  'Grape juice',
  'Grape soda',
  'Grapefruit juice',
  'Guava juice',
  'Hot chocolate',
  'Lemon juice',
  'Lemon-lime soda',
  'Lemonade',
  'Lime juice',
  'Milk',
  'Orange juice',
  'Passion fruit juice',
  'Peach nectar',
  'Pineapple juice',
  'Pomegranate juice',
  'Prosecco',
  'Russchian',
  'Soda water',
  'Sweet and Sour',
  'Tea',
  'Tomato juice',
  'Tonic Water',
];

export const REPLACED_INGREDIENTS = [
  ['7-UP', 'Lemonade'],
  ['Absolut Citron', 'Lemon Vodka'],
  ['Absolut Vodka', 'Vodka'],
  ['Bitters', 'Angostura bitters'],
  ['Carbonated water', 'Soda water'],
  ['Chambord raspberry liqueur', 'Raspberry liqueur'],
  ['Cherry', 'Cocktail cherry'],
  ['Club soda', 'Soda water'],
  ['Coca-Cola', 'Cola'],
  ['Demerara sugar', 'Cane sugar'],
  ['Elderflower cordial', 'Elderflower syrup'],
  ['Fresh lemon juice', 'Lemon juice'],
  ['Fresh lime juice', 'Lime juice'],
  ['Ginger beer', 'Ginger Ale'],
  ['Half-and-half', 'Cream'],
  ['Heavy cream', 'Cream'],
  ['Johnnie walker', 'Scotch'],
  ['Kahlua', 'Coffee liqueur'],
  ['Light cream', 'Cream'],
  ['Lillet', 'Lillet Blanc'],
  ['Lime cordial', 'Lime syrup'],
  ['Malibu rum', 'Malibu'],
  ['Maraschino cherry', 'Cocktail cherry'],
  ['Rose', 'Rose Wine'],
  ['Roses sweetened lime juice', 'Lime syrup'],
  ['Ruby port', 'Port'],
  ['Schweppes Russchian', 'Russchian'],
  ['Sirup of roses', 'Rose syrup'],
  ['Sprite', 'Lemonade'],
  ['Superfine sugar', 'Sugar'],
  ['Vermouth', 'Dry Vermouth'],
  ['White rum', 'Light rum'],
];

// Drinks that are weird or have very poor images/instructions
export const BLACKLIST = [
  11034, // Angel face
  11052, // Archbishop
  11119, // Blue mountain
  11255, // Clove cocktail
  11255, // Clove cocktail
  11368, // Flying Dutchman
  11382, // Frisco Sour
  11396, // Gentleman's Club
  11407, // Gin cooler
  11415, // Gin sling
  11420, // Gin toddy
  11423, // Godfather
  11424, // Godmother
  11604, // Kentucky Colonel
  11798, // Monkey wrench
  12138, // Scotch Cobbler
  12388, // Thriller
  12518, // Whiskey Mac
  12692, // Lassi Khara
  12732, // Chocolate beverage
  12762, // Grizzly bear
  12764, // Karsk
  12768, // Frappé
  12780, // Spiking coffee
  12782, // Thai Coffee
  12784, // Thai Iced Coffee
  12786, // Thai Iced Tea
  12790, // Absinthe #2
  12876, // Berry deadly
  13192, // National aquarium
  15224, // Malibu twister
  15254, // Zenmeister
  15288, // 252
  15300, // 3-Mile Long Island Iced Tea
  15330, // Orange Crush
  15346, // 155 Belmont
  15409, // Danbooka
  15423, // 110 in the Shade
  15567, // Adam Sunrise
  15691, // Zoksel
  15743, // Fuzzy Asshole
  15761, // Quick-sand
  15789, // Snakebite and black
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
  16987, // Irish curdling cow
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
  17180, // Aviation
  17182, // Duchamp's punch
  17191, // Planter's punch
  17221, // Boozy Snickers Milkshake
  17829, // Penicillin
  17830, // Corn n Oil
  178311, // Broadside
  178319, // Aquamarine
  17833, // A.J
  17834, // Abbey cocktail
  17835, // Abilene
  17836, // Acapulco
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
