import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    createAction,
  } from "@reduxjs/toolkit";
  import { getCurrentWeather } from "../../api/weatherApi";
  import { storeResponseLocally, getStoredResponse } from "../../utils";
  
  export interface CurrentWeather {
    weatherText: string;
    weatherIcon: number;
    temparature: number;
  }
  
  interface CurrentWeatherState {
    weatherText: string;
    weatherIcon: number;
    temparature: number;
    status: "idle" | "loading" | "failed";
  }
  
  const initialState: CurrentWeatherState = {
    weatherText: "",
    weatherIcon: 0,
    temparature: NaN,
    status: "idle",
  };
  
  export const fetchCurrentWeatherFulfilled = createAction<CurrentWeather>(
    "currentWeather/fetchCurrentWeatherFulfilled"
  );
  
  export const fetchCurrentWeather = createAsyncThunk(
    "currentWeather/fetchCurrentWeather",
    async (locationId: string, { dispatch }) => {
      try {
        let response;
        if (process.env.NODE_ENV === "development") {
          await getCurrentWeather(locationId);
          response = getStoredResponse("currentWeather");
        } else {
          response = getCurrentWeather(locationId);
        }
        const currentWeatherResponse = response[0];
  
        const modifiedResponse: CurrentWeather = {
          weatherText: currentWeatherResponse.WeatherText,
          weatherIcon: currentWeatherResponse.WeatherIcon,
          temparature: currentWeatherResponse.Temperature.Imperial.Value,
        };
  
        dispatch(fetchCurrentWeatherFulfilled(modifiedResponse));
  
        if (process.env.NODE_ENV === "development") {
          storeResponseLocally("currentWeather", modifiedResponse);
          return getStoredResponse("currentWeather");
        } else {
          return modifiedResponse;
        }
      } catch (error) {
        throw error;
      }
    }
  );
  
  
  const currentWeatherSlice = createSlice({
    name: "currentWeather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCurrentWeather.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchCurrentWeather.fulfilled, (state, action: PayloadAction<CurrentWeather>) => {
          state.status = "idle";
          state.weatherText = action.payload.weatherText;
          state.weatherIcon = action.payload.weatherIcon;
          state.temparature = action.payload.temparature;
        })
        .addCase(fetchCurrentWeather.rejected, (state) => {
          state.status = "failed";
        });
    },
  });
  
  export default currentWeatherSlice.reducer;
  