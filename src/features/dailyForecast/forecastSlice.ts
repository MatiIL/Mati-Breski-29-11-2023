import {
  createSlice,
  createAsyncThunk,
  createAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { dailyForecasts } from "../../api/weatherApi";
import { storeResponseLocally, getStoredResponse } from "../../utils";

export interface DailyForecast {
  minTemp: number;
  maxTemp: number;
  Day: {
    Icon: number;
    IconPhrase: string;
  };
  timestamp: number;
}

export interface ForecastState {
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
        let response;
        if (process.env.NODE_ENV === "development") {
            await dailyForecasts(locationId);
            response = getStoredResponse("dailyForecasts");
        } else {
            response = dailyForecasts(locationId);
        }
      
      const dailyForecastsResponse = response?.DailyForecasts || [];
      const headlineText = response?.Headline?.Text || "";

      const modifiedResponse = {
        Headline: {
          Text: headlineText,
        },
        DailyForecasts: dailyForecastsResponse.map((forecast: any) => ({
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
      if (process.env.NODE_ENV === "development") {
      storeResponseLocally("dailyForecasts", modifiedResponse);
      return getStoredResponse("dailyForecasts");;
      } else {
        return modifiedResponse;
      }
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
