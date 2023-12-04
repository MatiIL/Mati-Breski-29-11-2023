import { handleApiResponse } from "../utils";

const apiKey = process.env.REACT_APP_ACCU_KEY;

export const autocompleteSearch = async (query: string): Promise<any> => {
  const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`;
  return handleApiResponse(url);
}

export const dailyForecasts = async (id: string): Promise<any> => {
  const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=${apiKey}`;
  return handleApiResponse(url);
}

export const getCurrentWeather = async (id: string): Promise<any> => {
  const url = `https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${apiKey}`;
  return handleApiResponse(url);
}

export const geopositionSearch = async (lat: string, lon: string): Promise<any> => {
  const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${lon}`;
  return handleApiResponse(url);
}