import { handleApiResponse } from "../utils";

const apiKey = process.env.REACT_APP_ACCU_KEY;

export const autocompleteSearch = async (query: string): Promise<any> => {
  const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`;
  return handleApiResponse(url, "autocompleteSearch");
}

export const dailyForecasts = async (id: string): Promise<any> => {
  const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=${apiKey}`;
  return handleApiResponse(url, "dailyForecasts");
}

export const getCurrentWeather = async (id: string): Promise<any> => {
  const url = `http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${apiKey}`;
  return handleApiResponse(url, "currentWeather");
}