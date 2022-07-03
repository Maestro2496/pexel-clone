import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  term: "cars",
};

export const searchSlice = createSlice({
  name: "term",
  initialState,
  reducers: {
    update: (state, action) => {
      state.term = action.payload;
    },
  },
});

export const {update} = searchSlice.actions;
export default searchSlice.reducer;
