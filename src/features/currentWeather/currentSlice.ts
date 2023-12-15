import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createAction,
} from "@reduxjs/toolkit";
import WeatherData from '../../common/weatherTypes';
import { getCurrentWeather } from "../../api/weatherApi";

export interface CurrentWeatherState {
  id: string;
  name: string;
  weatherText: string;
  weatherIcon: number;
  temparature: number | null;
  status: "idle" | "loading" | "failed";
}

const initialState: CurrentWeatherState = {
  id: "",
  name: "",
  weatherText: "",
  weatherIcon: 0,
  temparature: null,
  status: "idle",
};

export const setCurrentWeather = createAction<{
  id: string;
  name: string;
  weatherText: string;
  weatherIcon: number;
  temparature: number | null;
}>('currentWeather/setCurrentWeather');

export const fetchCurrentWeather = createAsyncThunk(
  "currentWeather/fetchCurrentWeather",
  async ({ locationId, name }: { locationId: string; name: string }, { dispatch }) => {
    try {
      const response = await getCurrentWeather(locationId);
      const currentWeatherResponse = response[0];

      const modifiedResponse: WeatherData = {
        id: locationId,
        name: name,
        weatherText: currentWeatherResponse.WeatherText,
        weatherIcon: currentWeatherResponse.WeatherIcon,
        temparature: currentWeatherResponse.Temperature.Imperial.Value, 
      };
      return modifiedResponse;

    } catch (error) {
      throw error;
    }
  }
);

const currentWeatherSlice = createSlice({
  name: "currentWeather",
  initialState,
  reducers: {
    setCurrentWeather: (state, action) => {
      const { id, name, weatherText, weatherIcon, temparature } = action.payload;
      state.id = id;
      state.name = name;
      state.weatherText = weatherText;
      state.weatherIcon = weatherIcon;
      state.temparature = temparature;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCurrentWeather.fulfilled,
        (state, action: PayloadAction<WeatherData>) => {
          state.status = "idle";
          state.id = action.payload.id;
          state.name = action.payload.name;
          state.weatherText = action.payload.weatherText;
          state.weatherIcon = action.payload.weatherIcon;
          state.temparature = action.payload.temparature;
        }
      )
      .addCase(fetchCurrentWeather.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default currentWeatherSlice.reducer