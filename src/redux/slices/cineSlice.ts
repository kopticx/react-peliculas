import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cineState } from "../models/reduxStates.model";
import axios from "axios";

const initialState: cineState = {
  cines: [],
  error: "",
};

export const getCines = createAsyncThunk("cine/getCines", async () => {
  const data = await axios.get(
    `${import.meta.env.VITE_API_URL}/cines/getCines`
  );

  return data.data;
});

export const cineSlice = createSlice({
  name: "cine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get Cines
    builder.addCase(getCines.fulfilled, (state, action) => {
      state.cines = action.payload;
    });

    builder.addCase(getCines.rejected, (state, action) => {
      state.error = action.error.message!;
    });
  },
});

export default cineSlice.reducer;
