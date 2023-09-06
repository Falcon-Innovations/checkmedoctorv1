// import axios from 'axios';
import { X_CSCAPI_KEY } from '../utils/config';
import { City, Country, Response } from '../types/countries';
import { useQuery } from 'react-query';
import axios from 'axios';

const config = {
  method: 'get',
  url: 'https://api.countrystatecity.in/v1/countries',
  headers: {
    'X-CSCAPI-KEY': X_CSCAPI_KEY,
  },
};

const fetchCountries = (): Promise<Response<Country>> => axios(config);
const fetchStates = (countryCode: string = 'CM'): Promise<Response<Country>> =>
  axios({
    method: 'get',
    url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
    headers: {
      'X-CSCAPI-KEY': X_CSCAPI_KEY,
    },
  });

const fetchCities = (countryCode: string = 'CM'): Promise<Response<City>> =>
  axios({
    method: 'get',
    url: `https://api.countrystatecity.in/v1/countries/${countryCode}/cities`,
    headers: {
      'X-CSCAPI-KEY': X_CSCAPI_KEY,
    },
  });

export const useCountries = () => useQuery('countries', fetchCountries);

export const useStates = (countryCode?: string) =>
  useQuery({
    queryKey: ['states', countryCode],
    queryFn: () => fetchStates(countryCode),
  });

export const useCities = (countryCode: string) =>
  useQuery({
    queryKey: ['cities', countryCode],
    queryFn: () => fetchCities(countryCode),
  });
