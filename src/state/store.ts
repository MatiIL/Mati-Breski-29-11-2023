import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import locationReducer, { LocationState } from '../features/locationSearch/locationSlice';
import forecastReducer, { ForecastState } from '../features/dailyForecast/forecastSlice';
import currentWeatherReducer, { CurrentWeatherState } from '../features/currentWeather/currentSlice';
import favoritesReducer, { FavoritesState } from '../features/favoriteLocations/favortiesSlice';
import geopositionReducer, { GeopositionState } from '../features/geopositionSearch/geopositionSlice';

const store = configureStore({
  reducer: {
    location: locationReducer,
    forecast: forecastReducer,
    currentWeather: currentWeatherReducer,
    favorites: favoritesReducer,
    geoposition: geopositionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = {
  location: LocationState;
  forecast: ForecastState;
  currentWeather: CurrentWeatherState;
  favorites: FavoritesState;
  geoposition: GeopositionState;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;