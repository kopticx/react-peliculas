import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { peliculaState } from "../models/reduxStates.model";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { landingPageDTO, pelicula, peliculaDTO } from "../../Components/Peliculas/Peliculas.model";

const initialState: peliculaState = {
    peliculas: [],
    enCines: [],
    proximosEstrenos: [],
    pelicula: {
        id: 0,
        titulo: '',
        resumen: '',
        enCines: false,
        trailer: '',
        fechaEstreno: dayjs(),
        posterUrl: '',
        generos: [],
        cines: [],
        actores: [],
    },
    error: ''
}

export const getPeliculas = createAsyncThunk(
    'pelicula/getPeliculas',
    async () => {
        const data = await axios.get<landingPageDTO[]>(`${import.meta.env.VITE_API_URL}/peliculas/getPeliculas`);

        return data.data;
    }
);

export const getPelicula = createAsyncThunk(
    'pelicula/getPelicula',
    async (id: number) => {
        const data = await axios.get<peliculaDTO>(`${import.meta.env.VITE_API_URL}/peliculas/getPelicula/${id}`);

        return data.data;
    }
);

export const postPelicula = createAsyncThunk(
    'pelicula/postPelicula',
    async (pelicula: FormData) => {
        await axios({
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/peliculas/postPelicula`,
            data: pelicula,
            headers: {'Content-Type': 'multipart/form-data' }
        });
    }
);

export const putPelicula = createAsyncThunk(
    'pelicula/putPelicula',
    async ({id, pelicula}: {id:number, pelicula: FormData}) => {
        await axios({
            method: 'PUT',
            url: `${import.meta.env.VITE_API_URL}/peliculas/putPelicula/${id}`,
            data: pelicula,
            headers: {'Content-Type': 'multipart/form-data' }
        });
    })

export const peliculaSlice = createSlice({
    name: 'pelicula',
    initialState,
    reducers: {

    },
    extraReducers: {
        //Get Pelicula
        [getPelicula.fulfilled.type]: (state, action) => {
            state.pelicula = action.payload;
            state.proximosEstrenos = action.payload.proximosEstrenos;
        },
        [getPelicula.rejected.type]: (state, action) => {
            state.error = action.error.message!;
        },
        //Get Peliculas
        [getPeliculas.fulfilled.type]: (state, action) => {
            state.enCines = action.payload.enCines;
            state.proximosEstrenos = action.payload.proximosEstrenos;
        },
        [getPeliculas.rejected.type]: (state, action) => {
            state.error = action.error.message!;
        },
        //Post Pelicula
        [postPelicula.fulfilled.type]: (state, action) => {
            state.peliculas.push(action.payload);
        },
        [postPelicula.rejected.type]: (state, action) => {
            state.error = action.error.message!;
        },
        //Put Pelicula
        [putPelicula.fulfilled.type]: (state, action) => {
            const indice = state.peliculas.findIndex(pelicula => pelicula.id === action.payload.id);
            if(indice >= 0){
                state.peliculas[indice] = action.payload;
            }
        },
        [putPelicula.rejected.type]: (state, action) => {
            state.error = action.error.message!;
        }
    }
});

export default peliculaSlice.reducer;