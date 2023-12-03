import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";

export interface FavoritesState {
  locations: Array<{ id: string; name: string }>;
}

const initialState: FavoritesState = {
  locations: [],
};

export const selectFavorites = (state: RootState) => state.favorites;

export const isLocationInFavorites = (state: RootState, locationId: string) => {
  const favorites = selectFavorites(state).locations;
  return favorites.some((location) => location.id === locationId);
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.locations.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        (location) => location.id !== action.payload
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
