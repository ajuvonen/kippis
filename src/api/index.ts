import axios from 'axios';
import {BASE_API_ADDRESS} from '@/utils/constants';
import {transformDrinks} from '@/utils/helpers';

export const getNonAlcoholic = () =>
  axios
    .get(`${BASE_API_ADDRESS}?a=Non_Alcoholic`)
    .then(({data: {drinks}}) => transformDrinks(drinks));
