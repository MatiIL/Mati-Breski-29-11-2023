import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import locationReducer from '../features/locationSearch/locationSlice';
import forecastReducer from '../features/dailyForecast/forecastSlice';
import currentWeatherReducer from '../features/currentWeather/currentSlice';

const store = configureStore({
  reducer: {
    location: locationReducer,
    forecast: forecastReducer,
    currentWeather: currentWeatherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;