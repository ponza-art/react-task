import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ads: [],
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    setAds(state, action) {
      state.ads = action.payload;
    },
    addAd(state, action) {
      state.ads.unshift(action.payload);
    },
    updateAd(state, action) {
      const { id, updatedAd } = action.payload;
      const index = state.ads.findIndex((ad) => ad.id === id);
      if (index !== -1) {
        state.ads[index] = updatedAd;
      }
    },
    deleteAd(state, action) {
      state.ads = state.ads.filter((ad) => ad.id !== action.payload);
    },
  },
});

export const { setAds, addAd, updateAd, deleteAd } = adsSlice.actions;
export default adsSlice.reducer;
