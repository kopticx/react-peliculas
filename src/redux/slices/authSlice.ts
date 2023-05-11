import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authState } from "../models/reduxStates.model";
import {
  login,
  respuestaAutenticacion,
} from "../../Components/Auth/Auth.model";
import axios from "axios";
import { guardarTokenLocalStorage, obtenerClaims } from "../../Components/Auth/AuthUtils";

const initialState: authState = {
  autenticado: false,
  claims: [],
  fotoUsuario: "",
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (registro: FormData) => {
    const response = await axios<respuestaAutenticacion>({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/auth/Registro`,
      data: registro,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      const data = response.data;
      guardarTokenLocalStorage(data);
      return data;
    });

    return response;
  }
);

export const loginCuenta = createAsyncThunk(
  "auth/login",
  async (login: login) => {
    console.log(login);
    
    const response = await axios.post<respuestaAutenticacion>(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      login
    ).then((response) => {
      const data = response.data;
      guardarTokenLocalStorage(data);

      return data;
    });

    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Registro
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.autenticado = true;
      state.fotoUsuario = action.payload.fotoUsuario;
      state.claims = obtenerClaims();
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.autenticado = false;
    });
    //Login
    builder.addCase(loginCuenta.fulfilled, (state, action) => {
        state.autenticado = true;
        state.fotoUsuario = action.payload.fotoUsuario;
        state.claims = obtenerClaims();
    });
    builder.addCase(loginCuenta.rejected, (state, action) => {
        state.autenticado = false;
    });
  }
});

export default authSlice.reducer;
