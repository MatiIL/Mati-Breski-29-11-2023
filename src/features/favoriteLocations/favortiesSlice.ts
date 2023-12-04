import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";
import { getCurrentWeather } from '../../api/weatherApi';
import WeatherData from "../../common/weatherTypes";

export interface LocationWithWeather {
  id: string;
  name: string;
  currentWeather?: WeatherData | null;
}

export interface FavoritesState {
  locations: LocationWithWeather[];
}

const initialState: FavoritesState = {
  locations: [],
};

export const selectFavorites = (state: RootState) => state.favorites;

export const isLocationInFavorites = (state: RootState, locationId: string) => {
  const favorites = selectFavorites(state).locations;
  return favorites.some((location) => location.id === locationId);
};

export const fetchCurrentWeatherForFavorites = createAsyncThunk<
  LocationWithWeather[],
  { ids: string[]; names: string[] }
>('favorites/fetchCurrentWeatherForFavorites', async ({ ids, names }) => {
  try {
    const locations: LocationWithWeather[] = [];

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const name = names[i];
      const response = await getCurrentWeather(id);

      if (response.length > 0) {
        const { Temperature, WeatherIcon, WeatherText } = response[0];
        const temperatureValue = Temperature?.Imperial?.Value ?? 0;
        const currentWeather: WeatherData = {
          id: id,
          name: name,
          weatherText: WeatherText,
          weatherIcon: WeatherIcon,
          temparature: temperatureValue,
        };

        locations.push({ id, name, currentWeather });
      }
    }

    return locations;
  } catch (error) {
    throw error;
  }
});


const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      console.log('Adding to favorites:', action.payload);
      state.locations.push({ ...action.payload, currentWeather: null });
      console.log('New state:', state.locations);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        (location) => location.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeatherForFavorites.fulfilled, (state, action) => {
        state.locations = action.payload;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;