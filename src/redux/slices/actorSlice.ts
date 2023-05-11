import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { actorState } from "../models/reduxStates.model";
import axios from "axios";
import { actor } from "../../Components/Actores/Actores.model";

const initialState: actorState = {
    actores: [],
    error: ''
}

export const getActores = createAsyncThunk(
    'actor/getActores',
    async () => {
        const data = await axios.get<actor>(`${import.meta.env.VITE_API_URL}/actores/getActores`);

        return data.data;
    }
)

export const actorSlice = createSlice({
    name: 'actor',
    initialState,
    reducers: {

    },
    extraReducers: {
        //Get Actores
        [getActores.fulfilled.type]: (state, action) => {
            state.actores = action.payload;
        },
        [getActores.rejected.type]: (state, action) => {
            state.error = action.error.message;
        }
    }
});

export default actorSlice.reducer;