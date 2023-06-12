import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { peliculaState } from "../models/reduxStates.model";
import axios from "axios";
import {
  filtroPeliculasForm,
  landingPageDTO,
  pelicula,
  peliculaDTO,
} from "../../Components/Peliculas/Peliculas.model";
import { redirect } from "react-router-dom";
import { notificacionSuccess } from "../../Components/Utils/Notificaciones";

const initialState: peliculaState = {
  peliculas: [],
  enCines: [],
  proximosEstrenos: [],
  pelicula: {
    id: 0,
    titulo: "",
    resumen: "",
    enCines: false,
    trailer: "",
    fechaEstreno: undefined,
    posterUrl: "",
    generos: [],
    cines: [],
    actores: [],
    votoUsuario: undefined,
    promedioVoto: undefined,
  },
  peliculasFiltro: [],
  error: "",
};

export const getPeliculas = createAsyncThunk(
  "pelicula/getPeliculas",
  async () => {
    const data = await axios.get<landingPageDTO>(
      `${import.meta.env.VITE_API_URL}/peliculas/getPeliculas`
    );

    return data.data;
  }
);

export const getPelicula = createAsyncThunk(
  "pelicula/getPelicula",
  async (id: number) => {
    const data = await axios.get<pelicula>(
      `${import.meta.env.VITE_API_URL}/peliculas/getPelicula/${id}`
    );

    return data.data;
  }
);

export const filtrarPeliculas = createAsyncThunk(
  "pelicula/filtrarPeliculas",
  async (valores: filtroPeliculasForm) => {
    const data = await axios.get<peliculaDTO[]>(
      `${import.meta.env.VITE_API_URL}/peliculas/filtrar`,
      { params: valores }
    );

    return data.data;
  }
);

export const postPelicula = createAsyncThunk(
  "pelicula/postPelicula",
  async (pelicula: FormData) => {
    const response = await axios<peliculaDTO>({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/peliculas/postPelicula`,
      data: pelicula,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  }
);

export const putPelicula = createAsyncThunk(
  "pelicula/putPelicula",
  async ({ id, pelicula }: { id: number; pelicula: FormData }) => {
    const response = await axios<peliculaDTO>({
      method: "PUT",
      url: `${import.meta.env.VITE_API_URL}/peliculas/putPelicula/${id}`,
      data: pelicula,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  }
);

export const deletePelicula = createAsyncThunk(
  "pelicula/deletePelicula",
  async (id: number) => {
    const response = await axios.delete<number>(
      `${import.meta.env.VITE_API_URL}/peliculas/deletePelicula/${id}`
    );

    return response.data;
  }
);

export const postVotoUsuario = createAsyncThunk(
  "pelicula/postVotoUsuario",
  async (body: any) => {
    await axios.post(`${import.meta.env.VITE_API_URL}/rating/PostRating`, body);

    return body;
  }
);

export const peliculaSlice = createSlice({
  name: "pelicula",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get Pelicula
    builder.addCase(getPelicula.fulfilled, (state, action) => {
      state.pelicula = action.payload;
    });

    builder.addCase(getPelicula.rejected, (state, action) => {
      state.error = action.error.message!;
    });

    //Get Peliculas
    builder.addCase(getPeliculas.fulfilled, (state, action) => {
      state.enCines = action.payload.enCines;
      state.proximosEstrenos = action.payload.proximosEstrenos;
    });

    builder.addCase(getPeliculas.rejected, (state, action) => {
      state.error = action.error.message!;
    });

    //Post Pelicula
    builder.addCase(postPelicula.fulfilled, (state, action) => {
      state.peliculas.push(action.payload);
    });

    builder.addCase(postPelicula.rejected, (state, action) => {
      state.error = action.error.message!;
    });

    //Put Pelicula
    builder.addCase(putPelicula.fulfilled, (state, action) => {
      const indice = state.peliculas.findIndex(
        (pelicula) => pelicula.id === action.payload.id
      );
      if (indice >= 0) {
        state.peliculas[indice] = action.payload;
      }
    });

    builder.addCase(putPelicula.rejected, (state, action) => {
      state.error = action.error.message!;
    });

    //Delete Pelicula
    builder.addCase(deletePelicula.fulfilled, (state, action) => {

      const filtro = state.peliculas.filter(
        (pelicula) => pelicula.id !== action.payload
      );
      
      state.peliculas = filtro;
    });

    builder.addCase(deletePelicula.rejected, (state, action) => {
      state.error = action.error.message!;
    });

    //Filtrar Peliculas
    builder.addCase(filtrarPeliculas.fulfilled, (state, action) => {
      state.peliculasFiltro = action.payload;
    });

    builder.addCase(filtrarPeliculas.rejected, (state, action) => {
      state.error = action.error.message!;
    });

    //Post Voto Usuario
    builder.addCase(postVotoUsuario.fulfilled, (state, action) => {
      state.pelicula.votoUsuario = action.payload.puntuacion;
    });

    builder.addCase(postVotoUsuario.rejected, (state, action) => {
      state.error = action.error.message!;
    });
  },
});

export default peliculaSlice.reducer;
