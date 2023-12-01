import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import locationReducer from '../features/locationSearch/locationSlice';
import forecastReducer from '../features/dailyForecast/forecastSlice';

const store = configureStore({
  reducer: {
    location: locationReducer,
    forecast: forecastReducer,
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