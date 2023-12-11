import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentWeather } from "../../api/weatherApi";
import WeatherData from "../../common/weatherTypes";

export interface Location {
  id: string;
  name: string;
}

export interface LocationWithWeather extends Location {
  currentWeather?: WeatherData | undefined;
}

export interface FavoritesState {
  locations: Location[];
  locationsWeather?: LocationWithWeather[];
  status: "idle" | "loading" | "failed";
}

const initialState: FavoritesState = {
  locations: [],
  status: "idle",
};

export const isLocationInFavorites = (locationId: string, favorites: FavoritesState) => {
  return favorites.locations.some((location) => location.id === locationId);
};

export const fetchCurrentWeatherForFavorites = createAsyncThunk<
  LocationWithWeather[],
  { ids: string[]; names: string[] }
>("favorites/fetchCurrentWeatherForFavorites", async ({ ids, names }) => {
  try {
    const locationsWeather: LocationWithWeather[] = [];

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

        locationsWeather.push({ id, name, currentWeather });
      }
    }

    return locationsWeather;
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
      state.locations.push({ ...action.payload });
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        (location) => location.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.
    addCase(fetchCurrentWeatherForFavorites.pending, (state) => {
      state.status = "loading";
    })
    .addCase(
      fetchCurrentWeatherForFavorites.fulfilled,
      (state, action) => {
        state.locationsWeather = action.payload;
        state.status = "idle";
      }
    )
    .addCase(fetchCurrentWeatherForFavorites.rejected, (state => {
      state.status = "failed";
    }))
  },
  
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;