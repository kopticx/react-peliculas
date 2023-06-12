import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { actorState } from "../models/reduxStates.model";
import axios from "axios";
import { actor, actorDTO } from "../../Components/Actores/Actores.model";
import { notificacionError, notificacionSuccess } from "../../Components/Utils/Notificaciones";
import dayjs from "dayjs";

const initialState: actorState = {
  actores: [],
  actor: {
    id: 0,
    nombre: "",
    biografia: "",
    fechaNacimiento: undefined,
    fotoURL: "",
  },
  error: "",
};

export const getActores = createAsyncThunk("actor/getActores", async () => {
  const response = await axios.get<actor[]>(
    `${import.meta.env.VITE_API_URL}/actores/getActores`
  );

  return response.data;
});

export const getActor = createAsyncThunk(
  "actor/getActor",
  async (id: number) => {
    const response = await axios.get<actor>(`${import.meta.env.VITE_API_URL}/actores/getActor/${id}`);

    return response.data;
});

export const createActor = createAsyncThunk(
  "actor/createActor",
  async (data: FormData) => {
    const response = await axios({
      method: 'post',
      url: `${import.meta.env.VITE_API_URL}/actores/postActor`,
      data,
      headers: {'Content-Type': 'multipart/form-data' }
    });

    return response.data;
  });

export const deleteActor = createAsyncThunk(
  "actor/deleteActor",
  async (id: number) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/actores/deleteActor/${id}`);

    return id;
  });

export const actorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get Actores
    builder.addCase(getActores.fulfilled, (state, action) => {
      state.actores = action.payload;
    });

    builder.addCase(getActores.rejected, (state, action) => {
      state.error = action.error.message!;

      notificacionError({ message: "Error al traer la información", description: "No se pudo obtener la informacion solicitada" });
    });

    //Get Actor
    builder.addCase(getActor.fulfilled, (state, action) => {
      state.actor = action.payload;
    });

    builder.addCase(getActor.rejected, (state, action) => {
      state.error = action.error.message!;

      notificacionError({ message: "Error al obtener actor", description: "No se pudo obtener el actor solicitado" });
    });

    //Create Actor
    builder.addCase(createActor.fulfilled, () => {
      notificacionSuccess({message: "Actor creado", description: "El actor se creó correctamente."});
    });

    builder.addCase(createActor.rejected, (state, action) => {
      state.error = action.error.message!;
      notificacionError({message: "Error al crear el actor", description: "Hubo un error al crear el actor."});
    });

    //Delete Actor
    builder.addCase(deleteActor.fulfilled, (state, action) => {
      state.actores = state.actores.filter((actor) => actor.id !== action.payload);
      notificacionSuccess({message: "Actor eliminado", description: "El actor se eliminó correctamente."});
    });

    builder.addCase(deleteActor.rejected, (state, action) => {
      state.error = action.error.message!;
      notificacionError({message: "Error al eliminar el actor", description: "No se pudo eliminar el actor."});
    });
  },
});

export default actorSlice.reducer;
