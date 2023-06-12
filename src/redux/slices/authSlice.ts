import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authState, usuario } from "../models/reduxStates.model";
import {
  login,
  respuestaAutenticacion,
} from "../../Components/Auth/Auth.model";
import axios from "axios";
import {
  guardarTokenLocalStorage,
  logoutUtil,
  obtenerClaims,
} from "../../Components/Auth/AuthUtils";
import { RootState } from "../store";

const initialState: authState = {
  autenticado: false,
  claims: [],
  usuario: {
    id: "",
    email: "",
    userName: "",
    fotoUrl: "",
  },
};

export const getUsuario = createAsyncThunk(
  "auth/getUsuario",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const email = state.autenticacion.claims.find(
      (c) => c.nombre === "email"
    )?.valor;

    const response = await axios.get<usuario>(
      `${import.meta.env.VITE_API_URL}/auth/GetUsuario/${email}`
    );

    return response.data;
  }
);

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

    const response = await axios
      .post<respuestaAutenticacion>(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        login
      )
      .then((response) => {
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
  reducers: {
    setClaims: (state, action) => {
      state.autenticado = true;
      state.claims = action.payload;
    },
    logout: (state) => {
      logoutUtil();

      state.autenticado = false;
      state.claims = [];
      state.usuario = {
        id: "",
        email: "",
        userName: "",
        fotoUrl: "",
      };
    },
  },
  extraReducers: (builder) => {
    //GetUsuario
    builder.addCase(getUsuario.fulfilled, (state, action) => {
      state.usuario = action.payload;
    });
    //Registro
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.autenticado = true;
      state.usuario = action.payload.usuario;
      state.claims = obtenerClaims();
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.autenticado = false;
    });
    //Login
    builder.addCase(loginCuenta.fulfilled, (state, action) => {
      state.autenticado = true;
      state.usuario = action.payload.usuario;
      state.claims = obtenerClaims();
    });
    builder.addCase(loginCuenta.rejected, (state, action) => {
      state.autenticado = false;
    });
  },
});

export const { setClaims, logout } = authSlice.actions;
export default authSlice.reducer;
