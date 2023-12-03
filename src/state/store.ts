import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import locationReducer, { LocationState } from '../features/locationSearch/locationSlice';
import forecastReducer, { ForecastState } from '../features/dailyForecast/forecastSlice';
import currentWeatherReducer, { CurrentWeatherState } from '../features/currentWeather/currentSlice';
import favoritesReducer, { FavoritesState } from '../features/favoriteLocations/favortiesSlice';

const store = configureStore({
  reducer: {
    location: locationReducer,
    forecast: forecastReducer,
    currentWeather: currentWeatherReducer,
    favorites: favoritesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = {
  location: LocationState;
  forecast: ForecastState;
  currentWeather: CurrentWeatherState;
  favorites: FavoritesState;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;