import type {MainPhoto} from './types';

export const SEARCHABLE_ALCOHOLS = [
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
  {tag: 'virgin'},
];

export const ALCOHOLS = [
  '151 proof rum',
  'absinthe',
  'ale',
  'amaretto',
  'amaro montenegro',
  'añejo rum',
  'anisette',
  'aperol',
  'apple brandy',
  'apple schnapps',
  'applejack',
  'apricot brandy',
  'baileys irish cream',
  'banana liqueur',
  'benedictine',
  'blackberry brandy',
  'blended whiskey',
  'blue curacao',
  'bourbon',
  'brandy',
  'butterscotch schnapps',
  'cachaca',
  'campari',
  'champagne',
  'cherry brandy',
  'cherry heering',
  'chocolate liqueur',
  'coconut liqueur',
  'coffee brandy',
  'coffee liqueur',
  'cognac',
  'cointreau',
  'creme de cacao',
  'creme de cassis',
  'creme de mure',
  'dark creme de cacao',
  'dark rum',
  'drambuie',
  'dry vermouth',
  'dubonnet rouge',
  'everclear',
  'firewater',
  'galliano',
  'gin',
  'gold rum',
  'goldshlager',
  'grand marnier',
  'green chartreuse',
  'green chartreuse',
  'green creme de menthe',
  'irish cream',
  'irish whiskey',
  'kirschwasser',
  'lager',
  'lemon vodka',
  'light rum',
  'lillet blanc',
  'lime vodka',
  'malibu',
  'maraschino liqueur',
  'melon liqueur',
  'mezcal',
  'midori melon liqueur',
  'orange curacao',
  'ouzo',
  'passoa',
  'peach brandy',
  'peach schnapps',
  'peach vodka',
  'peppermint schnapps',
  'pernod',
  'pisang ambon',
  'pisco',
  'port',
  'prosecco',
  'raspberry liqueur',
  'raspberry vodka',
  'red wine',
  'ricard',
  'rose wine',
  'rum',
  'sambuca',
  'scotch',
  'sherry',
  'sloe gin',
  'southern comfort',
  'spiced rum',
  'strawberry liqueur',
  'strawberry schnapps',
  'sweet vermouth',
  'tequila',
  'tia maria',
  'triple sec',
  'vodka',
  'whiskey',
  'white creme de menthe',
  'white wine',
  'yellow chartreuse',
];

export const FRUITS = [
  'apple',
  'banana',
  'berries',
  'blackberries',
  'blueberries',
  'cantaloupe',
  'carrot',
  'cranberries',
  'cucumber',
  'figs',
  'fruit',
  'ginger',
  'grapes',
  'kiwi',
  'lemon',
  'lime',
  'mango',
  'mint',
  'orange',
  'papaya',
  'pineapple',
  'rosemary',
  'strawberries',
  'watermelon',
];

export const MIXERS = [
  'apple cider',
  'apple juice',
  'apricot nectar',
  'bitter lemon',
  'cider',
  'coffee',
  'cola',
  'cranberry juice',
  'espresso',
  'fruit juice',
  'ginger ale',
  'grape juice',
  'grape soda',
  'grapefruit juice',
  'guava juice',
  'hot chocolate',
  'kool-aid',
  'lemon juice',
  'lemon-lime soda',
  'lemonade',
  'lime juice',
  'mountain dew',
  'orange juice',
  'passion fruit juice',
  'peach nectar',
  'pineapple juice',
  'pomegranate juice',
  'russchian',
  'soda water',
  'sweet and sour',
  'tea',
  'tomato juice',
  'tonic water',
];

export const REPLACED_INGREDIENTS = [
  ['7-up', 'lemonade'],
  ['absolut citron', 'lemon vodka'],
  ['absolut vodka', 'vodka'],
  ['bitters', 'angostura bitters'],
  ['carbonated water', 'soda water'],
  ['chambord raspberry liqueur', 'raspberry liqueur'],
  ['cherry', 'cocktail cherry'],
  ['club soda', 'soda water'],
  ['coca-cola', 'cola'],
  ['demerara sugar', 'cane sugar'],
  ['elderflower cordial', 'elderflower syrup'],
  ['fresh lemon juice', 'lemon juice'],
  ['fresh lime juice', 'lime juice'],
  ['ginger beer', 'ginger ale'],
  ['half-and-half', 'cream'],
  ['heavy cream', 'cream'],
  ['johnnie walker', 'scotch'],
  ['kahlua', 'coffee liqueur'],
  ['light cream', 'cream'],
  ['lillet', 'lillet blanc'],
  ['lime cordial', 'lime syrup'],
  ['malibu rum', 'malibu'],
  ['maraschino cherry', 'cocktail cherry'],
  ['rose', 'rose wine'],
  ['roses sweetened lime juice', 'lime syrup'],
  ['ruby port', 'port'],
  ['schweppes russchian', 'russchian'],
  ['sirup of roses', 'rose syrup'],
  ['sprite', 'lemonade'],
  ['superfine sugar', 'sugar'],
  ['vermouth', 'dry vermouth'],
  ['white rum', 'light rum'],
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
  13086, // Atomic lokade
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
  {
    file: 'main_3.jpg',
    link: 'https://www.pexels.com/fi-fi/kuva/ravintola-cocktail-juoma-juomalasi-17606261/',
    acknowledgement: 'Marcos Kohler',
  },
] as MainPhoto[];
