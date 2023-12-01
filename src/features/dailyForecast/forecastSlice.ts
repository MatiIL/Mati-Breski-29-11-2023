import {
  createSlice,
  createAsyncThunk,
  createAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { dailyForecasts } from "../../api/weatherApi";
import { getStoredResponse } from "../../utils";

interface DailyForecast {
  Date: Date | string;
  minTemp: number;
  maxTemp: number;
  Day: {
    Icon: number;
    IconPhrase: string;
  };
}

interface ForecastState {
  headline: {
    Text: string;
  };
  dailyForecasts: DailyForecast[];
  status: "idle" | "loading" | "failed";
}

const initialState: ForecastState = {
  headline: {
    Text: "",
  },
  dailyForecasts: getStoredResponse("dailyForecasts") || [],
  status: "idle",
};

export const fetchDailyForecastsFulfilled = createAction<{
  Headline: { Text: string };
  DailyForecasts: DailyForecast[];
}>("forecast/dailyForecasts/fulfilled");

export const fetchDailyForecasts = createAsyncThunk(
  "forecast/dailyForecasts",
  async (locationId: string, { dispatch }) => {
    try {
      await dailyForecasts(locationId);
      const response = getStoredResponse("dailyForecasts");

      const dailyForecastsResponse = response?.DailyForecasts || [];
      const headlineText = response?.Headline?.Text || "";

      const modifiedResponse = {
        Headline: {
          Text: headlineText,
        },
        DailyForecasts: dailyForecastsResponse.map((forecast: any) => ({
          Date: forecast.Date,
          timestamp: new Date(forecast.Date).getTime(),
          minTemp: forecast.Temperature.Minimum.Value,
          maxTemp: forecast.Temperature.Maximum.Value,
          Day: {
            Icon: forecast.Day.Icon,
            IconPhrase: forecast.Day.IconPhrase,
          },
        })),
      };
      dispatch(fetchDailyForecastsFulfilled(modifiedResponse));
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
            Headline: { Text: string };
            DailyForecasts: DailyForecast[];
          }>
        ) => {
          state.status = "idle";
          state.headline = action.payload.Headline;
          state.dailyForecasts = action.payload.DailyForecasts;
        }
      )
      .addCase(fetchDailyForecasts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default forecastSlice.reducer;
