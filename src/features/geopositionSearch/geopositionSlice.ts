import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { geopositionSearch } from "../../api/weatherApi";

export interface GeopositionResponse {
  id: string;
  name: string;
}

export interface GeopositionState {
  location: {
    id: string;
    name: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: GeopositionState = {
  location: null,
  loading: false,
  error: null,
};

export const fetchGeoposition = createAsyncThunk(
  "geoposition/fetchGeoposition",
  async (latLon: {
    lat: string;
    lon: string;
  }): Promise<GeopositionResponse> => {
    try {
      const response = await geopositionSearch(latLon.lat, latLon.lon);
      return {
        id: response.Key,
        name: response.LocalizedName,
      };
    } catch (error) {
      throw new Error("Failed to fetch geoposition.");
    }
  }
);

const geopositionSlice = createSlice({
  name: "geoposition",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeoposition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGeoposition.fulfilled,
        (state, action: PayloadAction<GeopositionResponse>) => {
          state.location = {
            id: action.payload.id,
            name: action.payload.name,
          };
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchGeoposition.rejected, (state) => {
        state.location = null;
        state.loading = false;
        state.error = "Failed to fetch geoposition.";
      });
  },
});

export default geopositionSlice.reducer;