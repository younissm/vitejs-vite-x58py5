import { createSlice } from "@reduxjs/toolkit";

const averageRatingSlice = createSlice({
  name: "averageRating",
  initialState: 0,
  reducers: {
    setAverageRating(state, action) {
      return action.payload;
    },
  },
});

export const { setAverageRating } = averageRatingSlice.actions;

export default averageRatingSlice.reducer;
