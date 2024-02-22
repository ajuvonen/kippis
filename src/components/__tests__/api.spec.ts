import {describe, it, expect} from 'vitest';
import {HttpResponse, http} from 'msw';
import {
  getByFirstLetter,
  getRandomCocktail,
  getBySearchString,
  getByIngredients,
  getDetails,
  getNonAlcoholic,
} from '@/api';
import {BASE_API_ADDRESS} from '@/utils/constants';
import {server, testCocktails, testSearchResults} from '@/components/__tests__/mswHandlers';

describe('API', () => {
  it('searches by first letter', async () => {
    server.use(
      http.get(`${BASE_API_ADDRESS}/search.php`, ({request}) => {
        const url = new URL(request.url);
        const searchParam = url.searchParams.get('f');
        if (searchParam === 'a') {
          return HttpResponse.json({drinks: [testSearchResults[0][0]]});
        }
        return new HttpResponse(null, {status: 404});
      }),
    );
    const result = await getByFirstLetter('a');
    expect(result).toEqual([testSearchResults[0][1]]);
  });

  it('searches by search string', async () => {
    server.use(
      http.get(`${BASE_API_ADDRESS}/search.php`, ({request}) => {
        const url = new URL(request.url);
        const searchParam = url.searchParams.get('s');
        if (searchParam === 'mojito') {
          return HttpResponse.json({drinks: [testSearchResults[0][0]]});
        }
        return new HttpResponse(null, {status: 404});
      }),
      http.get(`${BASE_API_ADDRESS}/filter.php`, ({request}) => {
        const url = new URL(request.url);
        const searchParam = url.searchParams.get('i');
        if (searchParam === 'mojito') {
          return HttpResponse.json({drinks: [testSearchResults[1][0]]});
        }
        return new HttpResponse(null, {status: 404});
      }),
    );
    const result = await getBySearchString('mojito');
    expect(result).toEqual([testSearchResults[0][1], testSearchResults[1][1]]);
  });

  it('searches for replaced ingredients by search string', async () => {
    server.use(
      http.get(`${BASE_API_ADDRESS}/search.php`, ({request}) => {
        const url = new URL(request.url);
        const searchParam = url.searchParams.get('s');
        if (searchParam === 'cola') {
          return HttpResponse.json({drinks: null});
        }
        return new HttpResponse(null, {status: 404});
      }),
      http.get(`${BASE_API_ADDRESS}/filter.php`, ({request}) => {
        const url = new URL(request.url);
        const searchParam = url.searchParams.get('i');
        if (searchParam === 'coca-cola') {
          return HttpResponse.json({drinks: [testSearchResults[0][0]]});
        } else if (searchParam === 'pepsi cola') {
          return HttpResponse.json({drinks: [testSearchResults[1][0]]});
        } else if (searchParam === 'cola') {
          return HttpResponse.json({drinks: null});
        }
        return new HttpResponse(null, {status: 404});
      }),
    );
    const results = await getBySearchString('cola');
    expect(results).toEqual([testSearchResults[0][1], testSearchResults[1][1]]);
  });
  
  it('returns only non-alcoholic drinks', async () => {
    server.use(
      http.get(`${BASE_API_ADDRESS}/filter.php`, ({request}) => {
        const url = new URL(request.url);
        const searchParam = url.searchParams.get('a');
        if (searchParam === 'Non_Alcoholic') {
          return HttpResponse.json({drinks: [testSearchResults[0][0]]});
        }
        return new HttpResponse(null, {status: 404});
      }),
    );
    const results = await getNonAlcoholic();
    expect(results).toEqual([testSearchResults[0][1]]);
  });

  it('gets random cocktail', async () => {
    server.use(
      http.get(`${BASE_API_ADDRESS}/random.php`, () => {
        return HttpResponse.json({drinks: [testCocktails[0][0]]});
      }),
    );
    const results = await getRandomCocktail();
    expect(results).toEqual(testCocktails[0][1]);
  });

  it('gets cocktail by id', async () => {
    const results = await getDetails(0);
    expect(results).toEqual(testCocktails[0][1]);
  });

  it('handles empty search results', async () => {
    const results = await getDetails(123);
    expect(results).toEqual(null);
  });

  it('searches by ingredient list', async () => {
    server.use(
      http.get(`${BASE_API_ADDRESS}/filter.php`, ({request}) => {
        const url = new URL(request.url);
        const searchParam = url.searchParams.get('i');
        if (searchParam === 'gin') {
          return HttpResponse.json({drinks: [testSearchResults[0][0]]});
        } else if (searchParam === 'vodka') {
          return HttpResponse.json({drinks: [testSearchResults[1][0]]});
        }
        return new HttpResponse(null, {status: 404});
      }),
    );
    const results = await getByIngredients(['gin', 'vodka']);
    expect(results).toEqual([testSearchResults[0][1], testSearchResults[1][1]]);
  })
});
