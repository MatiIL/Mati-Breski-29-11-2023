import {
  createSlice,
  createAsyncThunk,
  createAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { dailyForecasts } from "../../api/weatherApi";
import WeatherData from "../../common/weatherTypes";

export interface ForecastState {
  dailyForecasts: WeatherData[];
  status: "idle" | "loading" | "failed";
}

const initialState: ForecastState = {
  dailyForecasts: [],
  status: "idle",
};

export const fetchDailyForecasts = createAsyncThunk(
  "forecast/dailyForecasts",
  async (locationId: string, { dispatch }) => {
    try {
      const response = await dailyForecasts(locationId);
      const dailyForecastsResponse = response?.DailyForecasts || [];

      const modifiedResponse = {
        DailyForecasts: dailyForecastsResponse.map((forecast: any) => ({
          timestamp: new Date(forecast.Date).getTime(),
          temparature: forecast.Temperature.Maximum.Value,
          weatherIcon: forecast.Day.Icon,
          weatherText: forecast.Day.IconPhrase,
        })),
      };
      
      return modifiedResponse;
    } catch (error) {
      throw error;
    }
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyForecasts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDailyForecasts.fulfilled,
        (
          state,
          action: PayloadAction<{
            DailyForecasts: WeatherData[];
          }>
        ) => {
          state.status = "idle";
          state.dailyForecasts = action.payload.DailyForecasts;
        }
      )
      .addCase(fetchDailyForecasts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default forecastSlice.reducer;
