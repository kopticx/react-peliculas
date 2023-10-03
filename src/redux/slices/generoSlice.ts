import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {generoState} from "../models/reduxStates.model";
import axios from "axios";
import {
  genero,
  generoCreacionDTO,
} from "../../Components/Generos/Generos.model";

const initialState: generoState = {
  generos: [],
  error: "",
};

export const getGeneros = createAsyncThunk("genero/getGeneros", async () => {
  const data = await axios.get<genero[]>(
   `${import.meta.env.VITE_API_URL}/generos/GetGeneros`
  );

  return data.data;
});

export const postGenero = createAsyncThunk(
 "genero/postGenero",
 async (genero: generoCreacionDTO) => {
   const respuesta = await axios.post<genero>(
    `${import.meta.env.VITE_API_URL}/generos/postGenero`,
    genero
   );

   return respuesta.data;
 }
);

export const generoSlice = createSlice({
  name: "genero",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get Generos
    builder.addCase(getGeneros.fulfilled, (state, action) => {
      state.generos = action.payload;
    });

    builder.addCase(getGeneros.rejected, (state, action) => {
      state.error = action.error.message!;
    });

    //Post Genero
    builder.addCase(postGenero.fulfilled, (state, action) => {
      state.generos.push(action.payload);
    });

    builder.addCase(postGenero.rejected, (state, action) => {
      state.error = action.error.message!;
    });
  },
});

export default generoSlice.reducer;
